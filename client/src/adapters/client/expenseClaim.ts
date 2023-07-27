import * as baseAdapter from "./baseAdapter";

export const createExpenseClaim = (data: object) => {
  return baseAdapter.post("/expense-claims", data);
};
