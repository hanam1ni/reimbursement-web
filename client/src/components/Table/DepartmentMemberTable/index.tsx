"use client";

import { Department } from "@/adapters/types";
import { ElementType } from "@/lib/typesUtil";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import style from "../Table.module.scss";
import MemberAction from "./MemberAction";

const columnHelper =
  createColumnHelper<ElementType<Department["userDepartments"]>>();

const columns = [
  columnHelper.accessor((row) => `${row.user.firstName} ${row.user.lastName}`, {
    id: "name",
    header: () => <th className={`w-2/5 ${style.th}`}>Name</th>,
  }),
  columnHelper.accessor("role", {
    id: "role",
    cell: (info) => (
      <div className="capitalize" key={info.getValue()}>
        {info.getValue()}
      </div>
    ),
    header: () => <th className={`w-2/5 ${style.th}`}>Role</th>,
  }),
  columnHelper.display({
    id: "action",
    header: () => <th className={`w-1/12 ${style.th}`}></th>,
    cell: (info) => <MemberAction userDepartment={info.row.original} />,
  }),
];

export default function DepartmentMemberTable({ data }: { data: any }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className={`${style.table}`}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`${style.tr}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`${style.td}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
