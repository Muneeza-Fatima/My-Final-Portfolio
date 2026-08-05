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


        // Better mobile scrolling
        syncTouch: true,

        touchMultiplier: 1.2,


        wheelMultiplier: 0.9,


        autoRaf: true,

      }}

    >

      {children}

    </ReactLenis>

  );

}