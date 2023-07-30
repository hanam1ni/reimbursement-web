import { completeExpenseClaim } from "@/adapters/client/expenseClaim";
import { ExpenseClaim, ExpenseClaimStatus, User } from "@/adapters/types";
import Button from "@/components/Button";
import BaseModal from "@/components/modal/BaseModal";
import Toast from "@/components/Toast";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
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
  if (expenseClaim.status !== ExpenseClaimStatus.APPROVED) {
    return null;
  }

  const userRoles = user.roles.map(({ name }) => name);
  const isFinance = userRoles.includes("finance");

  if (!isFinance) {
    return null;
  }

  return (
    <>
      <li
        className="py-2 pl-3 text-left rounded transition cursor-pointer hover:bg-gray-100"
        onClick={() => window["complete-expense-claim-modal"].showModal()}
      >
        <FontAwesomeIcon icon={faRectangleList} className="h-3.5 w-3.5 mr-2" />
        Mark as complete
      </li>
    </>
  );
}

export function Modal({ expenseClaim }: { expenseClaim: ExpenseClaim }) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const pathname = usePathname();

  const handleComplete = async () => {
    setIsCompleting(true);

    try {
      await completeExpenseClaim(expenseClaim.id);

      window.location.href = pathname;
    } catch (error) {
      setIsCompleting(false);

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
      <BaseModal id="complete-expense-claim-modal">
        <h3 className="h3 mb-2">Confirm Complete Request?</h3>
        <p>
          You are about to mark following request as complete:{" "}
          <span className="font-semibold">{expenseClaim.title}</span>
        </p>
        <div className="flex justify-end mt-4">
          <Button
            variant="success"
            onClick={handleComplete}
            className="mr-2"
            disabled={isCompleting}
          >
            Complete
          </Button>
          <Button
            onClick={() => window["complete-expense-claim-modal"].close()}
            variant="ghost"
            disabled={isCompleting}
          >
            Cancel
          </Button>
        </div>
      </BaseModal>
    </>
  );
}
