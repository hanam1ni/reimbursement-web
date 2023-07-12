import { RequestContext } from "@mikro-orm/core";
import genSessionStore from "connect-pg-simple";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import logger from "morgan";

import { entityManager, initializeDB } from "./db";
import initializeAuth from "./middlewares/authentication";
import initializeRouter from "./routes";
import { filterEmptyString } from "./middlewares/requestBody";

const initializeServer = async () => {
  const PostgresqlStore = genSessionStore(session);

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      secret: "UdGhwfKvI3",
      resave: false,
      saveUninitialized: false,
      store: new PostgresqlStore({
        conString:
          process.env.DATABASE_URL ||
          "postgres://postgres:postgres@localhost:5432/reimbursement-web-db",
        createTableIfMissing: true,
      }),
    })
  );

  await initializeDB();
  app.use((req, res, next) => RequestContext.create(entityManager, next));

  initializeAuth(app);

  app.use(logger("dev"));
  app.use(express.json());
  app.use(filterEmptyString);
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  initializeRouter(app);

  app.listen(3001, () => {
    console.log("Start server at port 3001.");
  });
};

initializeServer();
