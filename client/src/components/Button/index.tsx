import classNames from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "primary" | "ghost" | "success" | "error";
  outline?: boolean;
  children?: React.ReactNode;
  size?: "xs" | "sm";
}

export default function Button({
  label,
  variant,
  outline,
  children,
  size,
  className,
  ...props
}: ButtonProps) {
  const sizeClasses = classNames({
    "btn-xs": size == "xs",
    "btn-sm": size == "sm",
  });

  const variantClasses = classNames({
    "btn-primary": variant == "primary" || variant == undefined,
    "btn-ghost": variant == "ghost",
    "btn-success": variant == "success",
    "btn-error": variant == "error",
  });

  const outlineClasses = classNames({
    "btn-outline": outline,
  });

  return (
    <button
      className={classNames(
        "btn",
        sizeClasses,
        variantClasses,
        outlineClasses,
        className
      )}
      {...props}
    >
      {children || label}
    </button>
  );
}
