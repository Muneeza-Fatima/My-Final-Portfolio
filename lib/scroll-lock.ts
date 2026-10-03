import type Lenis from "lenis";

// One shared, counted page-scroll lock (preloader, mobile menu, dialogs).
// Scrolling only resumes when every lock is released, so overlapping
// open/close calls can never leave the page stuck.
let locks = 0;
let current: Lenis | null = null;

function apply() {
  const locked = locks > 0;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (current) {
    if (locked) current.stop();
    else current.start();
  }
}

// Called by the smooth-scroll provider whenever its Lenis instance changes.
export function registerLenis(lenis: Lenis | null) {
  current = lenis;
  if (lenis) apply();
}

// Returns a release function; calling it more than once is harmless.
export function lockScroll() {
  locks += 1;
  apply();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    apply();
  };
}

// Safety net (e.g. after a route change): with no active locks, make sure
// scrolling is running.
export function ensureScrollUnlocked() {
  if (locks === 0) apply();
}
