"use client";

import { ExpenseClaim } from "@/adapters/types";
import ExpenseClaimAction from "../ExpenseClaimAction";
import BackNavigation from "@/components/BackNavigation";
import dayjs from "dayjs";

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
          <h2>{expenseClaim.title}</h2>
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
          <p className="text-lg font-medium capitalize">
            {expenseClaim.status}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">Requested By</p>
          <p className="text-lg font-medium">
            {`${expenseClaim.createdBy.firstName} ${expenseClaim.createdBy.lastName}`}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">Approved By</p>

          {expenseClaim.approvedBy ? (
            <p className="text-lg font-medium">{`${expenseClaim.approvedBy.firstName} ${expenseClaim.approvedBy.lastName}`}</p>
          ) : (
            <p className="text-md leading-7 font-medium">
              Waiting for approval
            </p>
          )}
        </div>
      </div>
    </>
  );
}
