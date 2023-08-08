import UserDepartment from "@/entities/UserDepartment";
import * as ParamsHelper from "@/helpers/paramsHelper";
import { entityManager } from "@/lib/db";
import { RecordNotFoundError } from "@/lib/errors";
import { NextFunction, Request, Response } from "express";

export const updateUserDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDepartmentId = ParamsHelper.parseId(req.params.id);

    const userDepartment = await entityManager
      .getRepository(UserDepartment)
      .getUserDepartment(userDepartmentId);

    if (userDepartment === null) {
      throw new RecordNotFoundError();
    }

    await entityManager
      .getRepository(UserDepartment)
      .updateUserDepartment(userDepartment, req.body);

    return res.json(userDepartment);
  } catch (error) {
    next(error);
  }
};

export const deleteUserDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDepartmentId = ParamsHelper.parseId(req.params.id);

    await entityManager
      .getRepository(UserDepartment)
      .deleteUserDepartment(userDepartmentId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
