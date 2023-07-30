import { entityManager } from "@/lib/db";
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
    const expenseClaim = new ExpenseClaim({
      amount: Number(amount),
      title,
      description,
    });
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

  async listExpenseClaimForReview(
    page: number,
    { departmentIds, role }: { departmentIds?: number[]; role?: string[] }
  ) {
    const offset = (page - 1) * RECORD_PER_PAGE;

    const filterOpts = [];

    if (departmentIds) {
      filterOpts.push({
        status: ExpenseClaimStatus.CREATED,
        createdBy: { departments: departmentIds },
      });
    }

    if (role?.includes("finance")) {
      filterOpts.push({
        status: ExpenseClaimStatus.APPROVED,
      });
    }

    const [expenseClaims, count] = await this.findAndCount(
      {
        $or: filterOpts,
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
    expenseClaim.status = ExpenseClaimStatus.APPROVED;
    expenseClaim.approvedAt = new Date();
    expenseClaim.approvedBy = currentUser;

    await entityManager.flush();

    return expenseClaim;
  }

  async rejectExpenseClaim(expenseClaim: ExpenseClaim, currentUser: User) {
    expenseClaim.status = ExpenseClaimStatus.REJECTED;
    expenseClaim.rejectedAt = new Date();
    expenseClaim.rejectedBy = currentUser;

    await entityManager.flush();

    return expenseClaim;
  }
}
