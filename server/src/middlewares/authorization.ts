import ExpenseClaim from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import { UnauthorizedError } from "@/lib/errors";
import { NextFunction, Request, Response } from "express";

export const authorizeUser = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    for (const userRole of user?.roles || []) {
      if (role == userRole.name) {
        return next();
      }
    }

    return res.status(401).json({ error: "Unauthorized" });
  };
};

export const authorizeExpenseClaim = (
  user: User,
  expenseClaim: ExpenseClaim
) => {
  if (user.id == expenseClaim.createdBy?.id) {
    return true;
  }

  for (const role of user.roles) {
    if (["admin", "finance", "account"].includes(role.name)) {
      return true;
    }
  }

  throw new UnauthorizedError();
};
