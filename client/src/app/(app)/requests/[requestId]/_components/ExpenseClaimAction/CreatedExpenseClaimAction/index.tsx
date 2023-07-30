import {
  approveExpenseClaim,
  rejectExpenseClaim,
} from "@/adapters/client/expenseClaim";
import {
  ExpenseClaim,
  ExpenseClaimStatus,
  User,
  UserDepartmentRole,
} from "@/adapters/types";
import Button from "@/components/Button";
import BaseModal from "@/components/modal/BaseModal";
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
        onClick={() => window["reject-expense-claim-modal"].showModal()}
      >
        <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5 mr-2" />
        Reject
      </li>
    </>
  );
}

export function Modal({ expenseClaim }: { expenseClaim: ExpenseClaim }) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const pathname = usePathname();

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      await approveExpenseClaim(expenseClaim.id);

      window.location.href = pathname;
    } catch (error) {
      setIsApproving(false);

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);

    try {
      await rejectExpenseClaim(expenseClaim.id);

      window.location.href = pathname;
    } catch (error) {
      setIsRejecting(false);

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  return (
    <>
      {formError && (
        <Toast
          body={formError}
          type="error"
          onDismiss={() => setFormError(null)}
        />
      )}
      <BaseModal id="approve-expense-claim-modal">
        <h3 className="h3 mb-2">Confirm Approval Request?</h3>
        <p>
          You are about to approve request:{" "}
          <span className="font-semibold">{expenseClaim.title}</span>
        </p>
        <div className="flex justify-end mt-4">
          <Button
            variant="success"
            onClick={handleApprove}
            className="mr-2"
            disabled={isApproving}
          >
            Approve
          </Button>
          <Button
            onClick={() => window["approve-expense-claim-modal"].close()}
            variant="ghost"
            disabled={isApproving}
          >
            Cancel
          </Button>
        </div>
      </BaseModal>
      <BaseModal id="reject-expense-claim-modal">
        <h3 className="h3 mb-2">Confirm Reject Request?</h3>
        <p>
          You are about to reject request:{" "}
          <span className="font-semibold">{expenseClaim.title}</span>
        </p>
        <div className="flex justify-end mt-4">
          <Button
            variant="error"
            onClick={handleReject}
            className="mr-2"
            disabled={isRejecting}
          >
            Reject
          </Button>
          <Button
            onClick={() => window["reject-expense-claim-modal"].close()}
            variant="ghost"
            disabled={isRejecting}
          >
            Cancel
          </Button>
        </div>
      </BaseModal>
    </>
  );
}
