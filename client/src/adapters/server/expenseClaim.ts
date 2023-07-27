import "server-only";

import { parsePageNumber } from "@/helpers/paginationHelper";
import * as baseAdapter from "./baseAdapter";
import { ExpenseClaim } from "@/adapters/types";

export const getExpenseClaim = (id: string | number) => {
  return baseAdapter.get<ExpenseClaim>(`/expense-claims/${id}`);
};

export const listMyExpenseClaim = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<ExpenseClaim>>(
    `/my-expense-claims?page=${pageNumber}`
  );
};

export const listDepartmentExpenseClaim = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<ExpenseClaim>>(
    `/department-expense-claims?page=${pageNumber}`
  );
};
