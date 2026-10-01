"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

import { projects, type Project } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import { BrowserShot, ProjectLinks, trackShine } from "./ProjectParts";

const total = projects.length;
const pad = (value: number) => String(value).padStart(2, "0");

// One wide project card: screenshot on the left, details on the right
// (stacked on smaller screens). Sized so the whole card fits one screen.
function CardBody({ project, index }: { project: Project; index: number }) {
  return (
    <div className="grid items-center gap-4 sm:gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="mx-auto block w-full max-w-[calc((100svh-230px)*1.6)]"
      >
        <BrowserShot src={project.image} title={project.title} url={project.liveUrl} />
      </a>

      <div className="flex flex-col px-2 pb-2 sm:px-3 lg:px-0 lg:pr-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
          <span className="font-mono tracking-normal text-[#b69cff]">
            {project.number}
            <span className="text-white/30"> / {pad(total)}</span>
          </span>
          <span>{project.category}</span>
          {project.badge && (
            <span className="hidden rounded-full bg-[#6d5bd0]/15 px-2.5 py-1 tracking-[0.14em] text-[#c9bcff] sm:inline">
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:mt-4">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60 sm:mt-3 sm:line-clamp-none sm:leading-7">
          {project.description}
        </p>

        <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 hidden h-px bg-white/[0.07] sm:block" />
        <ProjectLinks
          className="mt-4 sm:mt-6"
          title={project.title}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
        />
      </div>
      <span className="sr-only">
        Project {index + 1} of {total}
      </span>
    </div>
  );
}

const cardClass =
  "card-shine group relative w-full overflow-hidden rounded-[28px] p-3 text-white shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)] sm:p-4";

// Faint violet light in the top-right corner of every card.
function CornerGlow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6d5bd0]/20 blur-[90px]"
    />
  );
}

function StackCard({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  // Cards further down the stack shrink a little more and dim as the next
  // ones slide over them. The last card stays at full size.
  const behind = total - 1 - index;
  // Card i reaches the top at progress i / (total - 1); it starts receding
  // from there as the next card slides over it.
  const range = [index / (total - 1), 1];
  const scale = useTransform(progress, range, [1, 1 - behind * 0.04]);
  const dim = useTransform(progress, range, [0, behind > 0 ? 0.4 : 0]);
  // Only the two cards directly behind the current one show an edge; older
  // ones fade out as the third card arrives. (The last two never fade.)
  // (Function form: an offset range past 1 would break the accelerated
  // scroll animation.)
  const fadeStart = (index + 2) / (total - 1);
  const fadeEnd = (index + 3) / (total - 1);
  const fade = useTransform(progress, (p) =>
    p <= fadeStart ? 1 : p >= fadeEnd ? 0 : 1 - (p - fadeStart) / (fadeEnd - fadeStart),
  );

  return (
    <div className="sticky top-0 flex h-[100svh] items-center pb-[calc(var(--stack-step)*5)] pt-[72px] [--stack-step:8px] lg:[--stack-step:12px]">
      <motion.article
        style={{ scale, opacity: fade, top: `calc(var(--stack-step) * ${index})` }}
        onPointerMove={trackShine}
        className={cn(cardClass, "relative origin-top")}
      >
        <CornerGlow />
        <div className="relative">
          <CardBody project={project} index={index} />
        </div>
        <motion.span
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black"
        />
      </motion.article>
    </div>
  );
}

// "Sticky stack": every project is one wide card that fits a single screen;
// scrolling slides the next card up over the previous one, which shrinks and
// dims. A dot rail on the right shows where you are.
export function ProjectStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setInView(p > 0 && p < 1);
    setActive(Math.round(p * (total - 1)));
  });

  if (reduceMotion) {
    return (
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <article key={project.title} className={cardClass} onPointerMove={trackShine}>
            <CornerGlow />
            <div className="relative">
              <CardBody project={project} index={index} />
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {projects.map((project, index) => (
        <StackCard key={project.title} project={project} index={index} progress={scrollYProgress} />
      ))}

      {/* Progress rail */}
      <ol
        aria-hidden
        className={cn(
          "pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2.5 transition-opacity duration-300 xl:flex",
          inView ? "opacity-100" : "opacity-0",
        )}
      >
        {projects.map((project, index) => (
          <li
            key={project.title}
            className={cn(
              "rounded-full transition-all duration-300",
              index === active ? "h-6 w-1.5 bg-[#6d5bd0]" : "h-1.5 w-1.5 bg-ink/20",
            )}
          />
        ))}
      </ol>
    </div>
  );
}
