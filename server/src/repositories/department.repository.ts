import { entityManager } from "@/lib/db";
import Department, { DepartmentParams } from "@/entities/Department";
import User from "@/entities/User";
import UserDepartment, { UserDepartmentRole } from "@/entities/UserDepartment";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import { RECORD_PER_PAGE } from "@/helpers/paginationHelper";
import {
  QueryOrder,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";

export default class DepartmentRepository extends EntityRepository<Department> {
  async createDepartment(params: DepartmentParams, userIds: number[]) {
    try {
      const department = new Department(params);

      const users = await entityManager
        .getRepository(User)
        .find({ id: userIds });
      const userDepartments = users.map((user) => {
        return new UserDepartment({
          user,
          department,
          role: UserDepartmentRole.MEMBER,
        });
      });

      const validationErrors = await validate(department);

      if (validationErrors.length > 0) {
        return { error: validationErrors };
      }

      entityManager.persist(department);
      entityManager.persist(userDepartments);
      await entityManager.flush();

      return { department };
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        return { error: buildIsNotUniqueError(error.message) };
      }

      throw error;
    }
  }

  async getDepartment(id: number) {
    const department = await this.findOne(
      { id },
      { populate: ["userDepartments.user"] }
    );

    return department;
  }

  async listDepartment(page: number) {
    const offset = (page - 1) * RECORD_PER_PAGE;

    const departments = await this.qb("d")
      .select("d.*, COUNT(*) OVER() as total_count, COUNT(u.id) as user_count")
      .orderBy({ id: QueryOrder.DESC })
      .limit(RECORD_PER_PAGE, offset)
      .leftJoin("d.users", "u")
      .groupBy("d.id");

    const count = departments[0] ? departments[0].totalCount : 0;

    return { departments, count };
  }
}
