"use client";

import Button from "@/components/Button";
import BaseModal from "@/components/modal/BaseModal";
import ExpenseClaimForm from "@/components/form/ExpenseClaimForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExpenseClaimModal() {
  return (
    <>
      <Button
        onClick={() => window["create-expense-claim-modal"].showModal()}
        size="sm"
      >
        {" "}
        <FontAwesomeIcon icon={faPlus} />
        New
      </Button>
      <BaseModal id="create-expense-claim-modal">
        <ExpenseClaimForm mode="new" />
      </BaseModal>
    </>
  );
}
