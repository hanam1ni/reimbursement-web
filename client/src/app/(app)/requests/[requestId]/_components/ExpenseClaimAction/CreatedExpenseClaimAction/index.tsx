import { approveExpenseClaim } from "@/adapters/client/expenseClaim";
import {
  ExpenseClaim,
  ExpenseClaimStatus,
  User,
  UserDepartmentRole,
} from "@/adapters/types";
import Button from "@/components/Button";
import BaseModal from "@/components/Modal/BaseModal";
import Toast from "@/components/Toast";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Dropdown({
  expenseClaim,
  user,
}: {
  expenseClaim: ExpenseClaim;
  user: User;
}) {
  if (expenseClaim.status !== ExpenseClaimStatus.CREATED) {
    return null;
  }

  const userRoles = user.userDepartments.map(({ role }) => role);
  const isManager = userRoles.includes(UserDepartmentRole.MANAGER);

  if (!isManager) {
    return null;
  }

  return (
    <>
      <li
        key="approve"
        className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100"
        onClick={() => window["approve-expense-claim-modal"].showModal()}
      >
        <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 mr-2" />
        Approve
      </li>
      <li
        key="reject"
        className="py-2 pl-3 text-left rounded transition cursor-pointer text-red-600 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5 mr-2" />
        Reject
      </li>
    </>
  );
}

export function Modal({ expenseClaim }: { expenseClaim: ExpenseClaim }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const pathname = usePathname();

  const handleApprove = async () => {
    setIsSubmitting(true);

    try {
      await approveExpenseClaim(expenseClaim.id);

      window.location.href = pathname;
    } catch (error) {
      setIsSubmitting(false);

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  return (
    <BaseModal id="approve-expense-claim-modal">
      {formError && (
        <Toast
          body={formError}
          type="error"
          onDismiss={() => setFormError(null)}
        />
      )}
      <h3 className="mb-2">Confirm Approval Request?</h3>
      <p>
        You are about to approve request:{" "}
        <span className="font-semibold">{expenseClaim.title}</span>
      </p>
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleApprove}
          className="mr-2"
          disabled={isSubmitting}
        >
          Confirm
        </Button>
        <Button
          onClick={() => window["approve-expense-claim-modal"].close()}
          variant="ghost"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
}
