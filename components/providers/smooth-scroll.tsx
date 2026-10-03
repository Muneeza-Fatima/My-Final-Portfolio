"use client";

import type { ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { recordPath } from "@/lib/nav-history";
import { ensureScrollUnlocked, registerLenis } from "@/lib/scroll-lock";

interface SmoothScrollProps {
  children: ReactNode;
}

function ScrollManager() {
  const lenis = useLenis();
  const pathname = usePathname();
  const lenisRef = useRef(lenis);
  const firstPath = useRef(true);

  // Keep the shared scroll lock pointed at the live Lenis instance.
  useEffect(() => {
    lenisRef.current = lenis;
    registerLenis(lenis ?? null);
    return () => registerLenis(null);
  }, [lenis]);

  // Browser back/forward restores the old scroll position itself.
  const fromHistory = useRef(false);
  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // On a real route change (not on first load, and not when Lenis is merely
  // re-created): make sure scrolling is never left locked, then
  // - back/forward: keep the browser's restored position and sync Lenis to it
  //   (otherwise the next wheel scroll would jump from a stale position);
  // - a link to a section (#hash): same — the browser scrolls, Lenis syncs;
  // - any other link: start the new page at the top.
  useEffect(() => {
    recordPath(pathname);
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    ensureScrollUnlocked();
    const lenis = lenisRef.current;
    if (fromHistory.current || window.location.hash) {
      fromHistory.current = false;
      // The browser positions the page itself here; once it has (and the new
      // layout is in), sync Lenis to that real position.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          lenis?.resize();
          lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
        });
      });
      return () => cancelAnimationFrame(frame);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = usePrefersReducedMotion();

  // Stable options: ReactLenis re-creates Lenis whenever these change.
  const options = useMemo(
    () => ({
      // Eased mouse-wheel / trackpad scrolling. Touch keeps the device's own
      // native momentum (smoothest and most reliable on phones and tablets).
      lerp: 0.1,
      smoothWheel: !reduceMotion,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoRaf: true,
    }),
    [reduceMotion],
  );

  return (
    <ReactLenis root options={options}>
      <ScrollManager />
      {children}
    </ReactLenis>
  );
}
