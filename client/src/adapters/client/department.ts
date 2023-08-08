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

export const bulkAssignMember = (departmentId: number, userIds: number[]) => {
  return baseAdapter.post(`/departments/${departmentId}/bulk-assign-user`, {
    userIds,
  });
};
