import Button from "@/components/Button";
import { listMyExpenseClaim } from "@/adapters/server/expenseClaim";
import Pagination from "@/components/Pagination";
import ExpenseClaimTable from "@/components/Table/ExpenseClaimTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BaseModal from "@/components/Modal/BaseModal";
import ExpenseClaimModal from "@/components/Modal/ExpenseClaimModal";

export default async function RequestsPage({ searchParams }: ServerPageProps) {
  const { page } = searchParams;

  const expenseClaims = await listMyExpenseClaim(page);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <h1>Requests</h1>
        <ExpenseClaimModal />
      </div>
      <div className="mb-8 flex-1">
        <ExpenseClaimTable data={expenseClaims.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...expenseClaims.data.page} />
    </div>
  );
}
