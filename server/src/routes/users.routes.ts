import { Router } from "express";

import * as userController from "../controllers/users.controller";
import { authenticateUser } from "@/middlewares/auth";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.put("/users/:id", userController.updateUser);
router.get("/me", userController.me);

export default router;
