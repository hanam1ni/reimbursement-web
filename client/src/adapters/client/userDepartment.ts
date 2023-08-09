import { UserDepartment } from "@/adapters/types";
import * as baseAdapter from "./baseAdapter";

export const updateRole = (id: number, role: UserDepartment["role"]) => {
  return baseAdapter.put(`/user-departments/${id}`, { role });
};

export const deleteRole = (id: number) => {
  return baseAdapter.deleteRequest(`/user-departments/${id}`);
};
