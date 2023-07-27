import * as baseAdapter from "./baseAdapter";

export const createExpenseClaim = (data: object) => {
  return baseAdapter.post("/expense-claims", data);
};

export const approveExpenseClaim = (id: number) => {
  return baseAdapter.put(`/expense-claims/${id}/approve`, {});
};

export const rejectExpenseClaim = (id: number) => {
  return baseAdapter.put(`/expense-claims/${id}/reject`, {});
};
