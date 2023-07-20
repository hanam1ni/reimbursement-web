"use client";

import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const inActiveLinkClasses = "text-sm font-semibold text-gray-500";
const activeLinkClasses = "text-lg font-bold";

export default function RequestNavigation() {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className="flex gap-x-4 items-baseline">
      <li
        className={classNames({
          [inActiveLinkClasses]: segment != "my-requests",
          [activeLinkClasses]: segment == "my-requests",
        })}
      >
        <Link href="/requests/my-requests">Created</Link>
      </li>
      <li
        className={classNames("", {
          [inActiveLinkClasses]: segment != "review-requests",
          [activeLinkClasses]: segment == "review-requests",
        })}
      >
        <Link href="/requests/review-requests">Review requests</Link>
      </li>
    </ul>
  );
}
