"use client";

import { User } from "@/adapters/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

interface SelectedUserListProps {
  users: User[];
  onRemoveUser: (user: User) => void;
}

export default function SelectedUserList({
  users,
  onRemoveUser,
}: SelectedUserListProps) {
  const handleRemoveUser = (user: User) => {
    onRemoveUser(user);
  };

  return (
    <ul className="mt-4 grid grid-cols-3 lg:grid-cols-5 gap-2">
      <AnimatePresence>
        {users.map((user) => (
          <motion.li
            layout
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="relative p-5 rounded-md border border-gray-300 shadow-md overflow-hidden"
          >
            <FontAwesomeIcon
              className="absolute top-3 right-5 cursor-pointer"
              icon={faXmark}
              onClick={() => handleRemoveUser(user)}
            />
            <div className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs overflow-hidden text-ellipsis">
              {user.email}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
