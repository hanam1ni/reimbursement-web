import { entityManager } from "@/db";
import Role from "@/entities/Role";
import { Request, Response } from "express";

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body;

  const { role, error } = await entityManager
    .getRepository(Role)
    .createRole({ name });

  if (error) {
    return res.status(400).json(error);
  }

  res.json(role);
};

export const listRole = async (req: Request, res: Response) => {
  const roles = await entityManager.getRepository(Role).findAll();

  res.json(roles);
};
