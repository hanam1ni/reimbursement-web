"use client";

import { User, listUsers } from "@/adapters/client/user";
import { debounce } from "radash";
import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default function UserSelect({
  onSelectUser,
}: {
  onSelectUser: (user: User) => void;
}) {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [userInputDirty, setUserInputDirty] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isDisplayUserDropdown, displayUserDropdown] = useState(false);
  const userFormGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userFormGroupRef.current &&
        !userFormGroupRef.current.contains(event.target as Node)
      ) {
        displayUserDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const onSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length < 3) {
      return;
    }

    const users = await listUsers(event.target.value);

    setUserOptions(users.data.data);
    setUserInputDirty(true);
  };

  const handleSelectUser = (user: User) => {
    setUserInput("");
    displayUserDropdown(false);
    setUserInputDirty(false);
    onSelectUser(user);
  };

  return (
    <div className="relative" ref={userFormGroupRef}>
      <label className="label">Users</label>
      <Input
        placeholder="Search Users by Email"
        className="w-96"
        value={userInput}
        onFocus={() => displayUserDropdown(true)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserInput(event.target.value);
          debounce({ delay: 300 }, onSearchInputChange)(event);
        }}
      />
      {isDisplayUserDropdown && userInputDirty && (
        <div className="absolute max-h-64 overflow-y-auto mt-2 z-10 shadow-lg">
          <UserDropdown
            userOptions={userOptions}
            onSelectUser={handleSelectUser}
          />
        </div>
      )}
    </div>
  );
}

function UserDropdown({
  userOptions,
  onSelectUser,
}: {
  userOptions: User[];
  onSelectUser: (user: User) => void;
}) {
  return (
    <ul className="w-64 bg-white border border-gray-200 rounded">
      {userOptions.length > 0 ? (
        userOptions.map((user) => {
          const { firstName, lastName, email } = user;

          return (
            <li
              key={email}
              className="px-3 py-2 rounded cursor-pointer transition hover:bg-gray-200 hover:text-primary"
              onClick={() => {
                onSelectUser(user);
              }}
            >
              <div className="font-medium">
                {firstName} {lastName}
              </div>
              <div className="text-sm">{email}</div>
            </li>
          );
        })
      ) : (
        <div className="py-8 flex flex-col items-center">
          <FontAwesomeIcon
            className="mb-4 h-8 w-8 text-gray-700"
            icon={faUserSecret}
          />
          <div className="font-medium">No users found</div>
        </div>
      )}
    </ul>
  );
}
