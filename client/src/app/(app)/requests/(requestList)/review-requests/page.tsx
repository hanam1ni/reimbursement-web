import { listReviewExpenseClaim } from "@/adapters/server/expenseClaim";
import Pagination from "@/components/Pagination";
import ExpenseClaimTable from "@/components/Table/ExpenseClaimTable";

export default async function ReviewRequestsPage({
  searchParams,
}: ServerPageProps) {
  const { page } = searchParams;

  const expenseClaims = await listReviewExpenseClaim(page);

  return (
    <>
      <div className="mb-8 flex-1">
        <ExpenseClaimTable data={expenseClaims.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...expenseClaims.data.page} />
    </>
  );
}
