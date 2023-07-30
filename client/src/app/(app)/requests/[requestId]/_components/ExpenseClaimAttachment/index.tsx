"use client";

import { ExpenseClaim } from "@/adapters/types";
import { faFile, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExpenseClaimAction({
  expenseClaim,
}: {
  expenseClaim: ExpenseClaim;
}) {
  const { attachments } = expenseClaim;
  return (
    <div>
      <h3 className="h3 mb-1">Attachment</h3>
      <p className="mb-4 text-xs text-gray-500 font-medium">
        Upload attachment up to 3 files
      </p>
      {attachments && attachments?.length > 0 ? (
        <AttachmentList attachments={attachments} />
      ) : (
        <div className="p-10 flex flex-col justify-center items-center border border-gray-300 rounded-lg">
          <FontAwesomeIcon
            icon={faFolderOpen}
            className="w-12 h-12 mb-4 text-gray-700"
          />
          <p className="text-lg font-medium">There is no attachment</p>
        </div>
      )}
    </div>
  );
}

function AttachmentList({
  attachments,
}: {
  attachments: ExpenseClaim["attachments"];
}) {
  return attachments?.map(({ name }, index) => (
    <div
      key={index}
      className="p-4 pr-6 mb-2 last:mb-0 flex justify-between items-center border border-gray-300 rounded-lg"
    >
      <div>
        <FontAwesomeIcon icon={faFile} className="mr-4 w-5 h-5" />
        <span className="font-medium">{name}</span>
      </div>
      <FontAwesomeIcon
        className="ml-4 w-5 h-5 text-red-600 cursor-pointer"
        icon={faTrash}
      />
    </div>
  ));
}
