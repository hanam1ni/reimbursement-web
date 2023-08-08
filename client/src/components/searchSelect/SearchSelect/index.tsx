"use client";

import classNames from "classnames";
import { Command } from "cmdk";
import { useEffect, useRef, useState } from "react";
import styles from "./InputSelect.module.scss";

interface InputSelectProps {
  label?: string;
  placeholder?: string;
  onValueChange?: (keyword: string) => void;
  emptyPlaceholder?: React.ReactNode;
  children: React.ReactNode;
  hideList?: boolean;
}

function Container({
  placeholder,
  onValueChange,
  emptyPlaceholder,
  children,
  label,
  hideList,
}: InputSelectProps) {
  const [displayList, setDisplayList] = useState(false);
  const [inputDirty, setInputDirty] = useState(false);
  const userFormGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userFormGroupRef.current &&
        !userFormGroupRef.current.contains(event.target as Node)
      ) {
        setDisplayList(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      {label && <label className="label">{label}</label>}
      <Command className="w-full" shouldFilter={false} ref={userFormGroupRef}>
        <Command.Input
          className="input w-full"
          placeholder={placeholder}
          onValueChange={(keyword) => {
            setInputDirty(true);
            onValueChange && onValueChange(keyword);
          }}
          onFocus={() => setDisplayList(true)}
        />

        <Command.List
          className={classNames(
            "absolute w-full max-h-60 overflow-y-auto bg-white mt-2 z-10 border border-gray-200 rounded",
            { hidden: hideList || !inputDirty || !displayList }
          )}
        >
          <Command.Empty className="w-full">
            {emptyPlaceholder ? emptyPlaceholder : "No result found"}
          </Command.Empty>

          {children}
        </Command.List>
      </Command>
    </>
  );
}

function OptionItem({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <Command.Item className={styles.item} onSelect={onSelect}>
      {children}
    </Command.Item>
  );
}

const SearchSelect = {
  Container,
  OptionItem,
};

export default SearchSelect;
