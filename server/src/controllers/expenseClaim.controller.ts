import { entityManager } from "@/db";
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

export const listDepartmentExpenseClaim = async (
  req: Request,
  res: Response
) => {
  const {
    user,
    query: { page },
  } = req;
  const pageNumber = parsePageNumber(page);
  const departmentIds = [];

  for (const userDepartment of user?.userDepartments || []) {
    if (userDepartment.role == UserDepartmentRole.MANAGER) {
      departmentIds.push(userDepartment.department.id);
    }
  }

  const { expenseClaims, count } = await entityManager
    .getRepository(ExpenseClaim)
    .listExpenseClaimForDepartment(pageNumber, departmentIds);

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
        populate: ["createdBy", "approvedBy"],
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

export const createExpenseClaim = async (req: Request, res: Response) => {
  const { expenseClaim, error } = await entityManager
    .getRepository(ExpenseClaim)
    .createExpenseClaim(req.user as User, req.body);

  if (error) {
    return res.status(400).json(error);
  }

  res.json(expenseClaim);
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
