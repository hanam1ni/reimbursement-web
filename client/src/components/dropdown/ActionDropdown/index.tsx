"use client";

import { IconDefinition, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ActionDropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  icon?: IconDefinition;
}

const ActionDropdown = DropdownMenu.Root;

function ActionDropdownTrigger() {
  return (
    <DropdownMenu.Trigger
      className="items-center p-1 cursor-pointer transition rounded-md hover:bg-gray-200"
      asChild
    >
      <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
    </DropdownMenu.Trigger>
  );
}

function ActionDropdownContent({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="start"
        className="w-48 py-1 bg-white border rounded-lg text-black text-sm"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

const ActionDropdownItem = React.forwardRef<
  HTMLDivElement,
  ActionDropdownItemProps
>(({ children, className, icon, ...props }, forwardedRef) => {
  return (
    <DropdownMenu.Item
      className={twMerge(
        "flex items-center py-2 pl-4 rounded transition cursor-pointer font-medium text-sm text-gray-600 hover:bg-gray-100 focus:outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {icon && <FontAwesomeIcon icon={icon} className="h-3 w-3 mr-2" />}
      {children}
    </DropdownMenu.Item>
  );
});

ActionDropdownItem.displayName = "ActionDropdownItem";

export {
  ActionDropdown,
  ActionDropdownTrigger,
  ActionDropdownContent,
  ActionDropdownItem,
};
