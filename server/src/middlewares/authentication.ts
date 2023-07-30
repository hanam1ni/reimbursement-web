import bcrypt from "bcrypt";
import { Express, NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { entityManager } from "@/lib/db";
import User from "@/entities/User";

const initializeAuth = (app: Express) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, verifyCredentials)
  );

  passport.serializeUser(function (user: any, done: any) {
    done(null, user);
  });

  passport.deserializeUser(async function (user: any, done: any) {
    const userFromDB = await entityManager
      .getRepository(User)
      .findOne(
        { email: user.email },
        { populate: ["roles", "userDepartments.department"] }
      );

    if (!userFromDB) {
      return done(null, null);
    }

    done(null, userFromDB);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

async function verifyCredentials(email: string, password: string, cb: any) {
  const user = await entityManager.getRepository(User).findOne({ email });

  if (!user) {
    return cb(null, false);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return cb(null, false);
  }

  return cb(null, user);
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export default initializeAuth;
