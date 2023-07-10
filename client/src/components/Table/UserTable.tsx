"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import style from "./Table.module.scss";
import { User } from "@/adapters/server/user";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: () => <th className={`w-2/5 ${style.th}`}>Name</th>,
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => <th className={`w-2/5 ${style.th}`}>Email</th>,
  }),
  columnHelper.accessor("roles", {
    id: "roles",
    cell: (info) =>
      info.getValue().map(({ name }) => (
        <div
          className="badge badge-primary mr-1 inline-block text-xs capitalize"
          key={name}
        >
          {name}
        </div>
      )),
    header: () => <th className={`w-1/5 ${style.th}`}>Roles</th>,
  }),
];

export default function UserTable({ data }: { data: any }) {
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
