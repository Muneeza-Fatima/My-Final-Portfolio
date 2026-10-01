"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { portfolioVersions } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import { darkCard, ProjectLinks, trackShine } from "./ProjectParts";

// Point positions (in %) on the track: the centre of each of the three
// columns, then "Now" at the end.
const POINTS = [100 / 6, 50, 500 / 6, 100];

// Minimal cards for each version of my portfolio, oldest first. On md+ a thin
// accent line above fills as you scroll and lights each point in turn.
export function PortfolioEvolution() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [reach, setReach] = useState(POINTS[0]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 90%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const width = useTransform(progress, (p) => `${(POINTS[3] - POINTS[0]) * p}%`);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setReach(POINTS[0] + (POINTS[3] - POINTS[0]) * p);
  });

  const isLit = (index: number) => reduceMotion || reach >= POINTS[index] - 0.5;

  return (
    <div ref={ref}>
      {/* Track */}
      <div aria-hidden className="relative mb-6 hidden h-6 md:block">
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-line"
          style={{ left: `${POINTS[0]}%`, right: 0 }}
        />
        <motion.div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-[#6d5bd0]"
          style={{ left: `${POINTS[0]}%`, width: reduceMotion ? `${POINTS[3] - POINTS[0]}%` : width }}
        />
        {POINTS.map((left, index) => (
          <span
            key={left}
            className={cn(
              "absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full border transition-all duration-500",
              index === 3 ? "-translate-x-full" : "-translate-x-1/2",
              isLit(index)
                ? "border-[#6d5bd0] bg-[#6d5bd0] shadow-[0_0_0_5px_rgba(109,91,208,0.12)]"
                : "border-line bg-canvas",
            )}
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <ol className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {portfolioVersions.map((item, index) => (
          <li
            key={item.version}
            onPointerMove={trackShine}
            className={cn(darkCard, index === 2 && "sm:col-span-2 md:col-span-1")}
          >
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden
              className="block overflow-hidden rounded-[16px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="aspect-[1376/768] w-full object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
              />
            </a>
            <div className="flex flex-1 flex-col px-2 pb-1.5 pt-4">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] leading-6 text-white/55">{item.summary}</p>
              </div>
              <ProjectLinks
                size="sm"
                className="mt-auto pt-4"
                title={item.title}
                liveUrl={item.liveUrl}
                githubUrl={item.githubUrl}
              />
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex justify-end">
        <Link
          href="/"
          className="border-shine group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-ink transition hover:-translate-y-0.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#6d5bd0]" />
          Now — the site you&apos;re on
          <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
