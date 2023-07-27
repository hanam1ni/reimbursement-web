import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/context/UserContext";
import { authenticate } from "@/service/userService";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authenticate();

  return (
    <div>
      <Sidebar />
      <div className="pb-8 mr-12 ml-[240px] flex flex-col">
        <Header />
        <UserProvider user={user}>
          <main className="w-full max-w-6xl flex-1 mx-auto">{children}</main>
        </UserProvider>
      </div>
    </div>
  );
}
