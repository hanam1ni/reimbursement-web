import ContainerBlock from "@/components/ContainerBlock";
import ExpenseClaimModal from "@/components/Modal/ExpenseClaimModal";
import RequestNavigation from "@/components/RequestNavigation";

export default async function RequestsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContainerBlock className="h-full flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <RequestNavigation />
        <ExpenseClaimModal />
      </div>
      {children}
    </ContainerBlock>
  );
}
