"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealText } from "@/components/interactive/RevealText";
import { workCategories, type WorkCategory } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function ChapterCard({
  category,
  index,
}: {
  category: WorkCategory;
  index: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
      className="w-[88%] shrink-0 snap-start sm:w-[60%] lg:w-auto"
    >
      <Link
        href={category.href}
        className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-28px_rgba(38,38,47,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
      >
        {/* Image */}
        <div className="relative aspect-[5/4] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-noir/75 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
            {category.number}
          </span>
        </div>

        {/* Body — minimal: label, title, two-line summary, link */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-deep">
            {category.label}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {category.title}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-muted sm:text-base">
            {category.description}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-ink/80 transition-colors group-hover:text-accent-deep">
            See the work
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkCategories() {
  return (
    <section id="work" className="relative bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="mb-10 flex items-center justify-between border-b border-line pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> Selected work
          </span>
          <span>02 — Chapters</span>
        </div>

        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <RevealText
            as="h2"
            className="font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink"
            text={[
              { text: "Work you can " },
              { text: "trust.", className: "heading-accent text-[#6d5bd0]" },
            ]}
          />
          <p className="max-w-md text-sm leading-7 text-muted sm:text-[15px]">
            Every chapter answers the first question clients ask: can she
            deliver? From independent builds, to a company I work with today, to
            where it started inside a real product team — each one is
            documented.
          </p>
        </div>

        {/* Phones & tablets: swipeable row. Desktop: three columns. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {workCategories.map((category, index) => (
            <ChapterCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
