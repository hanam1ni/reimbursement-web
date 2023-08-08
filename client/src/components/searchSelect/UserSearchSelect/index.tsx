"use client";

import { listUsers } from "@/adapters/client/user";
import { User } from "@/adapters/types";
import SearchSelect from "@/components/searchSelect/SearchSelect";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "radash";
import { useState } from "react";

export default function UserSearchSelect({
  onSelectUser,
  label,
}: {
  onSelectUser: (user: User) => void;
  label?: boolean;
}) {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [showList, setShowList] = useState(false);

  const onSearchInputChange = async (keyword: string) => {
    if (keyword.length < 3) {
      return setShowList(false);
    }

    const users = await listUsers(keyword);

    setUserOptions(users.data.data);
    setShowList(true);
  };

  return (
    <div className="relative w-full">
      <SearchSelect.Container
        label={label ? "Users" : ""}
        placeholder="Search Users by Email"
        onValueChange={(keyword) => {
          debounce({ delay: 300 }, onSearchInputChange)(keyword);
        }}
        emptyPlaceholder={<EmptyPlaceholder />}
        hideList={!showList}
      >
        {userOptions.map((user) => {
          const { firstName, lastName, email } = user;

          return (
            <SearchSelect.OptionItem
              key={email}
              onSelect={() => onSelectUser(user)}
            >
              <div className="flex justify-between items-end">
                <div className="text-sm font-medium">
                  {firstName} {lastName}
                </div>
                <div className="text-xs">{email}</div>
              </div>
            </SearchSelect.OptionItem>
          );
        })}
      </SearchSelect.Container>
    </div>
  );
}

function EmptyPlaceholder() {
  return (
    <div className="p-8 flex flex-col items-center">
      <FontAwesomeIcon
        className="mb-4 h-8 w-8 text-gray-700"
        icon={faUserSecret}
      />
      <div className="font-medium">No users found</div>
    </div>
  );
}
