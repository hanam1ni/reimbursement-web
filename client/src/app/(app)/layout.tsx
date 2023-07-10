import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { authenticate } from "@/service/userService";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticate();

  return (
    <div>
      <Sidebar />
      <div className="pb-8 mr-12 ml-[240px] flex flex-col">
        <Header />
        <main className="w-full max-w-6xl flex-1 p-8 mx-auto bg-white border border-gray-300 rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
