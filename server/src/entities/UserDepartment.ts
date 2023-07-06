import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  Unique,
} from "@mikro-orm/core";
import { IsEnum, IsNotEmpty } from "class-validator";

import { BaseEntity } from "./BaseEntity";
import User from "./User";
import Department from "./Department";
import UserDepartmentRepository from "@/repositories/userDepartment.repository";

interface UserDepartmentParams {
  user: User;
  department: Department;
  role: UserDepartmentRole;
}

export enum UserDepartmentRole {
  MANAGER = "manager",
  MEMBER = "member",
}

@Unique({ properties: ["user", "department"] })
@Entity({ customRepository: () => UserDepartmentRepository })
export default class UserDepartment extends BaseEntity {
  [EntityRepositoryType]?: UserDepartmentRepository;

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
