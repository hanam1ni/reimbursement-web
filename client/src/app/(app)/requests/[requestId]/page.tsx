import { getExpenseClaim } from "@/adapters/server/expenseClaim";

export default async function RequestDetailPage({ params }: ServerPageProps) {
  const requestId = params.requestId;

  const expenseClaim = await getExpenseClaim(requestId);

  return (
    <>
      <div className="mb-8 flex-1">{expenseClaim.data.amount}</div>
    </>
  );
}
