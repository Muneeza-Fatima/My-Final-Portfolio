"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

// Background image per panel. Save the images in public/images/ and set each
// panel's `image` below, e.g. "/images/what-i-bring-frontend.jpg".

const expertise = [
  {
    number: "01",
    label: "Frontend",
    title: "Frontend Development",
    headline: "Interfaces built to feel effortless.",
    description:
      "I build modern, responsive interfaces with React and Next.js, focusing on clean structure, consistency, and a polished experience across every screen.",
    points: [
      "React & Next.js",
      "Responsive architecture",
      "Reusable components",
    ],
    icon: Code2,
    image: "/images/what-i-bring-frontend.jpg" as string | null,
  },
  {
    number: "02",
    label: "UI Systems",
    title: "UI Implementation",
    headline: "Design translated with precision.",
    description:
      "I turn visual direction into refined digital interfaces where typography, spacing, hierarchy, and visual details work together naturally.",
    points: [
      "Pixel-conscious execution",
      "Visual hierarchy",
      "Responsive UI systems",
    ],
    icon: LayoutTemplate,
    image: "/images/what-i-bring-ui.jpg" as string | null,
  },
  {
    number: "03",
    label: "Interaction",
    title: "Motion & Interaction",
    headline: "Interaction with purpose.",
    description:
      "I use subtle motion and thoughtful interaction to make digital experiences feel alive, intuitive, and premium without overwhelming the user.",
    points: ["Micro-interactions", "Scroll animation", "Smooth transitions"],
    icon: Sparkles,
    image: "/images/what-i-bring-motion.jpg" as string | null,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Expanding panels on every screen size: the active panel widens and shows
// its detail; the others collapse to slim strips (vertical title on small
// screens). Hover, focus or tap opens a panel.
function DesktopPanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[500px] gap-3">
      {expertise.map((item, index) => {
        const isActive = active === index;
        const Icon = item.icon;
        return (
          <motion.article
            key={item.title}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={item.title}
            layout
            transition={{ layout: { duration: 0.7, ease } }}
            className={cn(
              "relative isolate flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[22px] border outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-[#a78bfa]",
              isActive
                ? "flex-1 border-[#a78bfa]/40 p-5 sm:p-8 lg:flex-[2.4] xl:p-9"
                : "w-11 flex-none border-white/10 px-1 py-3 hover:border-white/20 sm:w-16 sm:p-4 lg:w-auto lg:flex-1 lg:p-6",
            )}
          >
            {item.image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700",
                    isActive ? "scale-100 opacity-100" : "scale-105 opacity-70",
                  )}
                />
                {/* Strong dark gradient so the text always reads clearly */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 transition-colors duration-500",
                    isActive
                      ? "bg-gradient-to-t from-noir from-[15%] via-noir/80 via-[50%] to-noir/10"
                      : "bg-noir/55",
                  )}
                />
              </>
            )}

            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  "font-mono text-xs font-semibold text-[#d8ccff]",
                  !isActive && "mx-auto lg:mx-0",
                )}
              >
                {item.number}
              </span>
              <span
                className={cn(
                  "items-center justify-center rounded-full border transition-all duration-500",
                  isActive
                    ? "flex h-12 w-12 border-[#a78bfa] bg-[#a78bfa] text-white"
                    : "hidden h-12 w-12 border-white/25 bg-noir/40 text-white lg:flex",
                )}
              >
                <Icon size={18} />
              </span>
            </div>

            {/* Collapsed on small screens: vertical title */}
            {!isActive && (
              <p className="mt-auto self-center font-display text-base font-bold text-white [writing-mode:vertical-rl] rotate-180 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] lg:hidden">
                {item.title}
              </p>
            )}

            <div
              className={cn("mt-auto pt-10", !isActive && "hidden lg:block")}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                {item.label}
              </p>
              <h3
                className={cn(
                  "mt-3 font-display font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]",
                  isActive
                    ? "break-words text-2xl sm:text-4xl"
                    : "hyphens-auto text-xl xl:text-2xl",
                )}
              >
                {item.title}
              </h3>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.25, duration: 0.5, ease },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <Detail item={item} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

function Detail({ item }: { item: (typeof expertise)[number] }) {
  return (
    <div className="max-w-md">
      <p className="mt-4 font-display text-lg font-semibold text-[#e7dcff]">
        {item.headline}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/90 sm:text-[15px]">
        {item.description}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {item.points.map((point) => (
          <li
            key={point}
            className="rounded-full border border-white/20 bg-noir/50 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop: expanding panels. Phones & tablets: a swipeable card stack.
export function Expertise() {
  return (
    <div className="mt-8">
      <div className="hidden lg:block">
        <DesktopPanels />
      </div>
      <div className="lg:hidden">
        <CardStack />
      </div>
    </div>
  );
}

const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 500;

function CardStack() {
  const reduceMotion = usePrefersReducedMotion();
  const count = expertise.length;
  // `front` is the index of the card on top; the rest follow in order.
  const [front, setFront] = useState(0);

  const go = (step: 1 | -1) => {
    setFront((i) => (i + step + count) % count);
  };
  const goTo = (index: number) => {
    if (index === front) return;
    setFront(index);
  };

  return (
    <div>
      <div className="relative h-[580px] sm:h-[620px]">
        {expertise.map((item, index) => {
          const depth = (index - front + count) % count;
          const isFront = depth === 0;
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${item.title}`}
              aria-hidden={!isFront}
              onClick={() => !isFront && goTo(index)}
              drag={isFront && !reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (
                  info.offset.x < -SWIPE_DISTANCE ||
                  info.velocity.x < -SWIPE_VELOCITY
                )
                  go(1);
                else if (
                  info.offset.x > SWIPE_DISTANCE ||
                  info.velocity.x > SWIPE_VELOCITY
                )
                  go(-1);
              }}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: isFront ? 1 : 0, y: 0, scale: 1, rotate: 0 }
                  : {
                      y: depth * 14,
                      scale: 1 - depth * 0.05,
                      rotate: depth === 0 ? 0 : (depth % 2 ? 3 : -3) * depth,
                      opacity: 1 - depth * 0.25,
                      x: 0,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{ zIndex: count - depth }}
              className={cn(
                "absolute inset-x-0 top-0 flex h-[540px] flex-col overflow-hidden rounded-[24px] border bg-[#16161c] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:h-[580px]",
                isFront
                  ? "cursor-grab border-[#a78bfa]/40 active:cursor-grabbing"
                  : "cursor-pointer border-white/10",
              )}
            >
              {/* Image block — fully bright, never covered by text */}
              <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-noir/70 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
                  {item.number} / 0{count}
                </span>
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#a78bfa] text-white shadow-lg">
                  <Icon size={17} />
                </span>
              </div>

              {/* Text block — solid background so it always reads clearly */}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b69cff]">
                  {item.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-display text-base font-semibold text-[#e7dcff]">
                  {item.headline}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  {item.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous card"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {expertise.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${item.title}`}
                aria-current={index === front ? "true" : undefined}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === front ? "w-6 bg-[#b69cff]" : "w-2 bg-white/25",
                )}
              />
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            Swipe
          </p>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next card"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {expertise[front].title}
      </p>
    </div>
  );
}
