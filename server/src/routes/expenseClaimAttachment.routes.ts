import * as expenseClaimAttachmentController from "@/controllers/expenseClaimAttachment.controller";
import { authenticateUser } from "@/middlewares/authentication";
import { Router } from "express";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.get(
  "/expense-claim-attachment/:id",
  expenseClaimAttachmentController.downloadExpenseClaimAttachment
);

export default router;
