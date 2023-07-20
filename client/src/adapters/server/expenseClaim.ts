import { parsePageNumber } from "@/helpers/paginationHelper";
import * as baseAdapter from "./baseAdapter";

export interface ExpenseClaim {
  id: number;
  amount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const listMyExpenseClaim = (page: any) => {
  const pageNumber = parsePageNumber(page);

  return baseAdapter.get<baseAdapter.ListApiResponse<ExpenseClaim>>(
    `/my-expense-claims?page=${pageNumber}`
  );
};
