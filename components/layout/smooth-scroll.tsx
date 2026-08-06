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

        duration: 1.2,

        lerp: 0.08,


        smoothWheel: true,


        // Mobile stability
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