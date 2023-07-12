import { Entity, ManyToOne, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

import { User } from "@ngneat/falso";
import Role from "./Role";

export interface RoleParams {
  user: User;
  role: Role;
}

@Unique({ properties: ["user", "role"] })
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
