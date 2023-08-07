import "server-only";

import { parsePageNumber } from "@/helpers/paginationHelper";
import * as baseAdapter from "./baseAdapter";
import { Department } from "@/adapters/types";

export const listDepartment = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<Department>>(
    `/departments?page=${pageNumber}`
  );
};

export const getDepartment = (id: string | number) => {
  return baseAdapter.get<Department>(`/departments/${id}`);
};
