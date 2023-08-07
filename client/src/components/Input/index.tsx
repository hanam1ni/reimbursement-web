import classNames from "classnames";
import React from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, label, ...props }, ref) => {
    return (
      <div>
        {label && <label className="label">{label}</label>}
        <input
          ref={ref}
          type={type || "text"}
          className={classNames("input", className)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
