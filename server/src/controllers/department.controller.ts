import { entityManager } from "@/db";
import Department from "@/entities/Department";
import UserDepartment from "@/entities/UserDepartment";
import {
  buildPaginationResponse,
  parsePageNumber,
} from "@/helpers/paginationHelper";

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
  const { page } = req.query;
  const pageNumber = parsePageNumber(page);

  const { departments, count } = await entityManager
    .getRepository(Department)
    .listDepartment(pageNumber);

  const body = buildPaginationResponse(departments, pageNumber, count);

  res.json(body);
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

  const { userId, role } = req.body;

  await entityManager
    .getRepository(UserDepartment)
    .addUser(departmentId, userId, role);
};
