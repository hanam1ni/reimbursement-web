"use client";

import {
  createExpenseClaim,
  updateExpenseClaim,
} from "@/adapters/client/expenseClaim";
import { ExpenseClaim } from "@/adapters/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Toast from "@/components/Toast";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IExpenseClaimForm {
  title: string;
  amount: number;
  description: string;
  attachment: File[];
}

type ExpenseClaimFormProps =
  | {
      mode: "new";
    }
  | {
      mode: "edit";
      expenseClaim: ExpenseClaim;
    };

export default function ExpenseClaimForm(props: ExpenseClaimFormProps) {
  const { mode } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const pathname = usePathname();

  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<IExpenseClaimForm>({
      defaultValues: { attachment: [] },
    });

  const attachment = watch("attachment");

  const handleFormSubmit: SubmitHandler<IExpenseClaimForm> = async (data) => {
    setIsSubmitting(true);

    try {
      if (mode === "new") {
        await createExpenseClaim(data);
      }

      if (mode === "edit") {
        await updateExpenseClaim(props.expenseClaim.id, data);
      }

      window.location.href = pathname;
    } catch (error) {
      setIsSubmitting(false);

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const attachment = getValues("attachment");
    attachment.splice(index, 1);

    setValue("attachment", attachment);
  };

  const handleAddAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const attachment = getValues("attachment");
    const fileNames = attachment.map(({ name }) => name);

    if (
      event.target.files?.length == 0 ||
      fileNames.includes(event.target.files![0].name)
    ) {
      return;
    }

    setValue("attachment", [...attachment, event.target.files![0]]);
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
      <h3 className="h3 mb-4">
        {mode === "new" && "New Request"}
        {mode === "edit" && "Edit Request"}
      </h3>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-y-4 w-96"
        encType="multipart/form-data"
      >
        <Input
          placeholder="Reimbursement Request"
          label="Title"
          className="w-full"
          defaultValue={mode === "edit" ? props.expenseClaim.title : ""}
          {...register("title")}
        />
        <Input
          placeholder="200"
          label="Amount"
          className="w-full"
          disabled={mode === "edit"}
          defaultValue={mode === "edit" ? props.expenseClaim.amount : ""}
          {...register("amount", { valueAsNumber: true })}
        />
        <Textarea
          label="Description"
          placeholder="Detail about your request"
          className="w-full h-32"
          defaultValue={mode === "edit" ? props.expenseClaim.description : ""}
          {...register("description")}
        />
        {mode === "new" && (
          <div>
            <label className="label pb-0">Attachments</label>
            <p className="mb-3 text-xs text-gray-500 font-medium">
              Upload attachment up to 3 files
            </p>
            <div className=" flex flex-col gap-y-1">
              <AttachmentPreview
                attachment={attachment}
                onRemoveAttachment={handleRemoveAttachment}
              />
              <AddAttachmentButton
                attachment={attachment}
                onAddAttachment={handleAddAttachment}
              />
            </div>
          </div>
        )}
        <Button size="sm" disabled={isSubmitting}>
          {mode === "new" && "Submit Request"}
          {mode === "edit" && "Update Request"}
        </Button>
      </form>
    </>
  );
}

function AttachmentPreview({
  attachment,
  onRemoveAttachment,
}: {
  attachment: File[];
  onRemoveAttachment: (index: number) => void;
}) {
  return attachment.map((file, index) => (
    <div
      key={index}
      className="flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg last:mb-2"
    >
      <div className="mr-2 whitespace-nowrap overflow-hidden text-ellipsis text-xs">
        {file.name}
      </div>
      <FontAwesomeIcon
        className="w-3 h-3 text-red-400 cursor-pointer"
        icon={faTrash}
        onClick={() => onRemoveAttachment(index)}
      />
    </div>
  ));
}

function AddAttachmentButton({
  attachment,
  onAddAttachment,
}: {
  attachment: File[];
  onAddAttachment: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={classNames(
        "flex justify-center items-center w-96 h-8 rounded-lg border border-gray-300 text-gray-400",
        {
          "cursor-pointer transition hover:bg-gray-100": attachment.length < 3,
        },
        { "cursor-not-allowed opacity-30": attachment.length >= 3 }
      )}
    >
      <FontAwesomeIcon icon={faPlus} />
      <input
        disabled={attachment.length >= 3}
        hidden
        type="file"
        className="file-input w-full max-w-xs"
        accept="image/*,.pdf"
        onChange={onAddAttachment}
      />
    </label>
  );
}
