"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
};

// Soft rose glow that follows the cursor across a card.
// Uses CSS variables instead of state so moving the mouse never re-renders.
export function Spotlight({
  children,
  className,
  color = "rgba(59,59,72, 0.14)",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn("group/spot relative isolate", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 45%)`,
        }}
      />
      {children}
    </div>
  );
}
