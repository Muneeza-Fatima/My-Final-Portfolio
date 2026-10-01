"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Magnetic } from "@/components/interactive/Magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSectionNav } from "@/hooks/use-section-nav";

import { CodeWindow } from "./code-window";
import { HeroStats } from "./hero-stats";

const ease = [0.22, 1, 0.36, 1] as const;

const roles = [
  "custom websites",
  "seamless user experiences",
  "digital products",
  "interfaces that convert",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [reduceMotion]);

  // The phrase is set in static chrome text with a soft lavender glow.
  return (
    // No overflow clipping here, so the glow is never cut into a box;
    // phrases cross-fade instead of sliding.
    <span className="relative inline-block align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease }}
          className="text-purple-glow inline-block whitespace-nowrap font-bold [filter:drop-shadow(0_0_12px_rgba(167,139,250,0.55))]"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Fades a block up into place on first paint, staggered by `delay`.
function Enter({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Heading line that appears as an outline, then fills left-to-right.
function SweepLine({
  text,
  fillClass,
  delay,
  suffix,
}: {
  text: string;
  fillClass: string;
  delay: number;
  suffix?: React.ReactNode;
}) {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <span aria-hidden className="relative block">
      <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)]">
        {text}
        {suffix && <span className="invisible">{suffix}</span>}
      </span>
      <motion.span
        className={`absolute inset-0 block ${fillClass}`}
        initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {text}
        {suffix}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const goTo = useSectionNav();

  return (
    <section id="home" className="relative bg-noir">
      <div className="relative overflow-hidden bg-noir">
        {/* Background video (kept from the original design) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source
            src="/videos/hero-background-480p-web.mp4"
            type="video/mp4"
            media="(max-width: 1023px)"
          />
          <source src="/videos/hero-background-720p-web.mp4" type="video/mp4" />
        </video>

        {/* Keep the copy side readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir/75 via-noir/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-noir/60 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col">
          {/* Content starts well below the fixed navbar, so nothing sits behind it */}
          <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-6 pb-10 pt-28 sm:gap-12 sm:px-10 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-14 lg:pb-6 lg:pt-28">
            {/* Portrait — after the copy on small screens, right column on desktop */}
            <Enter
              delay={0.15}
              className="order-2 flex justify-center lg:justify-end"
            >
              {/* Code-window backdrop: an editor window sits behind the portrait
                  and the head rises above its top edge for depth. */}
              <div className="relative flex h-[min(54svh,460px)] w-[min(88vw,400px)] items-end justify-center sm:h-[470px] sm:w-[400px] lg:h-[min(68svh,620px)] lg:w-[min(34vw,470px)]">
                <CodeWindow className="absolute bottom-0 left-1/2 h-[76%] w-[96%] -translate-x-1/2" />
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.55 }}
                  className="relative h-full"
                >
                  <Image
                    src="/images/muneeza-cutout.png"
                    alt="Muneeza Fatima — Frontend Developer"
                    width={1200}
                    height={1400}
                    priority
                    sizes="(max-width: 1024px) 78vw, 470px"
                    className="h-full w-auto max-w-none object-contain object-bottom [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.35))]"
                  />
                </motion.div>
              </div>
            </Enter>

            {/* Copy */}
            <div className="order-1 min-w-0">
              <Enter delay={0.05}>
                <p className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-2xl">
                  <span className="text-white/60">Hi, I am</span> Muneeza Fatima
                </p>
              </Enter>

              <Enter delay={0.2}>
                <h1 className="mt-4 font-display text-[clamp(2.8rem,min(7vw,11svh),6.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em]">
                  <span className="sr-only">
                    Muneeza Fatima — Frontend Developer
                  </span>
                  <SweepLine
                    text="Frontend"
                    fillClass="text-accent-soft"
                    delay={0.35}
                  />
                  <SweepLine
                    text="Developer"
                    fillClass="text-white"
                    delay={0.6}
                  />
                </h1>
              </Enter>

              <Enter delay={0.35}>
                <p className="mt-6 text-lg text-white sm:text-xl">
                  I build <RotatingRole />
                </p>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/80 sm:text-[15px]">
                  People decide whether to trust your brand in under a second. I
                  design and build websites that win that moment — fast,
                  polished, and made to turn visitors into clients.
                </p>
              </Enter>

              <Enter
                delay={0.5}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <Link
                    href="/#work"
                    onClick={(e) => goTo("work", e)}
                    className="btn-shine inline-flex items-center rounded-full bg-[#8b6bff] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_40px_-8px_rgba(139,107,255,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9d82ff] hover:shadow-[0_16px_50px_-8px_rgba(139,107,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
                  >
                    View my work
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/#contact"
                    onClick={(e) => goTo("contact", e)}
                    className="btn-shine inline-flex items-center rounded-full bg-[#a78bfa]/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-[#a78bfa]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
                  >
                    Let&apos;s talk
                  </Link>
                </Magnetic>
              </Enter>

              <Enter delay={0.65}>
                <HeroStats />
              </Enter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
