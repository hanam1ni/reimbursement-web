import * as expenseClaimController from "@/controllers/expenseClaim.controller";
import { authenticateUser } from "@/middlewares/authentication";
import { authorizeUser } from "@/middlewares/authorization";
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
router.put("/expense-claims/:id", expenseClaimController.updateExpenseClaim);
router.put(
  "/expense-claims/:id/approve",
  expenseClaimController.approveExpenseClaim
);
router.put(
  "/expense-claims/:id/reject",
  expenseClaimController.rejectExpenseClaim
);
router.put(
  "/expense-claims/:id/complete",
  authorizeUser("finance"),
  expenseClaimController.completeExpenseClaim
);
router.post(
  "/expense-claims",
  fileUpload("attachment[]", 3),
  expenseClaimController.createExpenseClaim
);

export default router;
