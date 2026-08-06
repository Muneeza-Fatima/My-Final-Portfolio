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
        duration: 1.1,

        lerp: 0.08,

        smoothWheel: true,

        syncTouch: false,

        wheelMultiplier: 1,

        touchMultiplier: 1,

        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}