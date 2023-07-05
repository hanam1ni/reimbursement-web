import { Express } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import departmentRoutes from "./department.routes";
import roleRoutes from "./role.routes";

const initializeRouter = (app: Express) => {
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(departmentRoutes);
  app.use(roleRoutes);
};

export default initializeRouter;
