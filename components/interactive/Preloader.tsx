"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { lockScroll } from "@/lib/scroll-lock";

const SESSION_KEY = "mf-preloader-seen";

// First-visit-per-session intro: the name is drawn, a counter runs to 100,
// then a tint curtain lifts. Skipped for reduced motion and repeat views.
// This component is client-only (loaded with ssr:false), so window is available.
function shouldPlay() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const [active, setActive] = useState(shouldPlay);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // storage unavailable (private mode) — the intro simply plays again
    }
    if (!active) return;

    const start = performance.now();
    const duration = 1900;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so the count slows near 100
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setActive(false), 350);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  // Hold the page still while the intro plays.
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100003] flex flex-col items-center justify-center bg-noir"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* textLength keeps the whole name inside the viewBox on every screen width */}
          <svg
            viewBox="0 0 720 120"
            className="w-[86vw] max-w-[640px] overflow-visible text-white"
          >
            <motion.text
              x="30"
              y="84"
              textLength="660"
              lengthAdjust="spacingAndGlyphs"
              className="font-display"
              fontSize="84"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.8"
              initial={{
                strokeDasharray: 1400,
                strokeDashoffset: 1400,
                fillOpacity: 0,
              }}
              animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
              transition={{
                strokeDashoffset: { duration: 1.6, ease: "easeInOut" },
                fillOpacity: { delay: 1.1, duration: 0.6 },
              }}
            >
              Muneeza Fatima
            </motion.text>
          </svg>

          <div className="mt-6 flex w-[min(320px,70vw)] items-center gap-4">
            <div className="relative h-px flex-1 overflow-hidden bg-white/15">
              <div
                className="absolute inset-y-0 left-0 bg-[#b69cff]"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="w-10 text-right font-mono text-xs text-[#d8ccff]">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/50">
            Frontend Developer
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
