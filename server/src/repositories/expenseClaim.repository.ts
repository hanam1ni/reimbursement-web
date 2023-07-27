import { entityManager } from "@/db";
import ExpenseClaim, {
  ExpenseClaimParams,
  ExpenseClaimStatus,
} from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import { RECORD_PER_PAGE } from "@/helpers/paginationHelper";
import { queue } from "@/workers";
import { QueryOrder } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { validate } from "class-validator";

export default class ExpenseClaimRepository extends EntityRepository<ExpenseClaim> {
  async getExpenseClaim(id: number, { populate }: { populate?: any } = {}) {
    const expenseClaim = await this.findOne(
      { id },
      {
        populate: populate || [],
      }
    );

    return expenseClaim;
  }

  async createExpenseClaim(
    user: User,
    { amount, title, description }: ExpenseClaimParams
  ) {
    const expenseClaim = new ExpenseClaim({ amount, title, description });
    expenseClaim.createdBy = user;

    const validationErrors = await validate(expenseClaim);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await entityManager.persistAndFlush(expenseClaim);
    queue.add("CreatedExpenseClaim", { expenseClaimId: expenseClaim.id });

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

  async listExpenseClaimForDepartment(page: number, departmentIds: number[]) {
    const offset = (page - 1) * RECORD_PER_PAGE;

    const [expenseClaims, count] = await this.findAndCount(
      {
        status: ExpenseClaimStatus.CREATED,
        createdBy: { departments: departmentIds },
      },
      {
        orderBy: { id: QueryOrder.DESC },
        limit: RECORD_PER_PAGE,
        populate: ["createdBy.departments"],
        offset,
      }
    );

    return { expenseClaims, count };
  }

  async approveExpenseClaim(expenseClaim: ExpenseClaim, currentUser: User) {
    expenseClaim.status = ExpenseClaimStatus.APROVED;
    expenseClaim.approvedAt = new Date();
    expenseClaim.approvedBy = currentUser;

    await entityManager.flush();

    return expenseClaim;
  }
}
