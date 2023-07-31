import { NextFunction, Request, Response } from "express";
import * as ParamsHelper from "@/helpers/paramsHelper";
import { entityManager } from "@/lib/db";
import ExpenseClaimAttachment from "@/entities/ExpenseClaimAttachment";
import { RecordNotFoundError } from "@/lib/errors";
import User from "@/entities/User";
import { generateAttachmentUrl } from "@/services/s3/attachment";
import { authorizeGetExpenseClaim } from "@/lib/policies/expenseClaimPolicy";

export const downloadExpenseClaimAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attachmentId = ParamsHelper.parseId(req.params.id);

    const attachment = await entityManager
      .getRepository(ExpenseClaimAttachment)
      .getAttachment(attachmentId, {
        populate: ["expenseClaim.createdBy.departments"],
      });

    if (attachment === null) {
      throw new RecordNotFoundError();
    }

    authorizeGetExpenseClaim(req.user as User, attachment.expenseClaim);

    const url = await generateAttachmentUrl(attachment);

    return res.redirect(url);
  } catch (error) {
    next(error);
  }
};
