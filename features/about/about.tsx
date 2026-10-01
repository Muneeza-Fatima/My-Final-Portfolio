"use client";

import { motion } from "framer-motion";

import { RevealText } from "@/components/interactive/RevealText";
import { currentRole } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { Expertise } from "./expertise";

const ease = [0.22, 1, 0.36, 1] as const;

const facts = [
  { label: "Based in", value: "Lahore, Pakistan" },
  { label: "Works with", value: "Clients worldwide, remote" },
  { label: "Communication", value: "Clear updates, on schedule" },
];

export default function About() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="about"
      className="relative border-t border-white/[0.06] bg-noir"
    >
      <div className="relative overflow-hidden bg-noir py-24 sm:py-32">
        {/* Quiet backdrop: a faint violet wash from the top, nothing busy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(139,107,255,0.08),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 3xl:max-w-[1760px] 3xl:px-20">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            <span className="h-px w-8 bg-white/30" /> About me
          </p>

          <div className="mt-8 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            {/* Story */}
            <div className="min-w-0">
              <RevealText
                as="h2"
                className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white lg:text-[clamp(2.2rem,4vw,3.5rem)] wide:text-[clamp(2.6rem,4.4vw,4.2rem)] 3xl:text-[4.75rem]"
                text={[
                  { text: "Where digital presence becomes " },
                  { text: "brand presence.", className: "text-[#b69cff]" },
                ]}
              />

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="mt-8 max-w-xl space-y-5 text-[15px] leading-8 text-white/75 sm:text-base lg:text-[15px] wide:text-base 3xl:max-w-2xl 3xl:text-lg"
              >
                <p>
                  Your website is often the first meeting a client has with your
                  brand — and they decide in seconds whether you&apos;re worth
                  their time. I make sure that first impression works in your
                  favour.
                </p>
                <p>
                  I&apos;m Muneeza, a frontend and UI/UX developer working
                  remotely with{" "}
                  <span className="font-semibold text-white">
                    {currentRole.company}
                  </span>{" "}
                  in the {currentRole.location}. I design and build fast,
                  polished interfaces where every detail has a reason — so
                  visitors trust what they see and know exactly what to do next.
                </p>
              </motion.div>
            </div>

            {/* Current role — glass card, with soft light behind it so the glass reads */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(139,107,255,0.22),transparent)] blur-2xl"
              />

              <motion.aside
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
                aria-label={`Currently working at ${currentRole.company}`}
                className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/[0.07] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-colors duration-500 hover:border-white/25 sm:p-9"
              >
                {/* Hairline accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-9 top-0 h-px bg-gradient-to-r from-transparent via-[#b69cff]/50 to-transparent"
                />

                <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400/90"
                  />
                  Currently
                </p>

                <h3 className="mt-6 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[2rem]">
                  {currentRole.company}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/75">
                  {currentRole.location} · {currentRole.mode}
                </p>

                <dl className="mt-8 space-y-5 border-t border-white/10 pt-7">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Role
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-[#e7dcff]">
                      {currentRole.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Focus
                    </dt>
                    <dd className="mt-1.5 text-sm leading-7 text-white/90">
                      {currentRole.focus.join(" · ")}
                    </dd>
                  </div>
                </dl>
              </motion.aside>
            </div>
          </div>

          {/* Quick facts — a single quiet line */}
          <dl className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-12">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {label}
                </dt>
                <dd className="text-sm text-white/80">{value}</dd>
              </div>
            ))}
          </dl>

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
