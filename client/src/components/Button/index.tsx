import classNames from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: React.ReactNode;
  size?: "sm";
}

export default function Button({
  label,
  children,
  size,
  className,
  ...props
}: ButtonProps) {
  const sizeClasses = classNames({
    "btn-sm": size == "sm",
  });

  return (
    <button
      className={classNames("btn btn-primary", sizeClasses, className)}
      {...props}
    >
      {children || label}
    </button>
  );
}
