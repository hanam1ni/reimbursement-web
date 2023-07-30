import { entityManager } from "@/lib/db";
import ExpenseClaim from "@/entities/ExpenseClaim";
import { sendEmail } from "@/services/mailer/baseMailer";
import { Job } from "bullmq";
import ExpenseClaimAttachment from "@/entities/ExpenseClaimAttachment";
import { uploadExpenseClaimAttachments } from "@/services/s3/attachment";

export const processCreatedExpenseClaim = async (job: Job) => {
  const expenseClaimId = job.data.expenseClaimId as number;
  const expenseClaim = await entityManager
    .getRepository(ExpenseClaim)
    .getExpenseClaim(expenseClaimId, { populate: ["createdBy.departments"] });

  const departmentIds = [];

  for (const department of expenseClaim!.createdBy?.departments || []) {
    departmentIds.push(department.id);
  }

  const email = {
    subject: "New Reimbursement Request",
    body: `There is a new reimbursement request and manager of these department will be notified: ${departmentIds.join(
      ", "
    )}`,
  };

  if (process.env.SEND_EMAIL) {
    await sendEmail(email);
  } else {
    console.log(`[Info]: Sending Email - ${email}`);
  }
};

export const processExpenseClaimAttachment = async (job: Job) => {
  const expenseClaimId = job.data.expenseClaimId as number;
  const { attachments } = await entityManager
    .getRepository(ExpenseClaimAttachment)
    .listAttachment({ expenseClaimId, processed: false });

  if (attachments.length > 0) {
    await uploadExpenseClaimAttachments(attachments);
  }
};
