import AuthHero from "@/components/AuthHero";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex justify-center items-center">
      <main className="p-16 pl-0 flex bg-white rounded-lg shadow-md">
        <div className="mr-8 border-r-2">
          <AuthHero />
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}
