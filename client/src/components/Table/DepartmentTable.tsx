"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import style from "./Table.module.scss";
import { Department } from "@/adapters/server/department";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
}

const columnHelper = createColumnHelper<Department>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => <th className={`w-2/5 ${style.th}`}>Name</th>,
  }),
  columnHelper.accessor("userCount", {
    id: "userCount",
    header: () => <th className={`w-1/5 ${style.th}`}>Member</th>,
  }),
];

export default function DepartmentTable({ data }: { data: any }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
  );
}
