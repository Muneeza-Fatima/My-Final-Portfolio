"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin rose-gold reading line pinned to the top of the viewport.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100001] h-[2px] origin-left"
      style={{ scaleX, background: "var(--foil)" }}
    />
  );
}
