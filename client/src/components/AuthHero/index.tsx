"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function AuthHero() {
  const segment = useSelectedLayoutSegment();

  const authAction = { image: "", hint: "", label: "", link: "" };
  if (segment == "login") {
    authAction.image = "/login-hero.jpg";
    authAction.hint = "Don't have an account?";
    authAction.label = "Create Account";
    authAction.link = "signup";
  } else {
    authAction.image = "/signup-hero.jpg";
    authAction.hint = "Already Have Account?";
    authAction.label = "Sign In";
    authAction.link = "login";
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src={authAction.image}
        width={400}
        height={400}
        alt="Hero image"
      ></Image>
      <div className="text-gray-500">
        <span>{authAction.hint}&nbsp;</span>
        <Link className="underline text-primary" href={authAction.link}>
          {authAction.label}
        </Link>
      </div>
    </div>
  );
}
