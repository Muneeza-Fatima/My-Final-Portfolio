"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Re-mounts on every navigation: a tint curtain wipes away to reveal the page.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <>
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100000] bg-tint"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}
