"use client";

import React from "react";

export interface BaseModalProps {
  id: string;
  children: React.ReactNode;
}

export default function BaseModal({ id, children }: BaseModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-white text-gray-700">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
