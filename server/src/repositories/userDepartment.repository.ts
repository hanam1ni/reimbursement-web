import { EntityRepository } from "@mikro-orm/postgresql";

import UserDepartment, { UserDepartmentRole } from "@/entities/UserDepartment";
import { entityManager } from "@/db";
import Department from "@/entities/Department";
import User from "@/entities/User";
import { validate } from "class-validator";
import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";

export default class UserDepartmentRepository extends EntityRepository<UserDepartment> {
  async addUser(
    departmentId: number,
    userId: number,
    role: UserDepartmentRole
  ) {
    try {
      const userDepartment = new UserDepartment({
        user: entityManager.getRepository(User).getReference(userId),
        department: entityManager
          .getRepository(Department)
          .getReference(departmentId),
        role,
      });

      const validationErrors = await validate(userDepartment);

      if (validationErrors.length > 0) {
        return { error: validationErrors };
      }

      await entityManager.persistAndFlush(userDepartment);

      return { userDepartment };
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        return { error: buildIsNotUniqueError(error.message) };
      }

      throw error;
    }
  }
}
