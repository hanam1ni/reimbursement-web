import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { IsNotEmpty } from "class-validator";
import User from "./User";
import RoleRepository from "@/repositories/role.repository";

export interface RoleParams {
  name: string;
}

@Entity({ customRepository: () => RoleRepository })
export default class Role extends BaseEntity {
  [EntityRepositoryType]?: RoleRepository;

  @Property({ unique: true })
  @IsNotEmpty()
  name: string;

  @ManyToMany({ entity: () => User, mappedBy: (user) => user.roles })
  users = new Collection<User>(this);

  constructor({ name }: RoleParams) {
    super();

    this.name = name;
  }
}
