import { entityManager } from "@/lib/db";
import Department from "@/entities/Department";

import { Request, Response } from "express";

export const createDepartment = async (req: Request, res: Response) => {
  const { name, userIds } = req.body;
  const { department, error } = await entityManager
    .getRepository(Department)
    .createDepartment({ name }, userIds);

  if (error) {
    return res.status(400).json(error);
  }

  res.json(department);
};

export const listDepartment = async (req: Request, res: Response) => {
  const departments = await entityManager.getRepository(Department).findAll();

  res.json(departments);
};

export const getDepartment = async (req: Request, res: Response) => {
  const departmentId = Number(req.params.id);

  if (!departmentId) {
    return res.status(400).json();
  }

  const department = await entityManager
    .getRepository(Department)
    .getDepartment(departmentId);

  res.json(department);
};

export const addUser = async (req: Request, res: Response) => {
  const departmentId = Number(req.params.id);

  if (!departmentId) {
    return res.status(400).json();
  }
};
