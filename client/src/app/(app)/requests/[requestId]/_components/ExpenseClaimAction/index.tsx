"use client";

import { ExpenseClaim } from "@/adapters/types";
import { UserContext } from "@/context/UserContext";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import * as CreatedExpenseClaimAction from "./CreatedExpenseClaimAction";
import classNames from "classnames";

export default function ExpenseClaimAction({
  expenseClaim,
}: {
  expenseClaim: ExpenseClaim;
}) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const actionList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (actionList.current!.childNodes.length > 0) {
      setShow(true);
    }
  }, []);

  return (
    <div
      className={classNames("dropdown dropdown-end pr-4", {
        "opacity-0 pointer-events-none": !show,
        "opacity-100": show,
      })}
    >
      <label
        tabIndex={0}
        className="inline-flex items-center p-1 cursor-pointer transition rounded-md hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-1 shadow bg-white border rounded-lg w-36 text-black text-sm"
        ref={actionList}
      >
        <CreatedExpenseClaimAction.Dropdown
          expenseClaim={expenseClaim}
          user={user}
        />
      </ul>
      <CreatedExpenseClaimAction.Modal expenseClaim={expenseClaim} />
    </div>
  );
}
