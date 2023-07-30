import ExpenseClaimAttachment, {
  ExpenseClaimAttachmentParams,
} from "@/entities/ExpenseClaimAttachment";
import { entityManager } from "@/lib/db";
import { EntityRepository } from "@mikro-orm/core";
import { validate } from "class-validator";

export default class ExpenseClaimAttachmentRepository extends EntityRepository<ExpenseClaimAttachment> {
  async createAttachment({
    name,
    localPath,
    expenseClaim,
  }: ExpenseClaimAttachmentParams) {
    const attachment = new ExpenseClaimAttachment({
      name,
      localPath,
      expenseClaim,
    });

    const validationErrors = await validate(attachment);

    if (validationErrors.length > 0) {
      return { error: validationErrors };
    }

    await entityManager.persistAndFlush(attachment);

    return { attachment };
  }

  async listAttachment(
    options: { processed?: boolean; expenseClaimId?: number } = {}
  ) {
    const queryOpts: {
      expenseClaim?: number;
      processedAt?: { $not: null } | null;
    } = {};

    if (options.expenseClaimId) {
      queryOpts.expenseClaim = options.expenseClaimId;
    }

    if (options.processed) {
      queryOpts.processedAt = options.processed ? { $not: null } : null;
    }

    const attachments = await this.find(queryOpts);

    return { attachments };
  }
}
