import * as baseAdapter from "./baseAdapter";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
}

export const getCurrentUser = () => {
  return baseAdapter.get<User>("/me");
};

export const listUsers = (keyword: string) => {
  return baseAdapter.get<baseAdapter.ListApiResponse<User>>("/users", {
    params: { keyword },
  });
};
