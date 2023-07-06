"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

interface ToastProp {
  body: string;
  type: "info" | "success" | "warning" | "error";
  onDismiss?: MouseEventHandler<HTMLDivElement>;
}

export default function Toast({ body, type, onDismiss }: ToastProp) {
  return (
    <div className="toast toast-top toast-end">
      <div
        className={`alert alert-${type || "info"} relative text-sm font-medium`}
      >
        <span>{body}</span>
        <div className="absolute right-4 cursor-pointer" onClick={onDismiss}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </div>
  );
}
