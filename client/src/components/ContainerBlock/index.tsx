import classNames from "classnames";

export default function ContainerBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={classNames(
        "p-8 bg-white border border-gray-300 rounded-lg",
        className
      )}
    >
      {children}
    </section>
  );
}
