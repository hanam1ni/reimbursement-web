import { Entity, Enum, ManyToOne } from "@mikro-orm/core";
import { IsEnum, IsNotEmpty } from "class-validator";

import { BaseEntity } from "./BaseEntity";
import User from "./User";
import Department from "./Department";

interface UserDepartmentParams {
  user: User;
  department: Department;
  role: UserDepartmentRole;
}

export enum UserDepartmentRole {
  MANAGER = "manager",
  MEMBER = "member",
}

@Entity()
export default class UserDepartment extends BaseEntity {
  @ManyToOne()
  user: User;

  @ManyToOne()
  department: Department;

  @Enum(() => UserDepartmentRole)
  @IsNotEmpty()
  @IsEnum(UserDepartmentRole)
  role: string;

  constructor({ user, department, role }: UserDepartmentParams) {
    super();

    this.user = user;
    this.department = department;
    this.role = role;
  }
}
