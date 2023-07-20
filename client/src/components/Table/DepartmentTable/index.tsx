"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import style from "../Table.module.scss";
import { Department } from "@/adapters/server/department";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const columnHelper = createColumnHelper<Department>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => <th className={`w-2/5 ${style.th}`}>Name</th>,
  }),
  columnHelper.accessor("userCount", {
    id: "userCount",
    header: () => <th className={`w-2/5 ${style.th}`}>Member</th>,
  }),
  columnHelper.display({
    id: "action",
    header: () => <th className={`w-1/12 ${style.th}`}></th>,
    cell: () => (
      <div className="dropdown dropdown-end pr-4 block text-right">
        <label
          tabIndex={0}
          className="inline-flex items-center p-1 cursor-pointer transition rounded-md hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] p-1 shadow bg-white border rounded-lg w-52 text-black"
        >
          <li className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100">
            Edit
          </li>
          <li className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100">
            Delete
          </li>
        </ul>
      </div>
    ),
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
