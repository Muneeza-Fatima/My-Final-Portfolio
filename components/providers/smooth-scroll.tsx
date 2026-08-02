"use client";

import type { ReactNode } from "react";

import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({
  children,
}: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.8,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1,
        wheelMultiplier: 1.2,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}