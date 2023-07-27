import { ExpressError } from "@/lib/errors";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send();
  }

  next(err);
};

export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.stack}`);

  return res.status(500).send();
};
