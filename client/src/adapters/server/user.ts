import { parsePageNumber } from "@/helpers/paginationHelper";
import * as baseAdapter from "./baseAdapter";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
}

export const getCurrentUser = () => {
  return baseAdapter.get<User>("/me");
};

export const listUsers = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<User>>(
    `/users?page=${pageNumber}`
  );
};
