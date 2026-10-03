"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Magnetic } from "@/components/interactive/Magnetic";
import { navigation } from "@/data/navigation";
import { contactEmail, contactPhone, socials } from "@/data/socials";
import { useSectionNav } from "@/hooks/use-section-nav";
import { lockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

// Tracks which home-page section is in the middle of the viewport.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // The hero (#home) is observed too, so nothing is highlighted at the top.
    const sections = ["home", ...navigation.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(entry.target.id === "home" ? null : entry.target.id);
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
  const active = useActiveSection(isHome);

  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Mobile menu: lock scroll, close on Esc, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const handleNav = (id: string) => (event: React.MouseEvent) => {
    setOpen(false);
    goTo(id, event);
  };

  return (
    <>
      {/* Always visible: fixed to the top on every device */}
      <header className="fixed inset-x-0 top-0 z-[99999] border-b border-white/10 bg-noir">
        <nav
          aria-label="Main"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14 3xl:max-w-[1760px] 3xl:px-20"
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
                  "absolute h-[1.5px] w-5 rounded-full bg-white transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-5 rounded-full bg-white transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[99998] overflow-y-auto bg-noir/95 backdrop-blur-2xl md:hidden"
            data-lenis-prevent
          >
            {/* Soft purple light */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#a78bfa]/25 blur-[100px]"
            />

            <div className="relative flex min-h-full flex-col px-5 pb-8 pt-28">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Menu
              </p>

              <ul className="space-y-2">
                {navigation.map((item, index) => {
                  const isActive = active === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.08 + index * 0.06,
                      }}
                    >
                      <a
                        href={`/#${item.id}`}
                        onClick={handleNav(item.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl border px-5 py-4 transition-colors duration-300 active:scale-[0.98]",
                          isActive
                            ? "border-[#a78bfa]/45 bg-[#a78bfa]/15"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={cn(
                              "font-mono text-xs",
                              isActive ? "text-[#d8ccff]" : "text-white/35",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-2xl font-bold text-white">
                            {item.name}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            isActive ? "bg-[#b69cff]" : "bg-white/15",
                          )}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-auto space-y-5 pt-10"
              >
                <Link
                  href="/#contact"
                  onClick={handleNav("contact")}
                  className="btn-shine flex w-full items-center justify-center rounded-full bg-[#8b6bff] py-4 text-base font-bold text-white shadow-[0_12px_40px_-8px_rgba(139,107,255,0.7)]"
                >
                  Let&apos;s talk
                </Link>

                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex min-w-0 flex-col gap-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="truncate text-sm text-white/70"
                    >
                      {contactEmail}
                    </a>
                    <a
                      href={contactPhone.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/85"
                    >
                      <FaWhatsapp size={16} className="text-[#25D366]" />
                      {contactPhone.display}
                    </a>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {socials
                      .filter((s) => s.name !== "Email")
                      .map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform active:scale-95",
                            social.name === "LinkedIn"
                              ? "bg-[#0A66C2] shadow-[0_8px_20px_-8px_rgba(10,102,194,0.9)]"
                              : "border border-white/15 bg-white/[0.06]",
                          )}
                        >
                          {social.name === "GitHub" ? (
                            <FaGithub size={18} />
                          ) : (
                            <FaLinkedinIn size={19} />
                          )}
                        </a>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
