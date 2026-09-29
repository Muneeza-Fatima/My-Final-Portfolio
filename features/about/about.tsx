"use client";

import { motion } from "framer-motion";

import { RevealText } from "@/components/interactive/RevealText";
import { clientWork, internship } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { Expertise } from "./expertise";

const ease = [0.22, 1, 0.36, 1] as const;

// Only verifiable facts — nothing inflated.
const facts = [
  { label: "Based in", value: "Lahore, Pakistan" },
  {
    label: "Internship",
    value: `${internship.department} · ${internship.company}`,
  },
  {
    label: "Client work",
    value: `${clientWork.company}, ${clientWork.location}`,
  },
  { label: "Focus", value: "React, Next.js & UI" },
];

export default function About() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="about" className="relative bg-canvas p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-[28px] bg-noir py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            <span className="h-px w-8 bg-white/30" /> About me
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            {/* Story */}
            <div className="min-w-0">
              <RevealText
                as="h2"
                className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
                text={[
                  { text: "Where digital presence becomes " },
                  { text: "brand presence.", className: "text-white/60" },
                ]}
              />

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="mt-8 max-w-xl space-y-5 text-[15px] leading-8 text-white/75 sm:text-base"
              >
                <p>
                  I&apos;m Muneeza, a frontend developer who turns ideas into
                  clean, fast and polished websites. I care about the details
                  people feel but rarely notice — spacing, motion, and how
                  easily a page guides them.
                </p>
                <p>
                  I build with React and Next.js, and I treat every project as a
                  chance to make a brand look as credible online as it is in
                  person.
                </p>
              </motion.div>
            </div>

            {/* Profile card: quiet glass, a hairline accent on top, clear hierarchy */}
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty(
                  "--mx",
                  `${event.clientX - rect.left}px`,
                );
                event.currentTarget.style.setProperty(
                  "--my",
                  `${event.clientY - rect.top}px`,
                );
              }}
              className="group relative self-start overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-luxe)] hover:-translate-y-1 hover:border-[#a78bfa]/35 hover:shadow-[0_30px_70px_-35px_rgba(167,139,250,0.55)]"
            >
              {/* Cursor-following light */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(167,139,250,0.14), transparent 60%)",
                }}
              />
              {/* Top hairline that brightens and widens on hover */}
              <span
                aria-hidden
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#b69cff]/60 to-transparent transition-all duration-500 group-hover:inset-x-2 group-hover:via-[#d8ccff]"
              />

              <div className="flex items-center gap-4 border-b border-white/10 p-6 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-display text-base font-bold text-white transition-colors duration-500 group-hover:border-[#a78bfa]/60 group-hover:bg-[#a78bfa]/20">
                  MF
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold text-white">
                    Muneeza Fatima
                  </p>
                  <p className="text-sm text-white/55">Frontend Developer</p>
                </div>
              </div>

              <dl className="px-6 sm:px-7">
                {facts.map(({ label, value }) => (
                  <div
                    key={label}
                    className="-mx-3 flex items-baseline justify-between gap-6 rounded-xl border-b border-white/[0.06] px-3 py-4 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.04]"
                  >
                    <dt className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-white/45">
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-medium text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-2 border-t border-white/10 p-6 sm:p-7">
                {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition-colors duration-300 hover:border-[#a78bfa]/50 hover:bg-[#a78bfa]/15 hover:text-white"
                    >
                      {tool}
                    </span>
                  ),
                )}
              </div>
            </motion.aside>
          </div>

          {/* What I bring */}
          <div className="mt-24 sm:mt-28">
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
              What I bring
            </h3>
            <Expertise />
          </div>
        </div>
      </div>
    </section>
  );
}
