import { authenticateUser } from "@/middlewares/authentication";
import * as expenseClaimController from "@/controllers/expenseClaim.controller";
import { Router } from "express";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.get("/my-expense-claims", expenseClaimController.listMyExpenseClaim);
router.post("/expense-claims", expenseClaimController.createExpenseClaim);

export default router;
