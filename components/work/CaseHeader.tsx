"use client";

import { motion } from "framer-motion";

import { RevealText } from "@/components/interactive/RevealText";

const ease = [0.22, 1, 0.36, 1] as const;

type CaseHeaderProps = {
  chapter: string;
  // Plain part, then the accent part.
  title: [string, string];
  intro: string;
  aside?: React.ReactNode;
  meta: { label: string; value: string }[];
};

// Shared "case file" header for the work detail pages.
export function CaseHeader({ chapter, title, intro, aside, meta }: CaseHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#6d5bd0]/[0.08] blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-12">

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-muted"
            >
              <span className="h-px w-8 bg-[#6d5bd0]" /> {chapter}
            </motion.p>
            <RevealText
              as="h1"
              immediate
              delay={0.2}
              className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
              text={[{ text: `${title[0]}\n` }, { text: title[1], className: "text-[#6d5bd0]" }]}
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
              className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-[15px]"
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
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {meta.map((item) => (
            <div
              key={item.label}
              className="group relative flex flex-col overflow-hidden border-shine rounded-[18px] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(17,18,22,0.35)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#6d5bd0] transition-transform duration-500 group-hover:scale-x-100"
              />
              <dt className="order-2 mt-2 text-[10px] uppercase tracking-[0.28em] text-muted">
                {item.label}
              </dt>
              <dd className="text-sm font-semibold text-ink">{item.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </header>
  );
}
