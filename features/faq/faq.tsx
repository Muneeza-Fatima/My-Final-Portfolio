"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "What does Muneeza Fatima do?",
    answer:
      "Muneeza is a frontend developer and UI/UX designer. She builds modern, responsive websites and interfaces — from personal brand portfolios to business sites — focused on clean design, smooth interaction and a strong first impression.",
  },
  {
    question: "How much experience does Muneeza have?",
    answer:
      "Over two years of learning and building with frontend technologies, a certified web development internship at Digital Brains, and ongoing remote work as a Frontend & UI/UX Developer with BH Ventures FZE LLC in the UAE.",
  },
  {
    question: "What technologies does Muneeza specialize in?",
    answer:
      "React, Next.js and Tailwind CSS, alongside HTML5, CSS3, JavaScript and Git — with Framer Motion for animation and interaction.",
  },
  {
    question: "Does Muneeza work with international clients?",
    answer:
      "Yes. She works remotely with clients outside Pakistan, including the UAE — communicating in English and planning calls and updates around your time zone.",
  },
  {
    question: "What if I’m not happy with the work?",
    answer:
      "You see progress in stages, so feedback comes early — not at the end. Revisions within the agreed scope are part of the process, and the work is refined until it matches what we agreed on.",
  },
  {
    question: "I already have a website — can Muneeza fix or improve it?",
    answer:
      "Yes. She can work on an existing HTML/CSS/JavaScript, React or Next.js site — fixing layout and mobile issues, refreshing the design or improving performance.",
  },
  {
    question: "How can I hire Muneeza for a project?",
    answer:
      "Send a short brief through the contact form below — what you need, your timeline and any references you like. She’ll reply with the next steps.",
  },
];

export function Faq() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-canvas py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">FAQ</p>
          <h2 className="mt-3 font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
            Questions, <span className="text-[#6d5bd0]">answered.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted sm:text-[15px]">
            The things clients usually ask before we start working together.
          </p>
          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-[#6d5bd0]/40 underline-offset-8 transition hover:decoration-[#6d5bd0]"
          >
            Still curious? Let&apos;s talk
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <ul className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <li
                key={item.question}
                className={cn(
                  "border-shine rounded-[20px] transition-shadow duration-300",
                  isOpen && "shadow-[0_18px_40px_-28px_rgba(109,91,208,0.55)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-center justify-between gap-6 rounded-[20px] px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6d5bd0]/40 sm:px-6"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-[#6d5bd0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-90 border-[#6d5bd0] bg-[#6d5bd0] text-white"
                        : "border-line text-ink group-hover:border-[#6d5bd0]/50",
                    )}
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-[3.6rem] text-sm leading-7 text-muted sm:px-6 sm:pb-6 sm:pl-[4.1rem] sm:text-[15px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
