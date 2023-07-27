import classNames from "classnames";
import React from "react";

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <>
        {label && <label className="label">{label}</label>}
        <textarea
          ref={ref}
          className={classNames(
            "textarea h-10 border border-gray-300 rounded-md bg-white shadow-sm text-sm font-medium resize-none focus:outline-primary",
            className
          )}
          {...props}
        />
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
