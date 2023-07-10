import { entityManager } from "@/db";
import User from "@/entities/User";
import {
  buildPaginationResponse,
  parsePageNumber,
} from "@/helpers/paginationHelper";
import { randFirstName, randLastName, randEmail } from "@ngneat/falso";
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

export const createDummyUser = async (req: Request, res: Response) => {
  const user = await entityManager.getRepository(User).createUser({
    firstName: randFirstName({ withAccents: false }),
    lastName: randLastName({ withAccents: false }),
    email: randEmail(),
    password: "password",
  });

  return res.status(200).json(user);
};

export const listUser = async (req: Request, res: Response) => {
  const { page } = req.query;
  const pageNumber = parsePageNumber(page);

  const { users, count } = await entityManager
    .getRepository(User)
    .listUsers(pageNumber);

  const body = buildPaginationResponse(users, pageNumber, count);

  return res.status(200).json(body);
};
