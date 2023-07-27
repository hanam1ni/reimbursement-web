import { authenticateUser } from "@/middlewares/authentication";
import * as expenseClaimController from "@/controllers/expenseClaim.controller";
import { Router } from "express";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.get("/my-expense-claims", expenseClaimController.listMyExpenseClaim);
router.get(
  "/department-expense-claims",
  expenseClaimController.listDepartmentExpenseClaim
);
router.get("/expense-claims/:id", expenseClaimController.getExpenseClaim);
router.post("/expense-claims", expenseClaimController.createExpenseClaim);

export default router;
