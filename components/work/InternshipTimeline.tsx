"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState } from "react";

import { internship } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

// What was practised in each phase.
const practised: string[][] = [
  ["Git", "Code reviews", "Design-to-code"],
  ["HTML5", "CSS3", "Tailwind CSS", "React"],
  ["React", "Next.js", "JavaScript"],
  ["Performance", "Accessibility", "Delivery"],
];

// Light vertical timeline: a thin accent line draws as you scroll and each
// phase comes into focus once the line reaches it.
export function InternshipTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const count = internship.milestones.length;
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setReached(Math.min(count - 1, Math.max(0, Math.floor(p * count))));
  });

  return (
    <ol ref={ref} className="relative ml-1 space-y-3 border-l border-line pl-7 sm:pl-10">
      <motion.span
        aria-hidden
        className="absolute -left-px top-0 h-full w-px origin-top bg-[#6d5bd0]"
        style={{ scaleY: reduceMotion ? 1 : progress }}
      />

      {internship.milestones.map((milestone, index) => {
        const lit = reduceMotion || index <= reached;
        const current = !reduceMotion && index === reached;
        return (
          <li
            key={milestone.title}
            className={cn(
              "relative transition-opacity duration-500",
              lit ? "opacity-100" : "opacity-50",
            )}
          >
            {/* Point on the line */}
            <span
              aria-hidden
              className={cn(
                "absolute -left-[32px] top-[22px] h-[9px] w-[9px] rounded-full border transition-all duration-500 sm:-left-[45px]",
                current
                  ? "scale-125 border-[#6d5bd0] bg-[#6d5bd0] shadow-[0_0_0_5px_rgba(109,91,208,0.12)]"
                  : lit
                    ? "border-[#6d5bd0] bg-[#6d5bd0]"
                    : "border-line bg-canvas",
              )}
            />

            <div className="border-shine grid gap-1.5 rounded-2xl px-4 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-26px_rgba(109,91,208,0.5)] sm:grid-cols-[6.5rem_1fr] sm:gap-5 sm:px-5">
              <p className="pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {milestone.phase}
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl">
                  {milestone.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{milestone.text}</p>
                <p className="mt-1.5 text-xs text-ink/60">
                  {(practised[index] ?? []).join("  ·  ")}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function InternshipOutcomes() {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {internship.outcomes.map((outcome) => (
        <div
          key={outcome.label}
          className="group relative flex flex-col overflow-hidden border-shine rounded-[20px] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(17,18,22,0.35)] sm:p-7"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#6d5bd0] transition-transform duration-500 group-hover:scale-x-100"
          />
          <dt className="order-2 mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
            {outcome.label}
          </dt>
          <dd className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-ink">
            <CountUp end={outcome.value} duration={2} enableScrollSpy scrollSpyOnce />
            <span className="text-[#6d5bd0]">{outcome.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
