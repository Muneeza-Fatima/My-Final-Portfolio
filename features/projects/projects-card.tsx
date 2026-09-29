"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import type { Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

// Large case-style card used on /work/demo-projects. Alternates image side.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease }}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View"
        aria-label={`Open ${project.title} live demo`}
        className={`group relative block overflow-hidden rounded-[28px] border border-line bg-tint p-3 sm:p-4 ${
          flipped ? "lg:order-2" : ""
        }`}
      >
        <div className="mb-3 flex items-center gap-1.5 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/20" />
          <span className="ml-3 truncate font-mono text-[10px] text-muted">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="overflow-hidden rounded-[18px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
          />
        </div>
      </a>

      <div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent-deep">{project.number}</span>
          <span className="h-px w-10 bg-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">{project.category}</span>
        </div>

        <h2 className="mt-5 font-display text-5xl leading-[0.95] text-ink sm:text-6xl">{project.title}</h2>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base">{project.description}</p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            { label: "Role", value: project.role },
            { label: "Built with", value: project.tech.join(" · ") },
            { label: "Focus", value: project.focus },
          ].map((item) => (
            <div key={item.label} className="flex flex-col bg-surface p-4">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted">{item.label}</dt>
              <dd className="mt-2 text-xs leading-5 text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm text-canvas transition-colors hover:bg-accent-deep"
          >
            Live demo
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover/cta:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink"
          >
            <FaGithub size={15} /> Source
          </a>
        </div>
      </div>
    </motion.article>
  );
}
