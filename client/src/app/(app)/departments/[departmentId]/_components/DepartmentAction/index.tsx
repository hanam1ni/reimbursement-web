"use client";

import { Department } from "@/adapters/types";
import AddMemberModal from "./AddMemberModal";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DepartmentAction({
  department,
}: {
  department: Department;
}) {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="inline-flex items-center p-1 cursor-pointer transition rounded-md hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-1 shadow bg-white border rounded-lg w-48 text-black text-sm"
      >
        <li
          className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100"
          onClick={() => window["add-member-modal"].showModal()}
        >
          <FontAwesomeIcon icon={faPlus} className="h-3.5 w-3.5 mr-2" />
          Add member
        </li>
      </ul>
      <AddMemberModal department={department} />
    </div>
  );
}
