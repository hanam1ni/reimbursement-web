import { InvalidParamsError } from "@/lib/errors";

export const parseId = (id: any) => {
  const parsedId = Number(id);

  if (!parsedId) {
    throw new InvalidParamsError();
  }

  return parsedId;
};
