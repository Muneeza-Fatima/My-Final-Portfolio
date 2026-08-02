"use client";

import { motion } from "framer-motion";

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
}

export function ScaleIn({
  children,
  className,
}: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}