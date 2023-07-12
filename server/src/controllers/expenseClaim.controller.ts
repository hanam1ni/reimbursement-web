import { entityManager } from "@/db";
import ExpenseClaim from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import {
  buildPaginationResponse,
  parsePageNumber,
} from "@/helpers/paginationHelper";
import { Request, Response } from "express";

export const listMyExpenseClaim = async (req: Request, res: Response) => {
  const {
    user,
    query: { page },
  } = req;
  const pageNumber = parsePageNumber(page);

  if (!user?.id) {
    return res.status(400).json();
  }

  const { expenseClaims, count } = await entityManager
    .getRepository(ExpenseClaim)
    .listExpenseClaim(pageNumber, { userId: user.id });

  const body = buildPaginationResponse(expenseClaims, pageNumber, count);

  res.json(body);
};

export const createExpenseClaim = async (req: Request, res: Response) => {
  const {
    user,
    body: { amount },
  } = req;

  const { expenseClaim, error } = await entityManager
    .getRepository(ExpenseClaim)
    .createExpenseClaim(user as User, amount);

  if (error) {
    return res.status(400).json(error);
  }

  res.json(expenseClaim);
};
