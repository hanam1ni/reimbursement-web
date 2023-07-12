import * as baseAdapter from "./baseAdapter";

export const createDepartment = ({
  name,
  userIds,
}: {
  name: string;
  userIds: number[];
}) => {
  return baseAdapter.post("/departments", { name, userIds });
};
