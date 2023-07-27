import classNames from "classnames";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "info" | "success" | "error";
  className?: string;
}

export default function Badge({ children, variant, className }: BadgeProps) {
  const variantClass = classNames({
    "badge-primary": variant === "primary" || variant === undefined,
    "badge-info text-white": variant === "info",
    "badge-success": variant === "success",
    "badge-error": variant === "error",
  });

  return (
    <div className={classNames("badge", variantClass, className)}>
      {children}
    </div>
  );
}
