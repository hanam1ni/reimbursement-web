import { entityManager } from "@/lib/db";
import ExpenseClaim from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import { UserDepartmentRole } from "@/entities/UserDepartment";
import {
  buildPaginationResponse,
  parsePageNumber,
} from "@/helpers/paginationHelper";
import * as ParamsHelper from "@/helpers/paramsHelper";
import { RecordNotFoundError } from "@/lib/errors";
import {
  authorizeApproveExpenseClaim,
  authorizeGetExpenseClaim,
} from "@/lib/policies/expenseClaimPolicy";
import { NextFunction, Request, Response } from "express";
import * as ExpenseClaimService from "@/services/expenseClaimService";

export const listMyExpenseClaim = async (req: Request, res: Response) => {
  const {
    user,
    query: { page },
  } = req;
  const pageNumber = parsePageNumber(page);

  const { expenseClaims, count } = await entityManager
    .getRepository(ExpenseClaim)
    .listExpenseClaim(pageNumber, { userId: user!.id });

  const body = buildPaginationResponse(expenseClaims, pageNumber, count);

  res.json(body);
};

export const listExpenseClaimForReview = async (
  req: Request,
  res: Response
) => {
  const {
    user,
    query: { page },
  } = req;
  const pageNumber = parsePageNumber(page);

  const departmentIds = user?.userDepartments
    .toArray()
    .filter(
      (userDepartment) => userDepartment.role == UserDepartmentRole.MANAGER
    )
    .map(({ department: { id } }) => id);

  const role = user?.roles.toArray().map(({ name }) => name);

  const { expenseClaims, count } = await entityManager
    .getRepository(ExpenseClaim)
    .listExpenseClaimForReview(pageNumber, { departmentIds, role });

  const body = buildPaginationResponse(expenseClaims, pageNumber, count);

  res.json(body);
};

export const getExpenseClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseClaimId = ParamsHelper.parseId(req.params.id);

    const expenseClaim = await entityManager
      .getRepository(ExpenseClaim)
      .getExpenseClaim(expenseClaimId, {
        populate: ["createdBy", "approvedBy", "attachments"],
      });

    if (expenseClaim === null) {
      throw new RecordNotFoundError();
    }

    authorizeGetExpenseClaim(req.user as User, expenseClaim);

    return res.json(expenseClaim);
  } catch (error) {
    next(error);
  }
};

export const createExpenseClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseClaim = await ExpenseClaimService.createExpenseClaim(
      req.user as User,
      req.body,
      req.files as Express.Multer.File[]
    );

    res.json(expenseClaim);
  } catch (error) {
    next(error);
  }
};

export const approveExpenseClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseClaimId = ParamsHelper.parseId(req.params.id);

    const expenseClaim = await entityManager
      .getRepository(ExpenseClaim)
      .getExpenseClaim(expenseClaimId, {
        populate: ["createdBy.departments"],
      });

    if (expenseClaim === null) {
      throw new RecordNotFoundError();
    }

    authorizeApproveExpenseClaim(req.user as User, expenseClaim);

    await entityManager
      .getRepository(ExpenseClaim)
      .approveExpenseClaim(expenseClaim, req.user as User);

    res.json(expenseClaim);
  } catch (error) {
    next(error);
  }
};

export const rejectExpenseClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseClaimId = ParamsHelper.parseId(req.params.id);

    const expenseClaim = await entityManager
      .getRepository(ExpenseClaim)
      .getExpenseClaim(expenseClaimId, {
        populate: ["createdBy.departments"],
      });

    if (expenseClaim === null) {
      throw new RecordNotFoundError();
    }

    authorizeApproveExpenseClaim(req.user as User, expenseClaim);

    await entityManager
      .getRepository(ExpenseClaim)
      .rejectExpenseClaim(expenseClaim, req.user as User);

    res.json(expenseClaim);
  } catch (error) {
    next(error);
  }
};
