import { EntityManager, MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";

import mikroORMConfig from "@/mikro-orm.config";

export let entityManager: EntityManager;

export const initializeDB = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(mikroORMConfig);
  entityManager = orm.em;
};
