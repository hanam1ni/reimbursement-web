import * as baseAdapter from "./baseAdapter";

export const login = (body: { email: string; password: string }) => {
  return baseAdapter.post("/login", body);
};

export const signup = (body: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  return baseAdapter.publicPost("/signup", body);
};
