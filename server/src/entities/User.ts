import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import bcrypt from "bcrypt";

import { BaseEntity } from "./BaseEntity";
import UserRepository from "@/repositories/user.repository";
import { IsNotEmpty } from "class-validator";
import Department from "./Department";
import UserDepartment from "./UserDepartment";
import Role from "./Role";
import UserRole from "./UserRole";

export interface UserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Entity({ customRepository: () => UserRepository })
export default class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property()
  @IsNotEmpty()
  firstName: string;

  @Property()
  @IsNotEmpty()
  lastName: string;

  @Property({ unique: true })
  @IsNotEmpty()
  email: string;

  @Property({ hidden: true })
  @IsNotEmpty()
  password: string;

  @OneToMany(() => UserDepartment, (userDepartment) => userDepartment.user)
  userDepartments = new Collection<UserDepartment>(this);

  @ManyToMany({ entity: () => Department, pivotEntity: () => UserDepartment })
  departments = new Collection<Department>(this);

  @ManyToMany({ entity: () => Role, pivotEntity: () => UserRole })
  roles = new Collection<Role>(this);

  @BeforeCreate()
  async doBeforeCreate() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  async doBeforeUpdate() {
    await this.hashPassword();
  }

  constructor({ firstName, lastName, email, password }: UserParams) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  async hashPassword() {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
  }
}
