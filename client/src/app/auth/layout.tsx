"use client";

import AuthHero from "@/components/AuthHero";
import { motion, useAnimate } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async () => {
      await animate(
        scope.current,
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.3, ease: "easeIn" }
      );
    };

    enterAnimation();
  }, [animate, scope, segment]);

  return (
    <div className="h-screen flex justify-center items-center">
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        ref={scope}
        className="p-16 pl-0 flex bg-white rounded-lg shadow-md"
      >
        <div className="mr-8 border-r-2">
          <AuthHero />
        </div>
        <div className="basis-[300px]">{children}</div>
      </motion.main>
    </div>
  );
}
