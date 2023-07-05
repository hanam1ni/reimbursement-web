import { Request, Response } from "express";
import passport from "passport";

import { entityManager } from "@/db";
import User from "@/entities/User";
import { buildErrorResponse } from "@/helpers/errorHelper";

export const login = (req: Request, res: Response) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.logIn(user, (err) => {
      return res.status(204).json();
    });
  })(req, res);
};

export const logout = (req: Request, res: Response) =>
  req.session.destroy(function (err: any) {
    if (err) {
      throw err;
    }
    return res.status(200).json();
  });

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const { user, error } = await entityManager
    .getRepository(User)
    .createUser({ email, password, firstName, lastName });

  if (error) {
    return res.status(400).json(buildErrorResponse(error));
  }

  res.json(user);
};
