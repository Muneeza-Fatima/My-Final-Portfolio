"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useId } from "react";

import { cn } from "@/lib/utils";

type VerifiedSealProps = {
  label?: string;
  size?: number;
  className?: string;
};

// Rose-gold wax seal that "stamps" into place when it scrolls into view.
export function VerifiedSeal({
  label = "VERIFIED · PROOF ON FILE · ",
  size = 96,
  className,
}: VerifiedSealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const text = label.repeat(2);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const waxId = `seal-wax-${uid}`;
  const ringId = `seal-ring-${uid}`;

  return (
    <motion.div
      aria-label="Verified"
      role="img"
      initial={reduceMotion ? false : { scale: 1.9, opacity: 0, rotate: -24 }}
      whileInView={{ scale: 1, opacity: 1, rotate: -8 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 420, damping: 18, mass: 0.9 }}
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* Ink spread on impact */}
      {!reduceMotion && (
        <motion.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.55 }}
          whileInView={{ scale: 1.6, opacity: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-accent/35"
        />
      )}

      <svg viewBox="0 0 120 120" className="relative h-full w-full">
        <defs>
          <radialGradient id={waxId} cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#F3F0FF" />
            <stop offset="55%" stopColor="#6E6E80" />
            <stop offset="100%" stopColor="#26262F" />
          </radialGradient>
          <path
            id={ringId}
            d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0"
          />
        </defs>

        {/* Irregular wax edge */}
        <path
          fill={`url(#${waxId})`}
          d="M60 4c6 0 9 5 15 6s11-2 15 2 2 10 6 14 10 4 12 9-3 9-2 15 6 9 5 15-7 7-9 12 0 11-5 14-10 0-15 3-6 9-12 10-9-5-15-5-10 5-15 2-2-11-6-14-11-3-13-8 3-10 1-15-8-8-7-14 7-8 8-13-2-11 3-14 11 1 15-3 3-10 8-13 9 3 14 1 6-5 12-5z"
        />
        <circle cx="60" cy="60" r="47" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" />

        <text
          fill="#FFFFFF"
          fillOpacity="0.9"
          fontSize="7.4"
          fontWeight="700"
          letterSpacing="1.6"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          <textPath href={`#${ringId}`} startOffset="0">
            {text}
          </textPath>
        </text>

        {/* Check mark */}
        <path
          d="M46 61.5l9 9 19-20"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.95"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
