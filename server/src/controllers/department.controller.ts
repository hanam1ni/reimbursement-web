import Department from "@/entities/Department";
import UserDepartment from "@/entities/UserDepartment";
import {
  buildPaginationResponse,
  parsePageNumber,
} from "@/helpers/paginationHelper";
import { entityManager } from "@/lib/db";
import { NextFunction, Request, Response } from "express";
import * as ParamsHelper from "@/helpers/paramsHelper";

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

export const assignUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = ParamsHelper.parseId(req.params.id);

    const { userId, role } = req.body;

    await entityManager
      .getRepository(UserDepartment)
      .assignUser(departmentId, userId, role);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const bulkAssignUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = ParamsHelper.parseId(req.params.id);

    const { userIds } = req.body;

    const result = await entityManager
      .getRepository(UserDepartment)
      .bulkAssignUser(departmentId, userIds);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
