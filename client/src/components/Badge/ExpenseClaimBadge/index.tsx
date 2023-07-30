import { ExpenseClaimStatus } from "@/adapters/types";
import Badge from "@/components/Badge";

export default function ExpenseClaimBadge({
  status,
}: {
  status: ExpenseClaimStatus;
}) {
  const variant = badgeVariant(status);

  return (
    <Badge variant={variant} className="text-xs font-medium capitalize">
      {status}
    </Badge>
  );
}

const badgeVariant = (status: ExpenseClaimStatus) => {
  switch (status) {
    case ExpenseClaimStatus.APPROVED:
      return "primary";

    case ExpenseClaimStatus.COMPLETED:
      return "success";

    case ExpenseClaimStatus.REJECTED:
      return "error";

    default:
      return "info";
  }
};
