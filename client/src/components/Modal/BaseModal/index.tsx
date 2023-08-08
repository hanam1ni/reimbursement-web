"use client";

import classNames from "classnames";
import React from "react";

export interface BaseModalProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function BaseModal({ id, children, className }: BaseModalProps) {
  return (
    <dialog id={id} className="modal">
      <div
        className={classNames("modal-box bg-white text-gray-700", className)}
      >
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
