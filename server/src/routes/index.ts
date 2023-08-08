import { Express } from "express";

import authRoutes from "./auth.routes";
import departmentRoutes from "./department.routes";
import expenseClaimRoutes from "./expenseClaim.routes";
import expenseClaimAttachmentRoutes from "./expenseClaimAttachment.routes";
import roleRoutes from "./role.routes";
import userRoutes from "./users.routes";
import userDepartmentRoutes from "./userDepartment.routes";

const initializeRouter = (app: Express) => {
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(departmentRoutes);
  app.use(userDepartmentRoutes);
  app.use(expenseClaimRoutes);
  app.use(expenseClaimAttachmentRoutes);
  app.use(roleRoutes);
};

export default initializeRouter;
