"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  // Seconds for one full loop.
  duration?: number;
  direction?: 1 | -1;
  starClassName?: string;
};

// Endless text band. Pure CSS animation (runs on the compositor, so it costs
// the main thread nothing while the page scrolls) and paused off screen.
// Reduced motion stops it via the global prefers-reduced-motion rule.
export function Marquee({
  items,
  className,
  duration = 40,
  direction = -1,
  starClassName = "text-accent",
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px 0px" });

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
    <div ref={ref} className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: direction === 1 ? "reverse" : "normal",
            animationPlayState: inView ? "running" : "paused",
          } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
