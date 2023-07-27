import "server-only";

import { parsePageNumber } from "@/helpers/paginationHelper";
import * as baseAdapter from "./baseAdapter";

export interface Department {
  name: string;
  userCount: number;
}

export const listDepartment = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<Department>>(
    `/departments?page=${pageNumber}`
  );
};
