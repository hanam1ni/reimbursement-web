import { entityManager } from "@/db";
import User from "@/entities/User";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json();
  }

  const user = await entityManager.getRepository(User).findOne({ id: userId });

  if (!user) {
    return res.status(404).json();
  }

  const { user: userParams } = req.body;

  await entityManager.getRepository(User).updateUser(user, userParams);

  return res.status(200).json(req.user);
};

export const me = async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};
