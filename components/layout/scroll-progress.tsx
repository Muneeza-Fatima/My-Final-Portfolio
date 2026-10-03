"use client";

import { motion, useScroll } from "framer-motion";

// Thin reading line pinned to the top of the viewport. Driven straight from
// scroll progress (no spring), so it adds no extra per-frame work.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100001] h-[2px] origin-left will-change-transform"
      style={{ scaleX: scrollYProgress, background: "var(--foil)" }}
    />
  );
}
