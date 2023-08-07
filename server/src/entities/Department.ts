import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { IsNotEmpty } from "class-validator";

import { BaseEntity } from "./BaseEntity";
import User from "./User";
import DepartmentRepository from "@/repositories/department.repository";
import UserDepartment from "@/entities/UserDepartment";

export interface DepartmentParams {
  name: string;
}

@Entity({ customRepository: () => DepartmentRepository })
export default class Department extends BaseEntity {
  [EntityRepositoryType]?: DepartmentRepository;

  @Property({ unique: true })
  @IsNotEmpty()
  name: string;

  @OneToMany(
    () => UserDepartment,
    (userDepartment) => userDepartment.department
  )
  userDepartments = new Collection<UserDepartment>(this);

  @ManyToMany({ entity: () => User, mappedBy: (user) => user.departments })
  users = new Collection<User>(this);

  @Property({ persist: false, hidden: true })
  totalCount?: number;

  @Property({ persist: false })
  userCount?: number;

  constructor({ name }: DepartmentParams) {
    super();

    this.name = name;
  }
}
