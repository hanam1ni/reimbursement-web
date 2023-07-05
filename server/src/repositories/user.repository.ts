import { EntityRepository } from "@mikro-orm/postgresql";

import User, { UserParams } from "@/entities/User";
import { entityManager } from "@/db";
import {
  UniqueConstraintViolationException,
  ValidationError,
  wrap,
} from "@mikro-orm/core";
import { validate } from "class-validator";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import Role from "@/entities/Role";
import UserRole from "@/entities/UserRole";
import { pick } from "radash";

export default class UserRepository extends EntityRepository<User> {
  async createUser(params: UserParams) {
    try {
      const user = new User(params);

      const validationErrors = await validate(user);

      if (validationErrors.length > 0) {
        return { error: validationErrors };
      }

      await entityManager.persistAndFlush(user);

      return { user };
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        return { error: buildIsNotUniqueError(error.message) };
      }

      throw error;
    }
  }

  async updateUser(user: User, params: any) {
    const userParams = pick(params, ["firstName", "lastName", "roleIds"]);
    wrap(user).assign(userParams);

    if (userParams.roleIds) {
      user.roles.removeAll();
      user.roles.set(
        userParams.roleIds.map((roleId: number) => {
          return entityManager.getRepository(Role).getReference(roleId);
        })
      );
    }

    return entityManager.flush();
  }
}
