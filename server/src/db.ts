import { Express } from "express";
import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import mikroORMConfig from "@/mikro-orm.config";

export let orm: MikroORM;
export let entityManager: EntityManager;

export const initializeDB = async (app: Express) => {
  const initOrm = await MikroORM.init<PostgreSqlDriver>(mikroORMConfig);
  orm = initOrm;
  entityManager = orm.em;

  app.use((req, res, next) => RequestContext.create(entityManager, next));
};
