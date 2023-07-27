"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { default as dayjs } from "dayjs";
import React, { useMemo } from "react";
import style from "../Table.module.scss";
import { useRouter } from "next/navigation";
import { ExpenseClaim } from "@/adapters/types";
import ExpenseClaimBadge from "@/components/Badge/ExpenseClaimBadge";

const columnHelper = createColumnHelper<ExpenseClaim>();

let columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: () => <th className={`w-1/12 ${style.th}`}>Id</th>,
  }),
  columnHelper.accessor("title", {
    id: "title",
    header: () => <th className={`w-2/12 ${style.th}`}>Title</th>,
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: () => <th className={`w-1/12 ${style.th}`}>Amount</th>,
    cell: (info) => (
      <div className="font-medium">{`${info
        .getValue()
        .toLocaleString()} THB`}</div>
    ),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => <th className={`w-1/12 ${style.th}`}>Status</th>,
    cell: (info) => <ExpenseClaimBadge status={info.getValue()} />,
  }),
  columnHelper.accessor(
    (row) => `${row.createdBy.firstName} ${row.createdBy.lastName}`,
    {
      id: "requestedBy",
      header: () => <th className={`w-2/12 ${style.th}`}>Requested By</th>,
    }
  ),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: () => <th className={`w-1/12 ${style.th}`}>Requested At</th>,
    cell: (info) => (
      <span>{dayjs(info.getValue()).format("DD MMMM YYYY")}</span>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: () => <th className={`w-1/12 ${style.th}`}>Last Updated</th>,
    cell: (info) => (
      <span>{dayjs(info.getValue()).format("DD MMMM YYYY")}</span>
    ),
  }),
];

export default function ExpenseClaimTable({
  data,
  hideRequestedBy,
}: {
  data: any;
  hideRequestedBy?: boolean;
}) {
  const router = useRouter();

  const tableColumns = useMemo(() => {
    if (hideRequestedBy) {
      return columns.filter(({ id }) => id != "requestedBy");
    }

    return columns;
  }, [hideRequestedBy]);

  const table = useReactTable({
    data,
    columns: tableColumns,
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
          <tr
            key={row.id}
            className={`${style.tr} cursor-pointer`}
            onClick={() => router.push(`/requests/${row.original.id}`)}
          >
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
