"use client";

import { Department } from "@/adapters/types";

import BackNavigation from "@/components/BackNavigation";
import dayjs from "dayjs";

interface DepartmentSummaryProps {
  department: Department;
}

export default function DepartmentSummary({
  department,
}: DepartmentSummaryProps) {
  console.log(department);
  return (
    <>
      <div className="flex justify-between mb-8">
        <BackNavigation href={"/departments"} />
      </div>
      <div className="flex justify-between items-center pb-4 mb-8 border-b border-gray-200">
        <div>
          <h2 className="h2">{department.name}</h2>
          <p className="text-gray-500 text-xs font-medium">
            {dayjs(department.createdAt).format("DD MMMM YYYY H:m:s")}
          </p>
        </div>
        <div className="mr-4 text-xl font-bold">#{department.id}</div>
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        <div>
          <p className="text-gray-500 text-xs font-medium">Total members</p>
          <p className="text-lg font-medium">
            {department.userDepartments.length}
          </p>
        </div>
      </div>
    </>
  );
}
