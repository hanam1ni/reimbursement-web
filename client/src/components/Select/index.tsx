"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";
import { twMerge } from "tailwind-merge";
import styles from "./Select.module.scss";

const Select = SelectPrimitive.Root;

const SelectInput = React.forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectValueProps
>(({ className, placeholder }, forwardedRef) => {
  return (
    <SelectPrimitive.Trigger
      className={twMerge(styles.input, className)}
      ref={forwardedRef}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className="absolute right-4">
        <FontAwesomeIcon icon={faChevronDown} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

SelectInput.displayName = "SelectInput";

const SelectOption = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectContentProps
>(({ children }, forwardedRef) => {
  return (
    <SelectPrimitive.Content
      className={styles.content}
      position="popper"
      ref={forwardedRef}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
});

SelectOption.displayName = "SelectOption";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.SelectItem
      className={styles.item}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.SelectItem>
  );
});

SelectItem.displayName = "SelectItem";

export { Select, SelectInput, SelectOption, SelectItem };
