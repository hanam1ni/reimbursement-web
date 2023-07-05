import { authenticateUser } from "@/middlewares/auth";
import * as roleController from "@/controllers/role.controller";
import { Router } from "express";

const router = Router();

// Protected Routes

router.use(authenticateUser);
router.post("/roles", roleController.createRole);
router.get("/roles", roleController.listRole);

export default router;
