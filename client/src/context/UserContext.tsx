"use client";

import { User } from "@/adapters/types";
import { createContext } from "react";

interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType>({
  user: {} as User,
});

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
