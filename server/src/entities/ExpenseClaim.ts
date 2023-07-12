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
  amount: number;
}

export enum ExpenseClaimStatus {
  created = "created",
  approved = "approved",
  rejected = "rejected",
  completed = "completed",
}

@Entity({ customRepository: () => ExpenseClaimRepository })
export default class ExpenseClaim extends BaseEntity {
  [EntityRepositoryType]?: ExpenseClaimRepository;

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

  constructor({ amount }: ExpenseClaimParams) {
    super();

    this.amount = amount;
    this.status = ExpenseClaimStatus.created;
  }
}
