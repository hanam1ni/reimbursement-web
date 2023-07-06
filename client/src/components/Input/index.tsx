import classNames from "classnames";
import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>(({ type, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type || "text"}
      className={classNames(
        "input h-10 border border-gray-300 rounded-sm bg-gray-100 focus:outline-primary",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
