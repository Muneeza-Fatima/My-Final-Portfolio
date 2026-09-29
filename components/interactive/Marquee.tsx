"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  // Base speed in % of one copy per second.
  speed?: number;
  direction?: 1 | -1;
  starClassName?: string;
};

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Endless text band that drifts slowly and speeds up with scroll velocity.
export function Marquee({
  items,
  className,
  speed = 2.2,
  direction = -1,
  starClassName = "text-accent",
}: MarqueeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [5, 0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(direction);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const v = velocity.get();
    if (v < 0) dir.current = -direction as 1 | -1;
    else if (v > 0) dir.current = direction;
    const step = dir.current * speed * (delta / 1000) * (1 + Math.abs(boost.get()));
    base.set(base.get() + step);
  });

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 sm:px-10">{item}</span>
          <span aria-hidden className={starClassName}>✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex w-max" style={{ x }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
