import { Entity, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

import { User } from "@ngneat/falso";
import Role from "./Role";

export interface RoleParams {
  user: User;
  role: Role;
}

@Entity()
export default class UserRole extends BaseEntity {
  @ManyToOne()
  user: User;

  @ManyToOne()
  role: Role;

  constructor({ user, role }: RoleParams) {
    super();

    this.user = user;
    this.role = role;
  }
}
