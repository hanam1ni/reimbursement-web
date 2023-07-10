"use client";

import {
  IconDefinition,
  faBuilding,
  faRectangleList,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

interface NavigationItemProps {
  href: string;
  icon: IconDefinition;
  label: string;
  active: boolean;
}

const NAVIGATION_ITEMS = [
  {
    href: "/",
    icon: faBuilding,
    label: "Home",
    key: "home",
  },
  {
    href: "/users",
    icon: faUser,
    label: "Users",
    key: "users",
  },
  {
    href: "/departments",
    icon: faRectangleList,
    label: "Departments",
    key: "departments",
  },
];

const isItemActive = (segments: string[], key: string) => {
  if (segments.length == 0 && key == "home") {
    return true;
  } else if (segments.includes(key)) {
    return true;
  } else {
    return false;
  }
};

export default function Navigation() {
  const segments = useSelectedLayoutSegments();

  return (
    <ul>
      {NAVIGATION_ITEMS.map(({ key, href, icon, label }) => (
        <NavigationItem
          active={isItemActive(segments, key)}
          href={href}
          icon={icon}
          label={label}
          key={label}
        />
      ))}
    </ul>
  );
}

function NavigationItem({ active, href, icon, label }: NavigationItemProps) {
  const activeItemClasses = "bg-gray-100 text-primary";
  return (
    <Link href={href}>
      <li
        className={`px-5 py-3 mx-1 mb-1 flex items-center rounded-lg text-sm font-medium cursor-pointer transition hover:bg-gray-300 ${classNames(
          { [activeItemClasses]: active }
        )}`}
      >
        <FontAwesomeIcon className="w-5 h-5 mr-4" icon={icon} />
        <span>{label}</span>
      </li>
    </Link>
  );
}
