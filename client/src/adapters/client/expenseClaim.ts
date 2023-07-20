import * as baseAdapter from "./baseAdapter";

export const createExpenseClaim = ({ amount }: { amount: number }) => {
  return baseAdapter.post("/expense-claims", { amount });
};
