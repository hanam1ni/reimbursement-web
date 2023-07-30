import { NextFunction, Request, Response } from "express";

export const authorizeUser = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    for (const userRole of user?.roles || []) {
      console.log(role);
      console.log(userRole.name);
      if (role == userRole.name) {
        return next();
      }
    }

    return res.status(401).json({ error: "Unauthorized" });
  };
};
