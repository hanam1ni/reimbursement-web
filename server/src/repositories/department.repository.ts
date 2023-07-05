import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";

import { entityManager } from "@/db";
import Department, { DepartmentParams } from "@/entities/Department";
import User from "@/entities/User";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import UserDepartment, { UserDepartmentRole } from "@/entities/UserDepartment";

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
    const department = await this.findOne({ id }, { populate: ["users"] });

    return department;
  }
}
