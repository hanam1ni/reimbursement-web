import * as baseAdapter from "./baseAdapter";

export const createExpenseClaim = (data: object) => {
  return baseAdapter.postForm("/expense-claims", data);
};

export const updateExpenseClaim = (id: number, data: object) => {
  return baseAdapter.put(`/expense-claims/${id}`, data);
};

export const approveExpenseClaim = (id: number) => {
  return baseAdapter.put(`/expense-claims/${id}/approve`, {});
};

export const rejectExpenseClaim = (id: number) => {
  return baseAdapter.put(`/expense-claims/${id}/reject`, {});
};

export const completeExpenseClaim = (id: number) => {
  return baseAdapter.put(`/expense-claims/${id}/complete`, {});
};
