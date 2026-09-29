"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { RevealText } from "@/components/interactive/RevealText";

const ease = [0.22, 1, 0.36, 1] as const;

type CaseHeaderProps = {
  chapter: string;
  crumb: string;
  // Plain part, then the accent part.
  title: [string, string];
  intro: string;
  aside?: React.ReactNode;
  meta: { label: string; value: string }[];
};

// Shared "case file" header for the work detail pages.
export function CaseHeader({ chapter, crumb, title, intro, aside, meta }: CaseHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-accent/[0.14] blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-14 text-xs text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent-deep">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#work" className="transition-colors hover:text-accent-deep">Work</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{crumb}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-accent-deep"
            >
              <span className="h-px w-8 bg-accent" /> {chapter}
            </motion.p>
            <RevealText
              as="h1"
              immediate
              delay={0.2}
              className="max-w-5xl font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.92] text-ink"
              text={[{ text: `${title[0]}\n` }, { text: title[1], className: "text-accent" }]}
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="mt-8 max-w-2xl text-sm leading-7 text-muted sm:text-base"
            >
              {intro}
            </motion.p>
          </div>

          {aside}
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-accent/15 bg-accent/15 md:grid-cols-4"
        >
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col bg-tint-soft p-5 sm:p-6">
              <dt className="order-2 mt-2 text-[10px] uppercase tracking-[0.28em] text-muted">
                {item.label}
              </dt>
              <dd className="text-sm text-ink sm:text-base">{item.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </header>
  );
}
