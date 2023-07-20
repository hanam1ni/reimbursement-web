"use client";

import { createExpenseClaim } from "@/adapters/client/expenseClaim";
import Button from "@/components/Button";
import Input from "@/components/Input";
import BaseModal from "@/components/Modal/BaseModal";
import Toast from "@/components/Toast";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IExpenseClaimForm {
  amount: number;
}

export default function ExpenseClaimModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const pathname = usePathname();

  const { register, handleSubmit } = useForm<IExpenseClaimForm>();

  const onSubmit: SubmitHandler<IExpenseClaimForm> = async (data) => {
    setIsSubmitting(true);

    try {
      await createExpenseClaim(data);

      window.location.href = pathname;
    } catch (error) {
      setIsSubmitting(false);

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
      <Button
        onClick={() => window["create-expense-claim-modal"].showModal()}
        size="sm"
      >
        {" "}
        <FontAwesomeIcon icon={faPlus} />
        New
      </Button>
      <BaseModal id="create-expense-claim-modal">
        <h1 className="mb-4">New Request</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="200"
            label="Amount"
            className="w-96"
            {...register("amount", { valueAsNumber: true })}
          />
          <Button className="mt-4" size="sm" disabled={isSubmitting}>
            Submit Request
          </Button>
        </form>
      </BaseModal>
    </>
  );
}
