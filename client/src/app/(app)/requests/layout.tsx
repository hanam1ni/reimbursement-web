import ExpenseClaimModal from "@/components/Modal/ExpenseClaimModal";
import RequestNavigation from "@/components/RequestNavigation";

export default async function RequestsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <RequestNavigation />
        <ExpenseClaimModal />
      </div>
      {children}
    </div>
  );
}
