import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { IsNotEmpty, IsPositive } from "class-validator";
import { BaseEntity } from "./BaseEntity";
import User from "./User";
import ExpenseClaimRepository from "@/repositories/expenseClaim.repository";

export interface ExpenseClaimParams {
  title: string;
  amount: number;
  description?: string;
}

export enum ExpenseClaimStatus {
  CREATED = "created",
  APROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

@Entity({ customRepository: () => ExpenseClaimRepository })
export default class ExpenseClaim extends BaseEntity {
  [EntityRepositoryType]?: ExpenseClaimRepository;

  @Property()
  @IsNotEmpty()
  title: string;

  @Property({ columnType: "text" })
  description?: string;

  @Property()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @Property()
  @IsNotEmpty()
  status: ExpenseClaimStatus;

  @ManyToOne()
  createdBy?: User;

  @Property()
  approvedAt?: Date;

  @ManyToOne()
  approvedBy?: User;

  @Property()
  rejectedAt?: Date;

  @ManyToOne()
  rejectedBy?: User;

  @Property()
  completedAt?: Date;

  @ManyToOne()
  completedBy?: User;

  constructor({ title, amount, description }: ExpenseClaimParams) {
    super();

    this.title = title;
    this.amount = amount;
    this.description = description;
    this.status = ExpenseClaimStatus.CREATED;
  }
}
