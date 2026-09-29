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
    image: null as string | null, // /images/what-i-bring-frontend.jpg
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
    image: null as string | null, // /images/what-i-bring-ui.jpg
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
    image: null as string | null, // /images/what-i-bring-motion.jpg
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Expanding panels: on desktop the active panel widens and reveals its detail.
export function Expertise() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative mt-8">
      <div className="relative flex flex-col gap-3 lg:h-[480px] lg:flex-row">
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
              layout
              transition={{ layout: { duration: 0.7, ease } }}
              className={cn(
                "relative isolate flex cursor-pointer flex-col overflow-hidden rounded-[22px] border p-7 outline-none backdrop-blur-md transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-[#a78bfa] sm:p-9 lg:p-6 xl:p-9",
                isActive
                  ? "border-[#a78bfa]/40 bg-[#a78bfa]/[0.12] lg:flex-[2.4]"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07] lg:flex-1",
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
                      isActive
                        ? "scale-100 opacity-60"
                        : "scale-105 opacity-30",
                    )}
                  />
                  {/* Dark gradient keeps the text readable over the image */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-noir via-noir/70 to-noir/20"
                  />
                </>
              )}

              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-[#b69cff]">
                  {item.number}
                </span>
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500",
                    isActive
                      ? "rotate-0 border-[#a78bfa] bg-[#a78bfa] text-white"
                      : "-rotate-12 border-white/15 text-white/60",
                  )}
                >
                  <Icon size={18} />
                </span>
              </div>

              <div className="mt-auto pt-16">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {item.label}
                </p>
                <h3
                  className={cn(
                    "mt-3 font-display text-3xl font-bold leading-tight text-white transition-[font-size] duration-500",
                    isActive
                      ? "sm:text-4xl"
                      : "hyphens-auto sm:text-4xl lg:text-xl xl:text-2xl",
                  )}
                >
                  {item.title}
                </h3>

                {/* Desktop: detail only when active. Mobile: always visible. */}
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
                      className="hidden lg:block"
                    >
                      <Detail item={item} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="lg:hidden">
                  <Detail item={item} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ item }: { item: (typeof expertise)[number] }) {
  return (
    <div className="max-w-md">
      <p className="mt-4 font-display text-lg font-semibold text-[#d8ccff]">
        {item.headline}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {item.points.map((point) => (
          <li
            key={point}
            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80"
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
