import { listMyExpenseClaim } from "@/adapters/server/expenseClaim";
import Pagination from "@/components/Pagination";
import ExpenseClaimTable from "@/components/Table/ExpenseClaimTable";

export default async function MyRequestsPage({
  searchParams,
}: ServerPageProps) {
  const { page } = searchParams;

  const expenseClaims = await listMyExpenseClaim(page);

  return (
    <>
      <div className="mb-8 flex-1">
        <ExpenseClaimTable
          data={expenseClaims.data.data}
          hideRequestedBy={true}
        />
      </div>
      <Pagination searchParams={searchParams} {...expenseClaims.data.page} />
    </>
  );
}
