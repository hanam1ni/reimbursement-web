import { BaseEntity } from "@/entities/BaseEntity";
import ExpenseClaim from "@/entities/ExpenseClaim";
import ExpenseClaimAttachmentRepository from "@/repositories/expenseClaimAttachment.repository";
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
  Unique,
} from "@mikro-orm/core";
import { IsNotEmpty } from "class-validator";

export interface ExpenseClaimAttachmentParams {
  name: string;
  expenseClaim: ExpenseClaim;
  localPath?: string | null;
}

@Unique({ properties: ["url", "expenseClaim"] })
@Entity({ customRepository: () => ExpenseClaimAttachmentRepository })
export default class ExpenseClaimAttachment extends BaseEntity {
  [EntityRepositoryType]?: ExpenseClaimAttachmentRepository;

  @Property({ columnType: "text" })
  @IsNotEmpty()
  name: string;

  @Property({ columnType: "text" })
  url?: string;

  @ManyToOne()
  @IsNotEmpty()
  expenseClaim: ExpenseClaim;

  @Property()
  processedAt?: Date;

  @Property({ columnType: "text" })
  localPath?: string | null;

  constructor({ name, expenseClaim, localPath }: ExpenseClaimAttachmentParams) {
    super();

    this.name = name;
    this.expenseClaim = expenseClaim;
    this.localPath = localPath;
  }
}
