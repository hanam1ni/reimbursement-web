import { PageInfo } from "@/helpers/paginationHelper";
import classNames from "classnames";
import Link from "next/link";

interface PaginationProps extends PageInfo {
  searchParams: ServerPageProps["searchParams"];
}

interface PaginationItemProps {
  item: string | number;
  active: boolean;
  searchParams: ServerPageProps["searchParams"];
}

const SIBLING_COUNT = 1;
const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const buildPaginationItem = ({
  totalCount,
  recordPerPage,
  currentPage,
}: PageInfo) => {
  const totalPageCount = Math.ceil(totalCount / recordPerPage);

  // SIBLING_COUNT + firstPage + lastPage + currentPage
  const pageCountWithDots = SIBLING_COUNT * 2 + 3;

  if (pageCountWithDots >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSiblingIndex = Math.min(
    currentPage + SIBLING_COUNT,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * SIBLING_COUNT;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * SIBLING_COUNT;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );

    return [1, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [1, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

export default function Pagination(props: PaginationProps) {
  const paginationItems = buildPaginationItem(props);

  return (
    <div className="flex justify-between items-center">
      <div className="text-xs text-gray-600 font-semibold">
        Showing {(props.currentPage - 1) * props.recordPerPage + 1} -{" "}
        {Math.min(props.currentPage * props.recordPerPage, props.totalCount)} of{" "}
        {props.totalCount} Items
      </div>
      <div className="join">
        {paginationItems?.map((item, index) => (
          <PaginationItem
            key={index}
            item={item}
            active={item == props.currentPage}
            searchParams={props.searchParams}
          />
        ))}
      </div>
    </div>
  );
}

function PaginationItem({ item, active, searchParams }: PaginationItemProps) {
  if (item == DOTS) {
    return (
      <button className="join-item btn btn-sm bg-gray-100 bg-opacity-50 border-gray-300 pointer-events-none">
        {DOTS}
      </button>
    );
  }

  const itemInactiveClass =
    "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-300";
  const itemActiveClass = "bg-gray-200 text-primary";

  return (
    <Link
      href={{ query: { ...searchParams, page: item } }}
      className={`${classNames({ "pointer-events-none": active })}`}
    >
      <button
        className={`join-item btn btn-sm border-gray-300 ${classNames(
          { [itemInactiveClass]: !active },
          { [itemActiveClass]: active }
        )}`}
      >
        {item}
      </button>
    </Link>
  );
}
