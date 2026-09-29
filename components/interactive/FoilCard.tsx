"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type FoilCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

// 3D tilt card with a rose-gold holographic sheen that follows the cursor.
export function FoilCard({ children, className, maxTilt = 8 }: FoilCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const shine = useMotionValue(0);

  const sheen = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.55), transparent 42%), linear-gradient(${px}deg, rgba(59,59,72,0.0) 20%, rgba(216,212,240,0.35) 45%, rgba(236,235,243,0.25) 55%, rgba(59,59,72,0.0) 80%)`;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const fx = (event.clientX - rect.left) / rect.width;
    const fy = (event.clientY - rect.top) / rect.height;
    ry.set((fx - 0.5) * maxTilt * 2);
    rx.set(-(fy - 0.5) * maxTilt * 2);
    px.set(fx * 100);
    py.set(fy * 100);
    shine.set(1);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    shine.set(0);
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: sheen, opacity: shine }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
