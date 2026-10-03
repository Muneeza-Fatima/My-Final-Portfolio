"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WorkCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-tint-soft py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[150px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-accent-deep"
        >
          Next chapter
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl"
        >
          Have something
          <br />
          <span className="heading-accent text-[#6d5bd0]">worth building?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-8"
        >
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 border-shine-dark rounded-full py-2 pl-7 pr-2 text-sm font-medium text-canvas shadow-[0_14px_30px_-14px_rgba(109,91,208,0.6)] transition hover:[--shine-fill:var(--color-accent-deep)]"
          >
            Start a conversation
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
