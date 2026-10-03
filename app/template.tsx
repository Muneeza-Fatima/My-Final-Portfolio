"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// Re-mounts on every navigation: a dark curtain lifts away while the new page
// fades in. Only opacity and clip-path are animated (GPU-friendly, smooth on
// phones); no transform on the page wrapper, so sticky/fixed elements keep
// working.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100000] bg-noir will-change-[clip-path]"
        initial={{ clipPath: "inset(0 0 0% 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.65, ease }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
