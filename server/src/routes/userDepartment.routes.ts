import { Router } from "express";

import * as userDepartmentController from "@/controllers/userDepartment.controller";
import { authenticateUser } from "@/middlewares/authentication";
import { authorizeUser } from "@/middlewares/authorization";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.use(authorizeUser("admin"));
router.put(
  "/user-departments/:id",
  userDepartmentController.updateUserDepartment
);
router.delete(
  "/user-departments/:id",
  userDepartmentController.deleteUserDepartment
);

export default router;
