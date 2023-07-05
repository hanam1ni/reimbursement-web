import { Request, Response, NextFunction } from "express";

export const filterEmptyString = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const filteredBody: { [key: string]: any } = {};

  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== "") {
      filteredBody[key] = value;
    }
  });

  req.body = filteredBody;

  next();
};
