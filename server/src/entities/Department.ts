import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  Property,
} from "@mikro-orm/core";
import { IsNotEmpty } from "class-validator";

import { BaseEntity } from "./BaseEntity";
import User from "./User";
import DepartmentRepository from "@/repositories/department.repository";

export interface DepartmentParams {
  name: string;
}

@Entity({ customRepository: () => DepartmentRepository })
export default class Department extends BaseEntity {
  [EntityRepositoryType]?: DepartmentRepository;

  @Property({ unique: true })
  @IsNotEmpty()
  name: string;

  @ManyToMany({ entity: () => User, mappedBy: (user) => user.departments })
  users = new Collection<User>(this);

  constructor({ name }: DepartmentParams) {
    super();

    this.name = name;
  }
}
