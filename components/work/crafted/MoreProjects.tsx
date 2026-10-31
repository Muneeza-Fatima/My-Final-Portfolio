"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

import { moreProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const ALL = "All";
const filters = [ALL, ...new Set(moreProjects.map((project) => project.type))];

// Minimal grid for the smaller builds, below the featured sticky stack:
// a screenshot, the title and category, then Live demo and Repo buttons.
export function MoreProjects() {
  const reduceMotion = usePrefersReducedMotion();
  const [filter, setFilter] = useState(ALL);
  const visible = filter === ALL ? moreProjects : moreProjects.filter((project) => project.type === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
        {filters.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                "relative pb-1 text-sm transition-colors duration-300",
                active ? "text-white" : "text-white/50 hover:text-white",
              )}
            >
              {item}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px origin-left bg-[#b69cff] transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <motion.ul layout={!reduceMotion} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.title}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-[22px] bg-[#1d1c27] p-2.5 ring-1 ring-white/[0.08] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(109,91,208,0.55)]"
            >
              {/* The screenshot also opens the live site (the buttons below are the labelled links). */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden
                className="block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/[0.06]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                />
              </a>

              <h3 className="mt-4 px-1.5 font-display text-base font-semibold tracking-[-0.01em] text-white">
                {project.title}
              </h3>
              <p className="mt-1 px-1.5 text-xs text-white/50">{project.category}</p>

              <div className="mt-auto flex items-center gap-2 px-1.5 pb-1.5 pt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live`}
                  className="group/live inline-flex items-center gap-1.5 rounded-full bg-[#6d5bd0] px-3.5 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7a67e0] hover:shadow-[0_8px_22px_-10px_rgba(139,107,255,0.9)]"
                >
                  Live demo
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                  />
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b69cff]/50 hover:text-white"
                  >
                    <FaGithub size={13} />
                    Repo
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
