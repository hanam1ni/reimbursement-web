import { Router } from "express";

import * as departmentController from "../controllers/department.controller";
import { authenticateUser } from "@/middlewares/auth";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.post("/departments", departmentController.createDepartment);
router.get("/departments", departmentController.listDepartment);
router.get("/departments/:id", departmentController.getDepartment);

export default router;
