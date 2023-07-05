import { entityManager } from "@/db";
import Role, { RoleParams } from "@/entities/Role";
import { buildIsNotUniqueError } from "@/helpers/errorHelper";
import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";

export default class RoleRepository extends EntityRepository<Role> {
  async createRole(params: RoleParams) {
    try {
      const role = new Role(params);

      const validationErrors = await validate(role);

      if (validationErrors.length > 0) {
        return { error: validationErrors };
      }

      await entityManager.persistAndFlush(role);

      return { role };
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        return { error: buildIsNotUniqueError(error.message) };
      }

      throw error;
    }
  }
}
