import { entityManager } from "@/db";
import ExpenseClaim from "@/entities/ExpenseClaim";
import { sendEmail } from "@/services/mailer/baseMailer";
import { Job } from "bullmq";

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
    body: `There is reimbursement and manager of these department will be notified: ${departmentIds.join(
      ", "
    )}`,
  };

  if (process.env.SEND_EMAIL) {
    await sendEmail(email);
  } else {
    console.log(`[Info]: Sending Email - ${email}`);
  }
};
