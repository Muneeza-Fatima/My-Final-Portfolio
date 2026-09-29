"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import CountUp from "react-countup";
import { SiReact } from "react-icons/si";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Stat = {
  label: [string, string];
  fill: number; // how much of the ring fills (0–1)
  count?: number;
  suffix?: string;
  icon?: boolean;
};

const stats: Stat[] = [
  { count: 10, suffix: "+", label: ["Projects", "shipped"], fill: 0.85 },
  { count: 2, suffix: "+", label: ["Years", "learning"], fill: 0.6 },
  { icon: true, label: ["React &", "Next.js"], fill: 1 },
];

// Stats as progress rings: each ring draws in with a purple gradient on load;
// hover / focus / tap makes it glow and grow, and the React logo spins.
export function HeroStats() {
  const reduceMotion = usePrefersReducedMotion();
  const gradientId = `stat-ring-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <ul className="mt-8 flex flex-nowrap items-start justify-between gap-2 sm:justify-start sm:gap-10">
      {stats.map((stat, index) => (
        <li key={stat.label.join(" ")} className="min-w-0">
          <div
            tabIndex={0}
            className="group flex flex-col items-center gap-2 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] sm:flex-row sm:gap-3"
          >
            <div className="relative h-14 w-14 shrink-0 transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-110 group-focus-visible:scale-110 group-active:scale-110 sm:h-16 sm:w-16">
              {/* Glow */}
              <span
                aria-hidden
                className="absolute inset-1 rounded-full bg-[#a78bfa]/0 blur-md transition-colors duration-500 group-hover:bg-[#a78bfa]/45 group-focus-visible:bg-[#a78bfa]/45 group-active:bg-[#a78bfa]/45"
              />
              <svg
                viewBox="0 0 64 64"
                className="relative h-full w-full -rotate-90"
                aria-hidden
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e7dcff" />
                    <stop offset="100%" stopColor="#8b6bff" />
                  </linearGradient>
                </defs>
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="rgba(21,18,42,0.6)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: stat.fill }}
                  transition={{
                    duration: 1.6,
                    ease,
                    delay: 0.8 + index * 0.15,
                  }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-base font-bold text-white sm:text-lg">
                {stat.icon ? (
                  <SiReact
                    aria-hidden
                    className="text-[#d8ccff] transition-transform duration-[1.2s] group-hover:rotate-180 group-active:rotate-180"
                    size={24}
                  />
                ) : (
                  <>
                    {reduceMotion ? (
                      stat.count
                    ) : (
                      <CountUp
                        end={stat.count ?? 0}
                        duration={1.8}
                        delay={0.9}
                      />
                    )}
                    {stat.suffix}
                  </>
                )}
              </span>
            </div>

            <p className="text-center text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.12em] text-white/60 transition-colors duration-300 group-hover:text-white sm:text-left sm:text-[11px] sm:tracking-[0.16em]">
              {stat.label[0]}
              <br />
              {stat.label[1]}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
