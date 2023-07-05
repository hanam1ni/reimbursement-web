import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ defaultRaw: "CURRENT_TIMESTAMP" })
  createdAt: Date = new Date();

  @Property({ defaultRaw: "CURRENT_TIMESTAMP", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
