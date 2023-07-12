import { entityManager } from "@/db";
import ExpenseClaim from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import { RECORD_PER_PAGE } from "@/helpers/paginationHelper";
import { QueryOrder } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";

export default class ExpenseClaimRepository extends EntityRepository<ExpenseClaim> {
  async createExpenseClaim(user: User, amount: number) {
    const expenseClaim = new ExpenseClaim({ amount });
    expenseClaim.createdBy = user;

    const validationErrors = await validate(expenseClaim);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await entityManager.persistAndFlush(expenseClaim);

    return { expenseClaim };
  }

  async listExpenseClaim(page: number, options: { userId?: number } = {}) {
    const offset = (page - 1) * RECORD_PER_PAGE;

    const queryOpts: { createdBy?: number } = {};
    if (options.userId) {
      queryOpts.createdBy = options.userId;
    }

    const [expenseClaims, count] = await this.findAndCount(queryOpts, {
      orderBy: { id: QueryOrder.DESC },
      limit: RECORD_PER_PAGE,
      offset,
    });

    return { expenseClaims, count };
  }
}
