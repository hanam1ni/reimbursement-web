import { Router } from "express";

import * as departmentController from "../controllers/department.controller";
import { authenticateUser } from "@/middlewares/authentication";
import { authorizeUser } from "@/middlewares/authorization";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.use(authorizeUser("admin"));
router.post("/departments", departmentController.createDepartment);
router.get("/departments", departmentController.listDepartment);
router.get("/departments/:id", departmentController.getDepartment);
router.post("/departments/:id/assign-user", departmentController.assignUser);
router.post(
  "/departments/:id/bulk-assign-user",
  departmentController.bulkAssignUser
);

export default router;
