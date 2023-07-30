import * as expenseClaimController from "@/controllers/expenseClaim.controller";
import { authenticateUser } from "@/middlewares/authentication";
import { fileUpload } from "@/middlewares/fileUpload";
import { Router } from "express";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.get("/my-expense-claims", expenseClaimController.listMyExpenseClaim);
router.get(
  "/review-expense-claims",
  expenseClaimController.listExpenseClaimForReview
);
router.get("/expense-claims/:id", expenseClaimController.getExpenseClaim);
router.put(
  "/expense-claims/:id/approve",
  expenseClaimController.approveExpenseClaim
);
router.put(
  "/expense-claims/:id/reject",
  expenseClaimController.rejectExpenseClaim
);

router.post(
  "/expense-claims",
  fileUpload("attachment[]", 3),
  expenseClaimController.createExpenseClaim
);

export default router;
