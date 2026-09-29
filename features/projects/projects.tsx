"use client";

import {
  AnimatePresence,
  motion,
  useSpring,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { RevealText } from "@/components/interactive/RevealText";
import { projects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

// Editorial project index. On desktop a preview image follows the cursor
// over the list; on touch screens each row shows its image inline.
export function Projects() {
  const reduceMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(0, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <section id="projects" className="relative bg-canvas py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-line pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> Projects
          </span>
          <span>04 — Builds</span>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <RevealText
            as="h2"
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink"
            text={[{ text: "Selected " }, { text: "builds.", className: "text-accent" }]}
          />
          <p className="text-sm leading-7 text-muted sm:text-[15px]">
            Frontend projects focused on responsive interfaces, thoughtful UX and
            modern development practice — each one live and open source.
          </p>
        </div>

        <ul
          className="relative border-t border-line"
          onPointerMove={onMove}
          onPointerLeave={() => setHovered(null)}
        >
          {projects.map((project, index) => (
            <li key={project.title} className="relative border-b border-line">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View"
                onPointerEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className="group relative grid gap-5 overflow-hidden py-8 sm:py-10 lg:grid-cols-[80px_1fr_260px_48px] lg:items-center lg:gap-8"
              >
                {/* Blush sweep */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-tint transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />

                <span className="relative font-mono text-xs text-accent-deep lg:pl-4">{project.number}</span>

                <div className="relative">
                  <h3 className="font-display text-4xl leading-none text-ink transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-3 sm:text-6xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted">
                    {project.category}
                  </p>
                </div>

                {/* Inline image on touch / small screens */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="relative aspect-[16/10] w-full rounded-2xl object-cover lg:hidden"
                />

                <p className="relative text-xs leading-6 text-muted">{project.tech.join(" · ")}</p>

                <span className="relative hidden h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-canvas lg:flex">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </li>
          ))}

          {/* Cursor-following preview (desktop) */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            >
              <AnimatePresence>
                {hovered !== null && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="h-[240px] w-[360px] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(38,38,47,0.55)]"
                  >
                    <motion.div
                      className="flex h-full flex-col"
                      animate={{ y: `-${hovered * 100}%` }}
                      transition={{ duration: 0.6, ease }}
                    >
                      {projects.map((project) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={project.title}
                          src={project.image}
                          alt=""
                          className="h-full w-full shrink-0 object-cover"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link
            href="/work/demo-projects"
            className="group inline-flex items-center gap-3 rounded-full border border-ink py-2 pl-6 pr-2 text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            All projects &amp; details
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 group-hover:rotate-45 group-hover:bg-canvas group-hover:text-ink">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
