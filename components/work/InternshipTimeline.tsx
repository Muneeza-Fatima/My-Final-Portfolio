"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import CountUp from "react-countup";
import { useRef } from "react";

import { internship } from "@/data/work";

const ease = [0.22, 1, 0.36, 1] as const;

// Vertical timeline whose rose line draws itself as you scroll.
export function InternshipTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative ml-2 border-l border-line pl-8 sm:pl-12">
      <motion.span
        aria-hidden
        className="absolute -left-px top-0 h-full w-[2px] origin-top bg-accent"
        style={{ scaleY: reduceMotion ? 1 : progress }}
      />

      {internship.milestones.map((milestone, index) => (
        <motion.li
          key={milestone.title}
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease }}
          className="relative pb-14 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute -left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-canvas sm:-left-[55px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>

          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            {milestone.phase}
          </p>
          <h3 className="mt-3 text-2xl tracking-[-0.02em] text-ink sm:text-3xl">
            <span className="mr-3 font-display text-muted/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            {milestone.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{milestone.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function InternshipOutcomes() {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
      {internship.outcomes.map((outcome) => (
        <div key={outcome.label} className="flex flex-col bg-surface p-8">
          <dt className="order-2 mt-3 text-[10px] uppercase tracking-[0.28em] text-muted">
            {outcome.label}
          </dt>
          <dd className="font-display text-6xl leading-none text-ink">
            <CountUp end={outcome.value} duration={2} enableScrollSpy scrollSpyOnce />
            <span className="text-accent-deep">{outcome.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
