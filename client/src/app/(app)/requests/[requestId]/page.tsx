import { getExpenseClaim } from "@/adapters/server/expenseClaim";
import ContainerBlock from "@/components/ContainerBlock";
import ExpenseClaimSummary from "@/components/ExpenseClaimSummary";

export default async function RequestDetailPage({ params }: ServerPageProps) {
  const requestId = params.requestId;

  const expenseClaim = await getExpenseClaim(requestId);

  return (
    <div className="flex">
      <div className="flex-1 mr-4">
        <ContainerBlock>
          <ExpenseClaimSummary expenseClaim={expenseClaim.data} />
        </ContainerBlock>
      </div>
      <div className=" basis-96">
        <ContainerBlock>
          <h3>Activity Log</h3>
        </ContainerBlock>
      </div>
    </div>
  );
}
