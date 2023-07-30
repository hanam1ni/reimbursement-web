"use client";

import { ExpenseClaim } from "@/adapters/types";
import ExpenseClaimAction from "../ExpenseClaimAction";
import BackNavigation from "@/components/BackNavigation";
import dayjs from "dayjs";
import ExpenseClaimBadge from "@/components/Badge/ExpenseClaimBadge";

interface ExpenseClaimSummaryProps {
  expenseClaim: ExpenseClaim;
}

export default function ExpenseClaimSummary({
  expenseClaim,
}: ExpenseClaimSummaryProps) {
  return (
    <>
      <div className="flex justify-between mb-8">
        <BackNavigation href={"/requests/my-requests"} />
        <ExpenseClaimAction expenseClaim={expenseClaim} />
      </div>
      <div className="flex justify-between items-center pb-4 mb-8 border-b border-gray-200">
        <div>
          <h2 className="h2">{expenseClaim.title}</h2>
          <p className="text-gray-500 text-xs font-medium">
            {dayjs(expenseClaim.createdAt).format("DD MMMM YYYY H:m:s")}
          </p>
        </div>
        <div className="mr-4 text-xl font-bold">#{expenseClaim.id}</div>
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        <div>
          <p className="text-gray-500 text-xs font-medium">Amount</p>
          <p className="text-lg font-medium">
            {expenseClaim.amount.toLocaleString()} THB
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">Status</p>
          <div className="text-lg font-medium capitalize">
            <ExpenseClaimBadge status={expenseClaim.status} />
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">Requested By</p>
          <p className="text-lg font-medium">
            {`${expenseClaim.createdBy.firstName} ${expenseClaim.createdBy.lastName}`}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">Reviewed By</p>

          {expenseClaim.approvedBy || expenseClaim.rejectedBy ? (
            <p className="text-lg font-medium">{`${
              expenseClaim.approvedBy?.firstName ||
              expenseClaim.rejectedBy?.firstName
            } ${
              expenseClaim.approvedBy?.lastName ||
              expenseClaim.rejectedBy?.lastName
            }`}</p>
          ) : (
            <p className="text-md leading-7 font-medium">Waiting for review</p>
          )}
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs font-medium">Description</p>
          <p className="text-md leading-7 font-medium">
            {expenseClaim.description}
          </p>
        </div>
      </div>
    </>
  );
}
