"use client";

import type { ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { recordPath } from "@/lib/nav-history";

interface SmoothScrollProps {
  children: ReactNode;
}

// Every new page starts at the top (unless the URL points at a section),
// so Lenis never carries the previous page's scroll position over.
function ResetOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    recordPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        // Gentle easing on mouse wheel / trackpad; touch keeps the device's
        // own native momentum, which always feels smoothest on phones.
        lerp: 0.09,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: true,
      }}
    >
      <ResetOnRouteChange />
      {children}
    </ReactLenis>
  );
}
