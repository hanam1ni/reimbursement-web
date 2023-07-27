"use client";

import {
  ExpenseClaim,
  ExpenseClaimStatus,
  User,
  UserDepartmentRole,
} from "@/adapters/types";
import { UserContext } from "@/context/UserContext";
import {
  faCheck,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function ExpenseClaimDropdown({
  expenseClaim,
}: {
  expenseClaim: ExpenseClaim;
}) {
  const { user } = useContext(UserContext);

  const dropdownActions = [...createdExpenseClaimActions(expenseClaim, user)];

  if (dropdownActions.length === 0) {
    return null;
  }

  return (
    <div className="dropdown dropdown-end pr-4 block text-right">
      <label
        tabIndex={0}
        className="inline-flex items-center p-1 cursor-pointer transition rounded-md hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-1 shadow bg-white border rounded-lg w-36 text-black text-sm"
      >
        {dropdownActions.map((action) => action)}
      </ul>
    </div>
  );
}

function createdExpenseClaimActions(expenseClaim: ExpenseClaim, user: User) {
  if (expenseClaim.status !== ExpenseClaimStatus.CREATED) {
    return [];
  }

  const userRoles = user.userDepartments.map(({ role }) => role);
  const isManager = userRoles.includes(UserDepartmentRole.MANAGER);

  if (!isManager) {
    return [];
  }

  return [
    <li
      key="approve"
      className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100"
    >
      <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 mr-2" />
      Approve
    </li>,
    <li
      key="reject"
      className="py-2 pl-3 text-left rounded transition cursor-pointer text-red-600 hover:bg-gray-100"
    >
      <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5 mr-2" />
      Reject
    </li>,
  ];
}
