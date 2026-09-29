"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WorkCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-tint-soft py-32 sm:py-44">
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
          className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-accent-deep"
        >
          Next chapter
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-6xl leading-[0.95] text-ink sm:text-8xl lg:text-9xl"
        >
          Have something
          <br />
          <span className="font-display font-normal text-accent">worth building?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-12"
        >
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-7 pr-2 text-sm font-medium text-canvas transition hover:bg-accent-deep"
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
