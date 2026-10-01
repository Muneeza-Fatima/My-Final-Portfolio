"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, LayoutTemplate, Sparkles } from "lucide-react";
import { useState } from "react";

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
export function Expertise() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-8 flex h-[660px] gap-2 sm:h-[540px] sm:gap-3 lg:h-[500px]">
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
