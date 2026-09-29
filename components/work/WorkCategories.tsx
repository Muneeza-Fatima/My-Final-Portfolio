"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { RevealText } from "@/components/interactive/RevealText";
import { workCategories, type WorkCategory } from "@/data/work";

import { VerifiedSeal } from "./proof/VerifiedSeal";

// Each card sits a little lower than the previous one so the stack is visible.
const STACK_OFFSET = 28;

function ChapterCard({
  category,
  index,
  total,
  progress,
}: {
  category: WorkCategory;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = usePrefersReducedMotion();
  // Once the next card starts covering this one, shrink and dim it slightly.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.045]);
  const dim = useTransform(progress, [start, 1], [0, (total - index - 1) * 0.12]);
  const isVerified = category.id !== "demo-projects";

  return (
    <div
      className="sticky h-[82svh] min-h-[560px]"
      style={{ top: `calc(96px + ${index * STACK_OFFSET}px)` }}
    >
      <motion.article
        style={reduceMotion ? undefined : { scale, transformOrigin: "top center" }}
        className="relative grid h-full grid-rows-[42%_1fr] overflow-hidden rounded-[32px] border border-line bg-surface shadow-[0_-20px_60px_-30px_rgba(38,38,47,0.35)] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1"
      >
        {/* Image */}
        <Link
          href={category.href}
          data-cursor="Open"
          className="group relative block overflow-hidden"
          aria-label={`Open ${category.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt=""
            className="h-full w-full scale-[1.08] object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-5 font-display text-[96px] leading-none text-white/90 sm:text-[140px] lg:bottom-6 lg:left-8">
            {category.number}
          </span>
        </Link>

        {/* Content */}
        <div className="relative flex min-h-0 flex-col p-6 sm:p-10 lg:p-14">
          <div className="flex items-start justify-between gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-tint-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {category.proof}
            </span>
            {isVerified && <VerifiedSeal size={84} className="-mr-2 -mt-3 hidden sm:block" />}
          </div>

          <div className="mt-auto">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted">
              Chapter {category.number} · {category.label}
            </p>
            <h3 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
              {category.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
              {category.description}
            </p>

            <Link
              href={category.href}
              className="group/cta mt-6 inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm text-canvas transition-colors hover:bg-accent-deep sm:mt-8"
            >
              Open chapter
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover/cta:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>
        </div>

        {/* Dimming layer as later cards stack on top */}
        {!reduceMotion && (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-tint"
          />
        )}
      </motion.article>
    </div>
  );
}

export default function WorkCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative bg-canvas pb-24 pt-28 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-line pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> Selected work
          </span>
          <span>02 — Chapters</span>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <RevealText
            as="h2"
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink"
            text={[{ text: "Work that shaped\n" }, { text: "the journey.", className: "text-accent" }]}
          />
          <p className="text-sm leading-7 text-muted sm:text-[15px]">
            Three chapters — a real team, independent craft, and a client who put
            their trust in writing. Each one is documented.
          </p>
        </div>

        <div ref={ref} className="relative flex flex-col gap-[12vh]">
          {workCategories.map((category, index) => (
            <ChapterCard
              key={category.id}
              category={category}
              index={index}
              total={workCategories.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
