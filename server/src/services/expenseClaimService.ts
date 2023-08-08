import ExpenseClaim, { ExpenseClaimParams } from "@/entities/ExpenseClaim";
import ExpenseClaimAttachment from "@/entities/ExpenseClaimAttachment";
import User from "@/entities/User";
import { entityManager } from "@/lib/db";
import { InvalidParamsError } from "@/lib/errors";
import { queue } from "@/workers";

export const createExpenseClaim = async (
  user: User,
  expenseClaimParams: ExpenseClaimParams,
  files?: Express.Multer.File[]
): Promise<ExpenseClaim> => {
  let createdExpenseClaim: ExpenseClaim | undefined;

  await entityManager.transactional(async () => {
    const { expenseClaim, error: expenseClaimError } = await entityManager
      .getRepository(ExpenseClaim)
      .createExpenseClaim(user, expenseClaimParams);

    if (expenseClaimError) {
      throw new InvalidParamsError({ reason: expenseClaimError });
    }

    if (files && (files.length as number) > 0) {
      await createAttachments(files, expenseClaim);
    }

    createdExpenseClaim = expenseClaim;

    queue.add("ProcessExpenseClaimAttachment", {
      expenseClaimId: expenseClaim.id,
    });
    queue.add("CreatedExpenseClaim", { expenseClaimId: expenseClaim.id });
  });

  return createdExpenseClaim as ExpenseClaim;
};

const createAttachments = async (
  files: Express.Multer.File[],
  expenseClaim: ExpenseClaim
) => {
  for (const file of files) {
    const { error: attachmentError } = await entityManager
      .getRepository(ExpenseClaimAttachment)
      .createAttachment({
        name: file.originalname,
        localPath: file.path,
        expenseClaim,
      });

    if (attachmentError) {
      throw new InvalidParamsError({ reason: attachmentError });
    }
  }
};
