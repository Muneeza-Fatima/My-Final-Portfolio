"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Magnetic } from "@/components/interactive/Magnetic";
import { navigation } from "@/data/navigation";
import { contactEmail, socials } from "@/data/socials";
import { useSectionNav } from "@/hooks/use-section-nav";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

// Tracks which home-page section is in the middle of the viewport.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const goTo = useSectionNav();
  const lenis = useLenis();
  const reduceMotion = usePrefersReducedMotion();
  const active = useActiveSection(isHome);

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 240 && !open);
  });

  // Mobile menu: lock scroll, close on Esc, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open, lenis]);

  const handleNav = (id: string) => (event: React.MouseEvent) => {
    setOpen(false);
    goTo(id, event);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !reduceMotion ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[99999] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-noir/85 py-2 pl-5 pr-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <Link
            href="/#home"
            onClick={handleNav("home")}
            className="group flex items-baseline gap-2"
            aria-label="Muneeza Fatima — home"
          >
            <span className="font-display text-2xl leading-none text-white">
              Muneeza<span className="text-accent-soft">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <Link
                    href={`/#${item.id}`}
                    onClick={handleNav(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/65 hover:text-white",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <Link
                href="/#contact"
                onClick={handleNav("contact")}
                className="btn-shine inline-flex items-center rounded-full bg-[#a78bfa]/20 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-[#a78bfa]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
              >
                Let&apos;s talk
              </Link>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-canvas transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-canvas transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-[99998] flex flex-col justify-between bg-tint px-6 pb-10 pt-32 md:hidden"
            data-lenis-prevent
          >
            <ul className="space-y-2">
              {navigation.map((item, index) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`/#${item.id}`}
                    onClick={handleNav(item.id)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.25 + index * 0.06,
                    }}
                    className="flex items-baseline gap-4 font-display text-5xl text-ink"
                  >
                    <span className="font-mono text-xs text-accent-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-5 border-t border-accent/25 pt-6"
            >
              <a
                href={`mailto:${contactEmail}`}
                className="block text-lg text-ink underline decoration-accent underline-offset-4"
              >
                {contactEmail}
              </a>
              <div className="flex gap-3">
                {socials
                  .filter((s) => s.name !== "Email")
                  .map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-accent/30 px-4 py-2 text-sm text-ink"
                    >
                      {social.name}
                    </a>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
