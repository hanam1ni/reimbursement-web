import { getExpenseClaim } from "@/adapters/server/expenseClaim";
import ExpenseClaimSummary from "./_components/ExpenseClaimSummary";
import ContainerBlock from "@/components/ContainerBlock";

export default async function RequestDetailPage({ params }: ServerPageProps) {
  const requestId = params.requestId;

  const expenseClaim = await getExpenseClaim(requestId);

  return (
    <div className="flex">
      <div className="flex-1 mr-4">
        <ContainerBlock className="mb-4">
          <ExpenseClaimSummary expenseClaim={expenseClaim.data} />
        </ContainerBlock>
        <ContainerBlock>
          <h3>Attachment</h3>
        </ContainerBlock>
      </div>
      <div className="basis-96">
        <ContainerBlock>
          <h3>Activity Log</h3>
        </ContainerBlock>
      </div>
    </div>
  );
}
