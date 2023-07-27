import { entityManager } from "@/db";
import Role from "@/entities/Role";
import User, { UserParams } from "@/entities/User";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import { RECORD_PER_PAGE } from "@/helpers/paginationHelper";
import {
  QueryOrder,
  UniqueConstraintViolationException,
  wrap,
} from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";
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

  async listUsers(page: number, options: { keyword?: string } = {}) {
    const offset = (page - 1) * RECORD_PER_PAGE;

    const queryOpts: { email?: RegExp } = {};

    if (options.keyword) {
      queryOpts.email = new RegExp(options.keyword);
    }

    const [users, count] = await this.findAndCount(queryOpts, {
      orderBy: { id: QueryOrder.DESC },
      limit: RECORD_PER_PAGE,
      offset,
      populate: ["roles"],
    });

    return { users, count };
  }
}
