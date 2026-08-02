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
        duration: 1,
        lerp: 0.1,

        smoothWheel: true,

        // Mobile optimization
        syncTouch: false,

        touchMultiplier: 1,

        wheelMultiplier: 1,

        autoRaf: true,
      }}

    >
      {children}
    </ReactLenis>
  );
}