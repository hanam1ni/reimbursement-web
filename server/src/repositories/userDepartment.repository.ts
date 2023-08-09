import { EntityRepository } from "@mikro-orm/postgresql";

import UserDepartment, { UserDepartmentRole } from "@/entities/UserDepartment";
import { entityManager } from "@/lib/db";
import Department from "@/entities/Department";
import User from "@/entities/User";
import { validate } from "class-validator";
import { UniqueConstraintViolationException, wrap } from "@mikro-orm/core";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import { pick } from "radash";

export default class UserDepartmentRepository extends EntityRepository<UserDepartment> {
  async assignUser(
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

  async bulkAssignUser(departmentId: number, userIds: number[]) {
    let success = 0;
    let failed = 0;

    for (const userId of userIds) {
      try {
        const { error } = await this.assignUser(
          departmentId,
          userId,
          UserDepartmentRole.MEMBER
        );

        if (error) {
          throw error;
        }

        success += 1;
      } catch (error) {
        failed += 1;
      }
    }

    return { success, failed };
  }

  async getUserDepartment(id: number) {
    return this.findOne({ id });
  }

  async updateUserDepartment(userDepartment: UserDepartment, params: any) {
    const userDepartmentParams = pick(params, ["role"]);
    wrap(userDepartment).assign(userDepartmentParams);

    const validationErrors = await validate(userDepartment);

    if (validationErrors.length > 0) {
      await entityManager.refresh(userDepartment);

      return { error: validationErrors };
    }

    return entityManager.flush();
  }

  async deleteUserDepartment(id: number) {
    const userDepartment = this.getReference(id);

    return entityManager.remove(userDepartment).flush();
  }
}
