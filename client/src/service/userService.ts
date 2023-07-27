import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { getCurrentUser } from "@/adapters/server/user";

export const authenticate = cache(async () => {
  try {
    const { data: user } = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthenticated User");
    }

    return user;
  } catch (error) {
    redirect("/auth/login");
  }
});
