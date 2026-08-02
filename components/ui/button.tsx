"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";


interface ButtonProps {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}


export function Button({
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition",
        variant === "primary" &&
          "bg-white text-black hover:bg-neutral-200",
        variant === "secondary" &&
          "border border-white/20 bg-transparent text-white hover:bg-white/10",
        className
      )}
    >
      {children}
    </motion.button>
  );
}