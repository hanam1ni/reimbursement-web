import React from "react";

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
}

export default function Button({ label, children }: ButtonProps) {
  return (
    <button className="btn btn-primary h-auto min-h-[unset] py-2 text-xs">
      {children || label}
    </button>
  );
}
