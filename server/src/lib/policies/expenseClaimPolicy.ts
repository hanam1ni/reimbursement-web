import ExpenseClaim from "@/entities/ExpenseClaim";
import User from "@/entities/User";
import { UserDepartmentRole } from "@/entities/UserDepartment";
import { UnauthorizedError } from "@/lib/errors";

export const authorizeGetExpenseClaim = (
  user: User,
  expenseClaim: ExpenseClaim
) => {
  if (user.id === expenseClaim.createdBy?.id) {
    return true;
  }

  const managerRoles = managerRoleForExpenseClaim(user, expenseClaim);

  if (managerRoles.length > 0) {
    return true;
  }

  for (const role of user.roles) {
    if (["admin", "finance", "account"].includes(role.name)) {
      return true;
    }
  }

  throw new UnauthorizedError();
};

export const authorizeUpdateExpenseClaim = (
  user: User,
  expenseClaim: ExpenseClaim
) => {
  if (user.id == expenseClaim.createdBy?.id) {
    return true;
  }

  throw new UnauthorizedError();
};

export const authorizeApproveExpenseClaim = (
  user: User,
  expenseClaim: ExpenseClaim
) => {
  const managerRoles = managerRoleForExpenseClaim(user, expenseClaim);

  if (managerRoles.length > 0) {
    return true;
  }

  throw new UnauthorizedError();
};

const managerRoleForExpenseClaim = (user: User, expenseClaim: ExpenseClaim) => {
  const requestFromDepartmentIds = expenseClaim.createdBy?.departments
    .toArray()
    .map(({ id }) => id);

  const managerRoles = user.userDepartments
    .toArray()
    .filter(
      ({ department, role }) =>
        requestFromDepartmentIds?.includes(department.id) &&
        role === UserDepartmentRole.MANAGER
    );

  return managerRoles;
};
