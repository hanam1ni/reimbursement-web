"use client";

import { logout } from "@/adapters/client/auth";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <button className="btn btn-error" onClick={handleLogout}>
      Log Out
    </button>
  );
}
