"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, LayoutTemplate, Plus, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

import { Marquee } from "@/components/interactive/Marquee";
import { RevealText } from "@/components/interactive/RevealText";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Frontend Engineering",
    description:
      "Building modern, responsive interfaces using React, Next.js and scalable frontend architecture.",
    stack: ["React", "Next.js", "TypeScript"],
    icon: Code2,
  },
  {
    title: "UI Implementation",
    description:
      "Transforming designs into polished interfaces with attention to detail, usability and consistency.",
    stack: ["Responsive Design", "UI Systems"],
    icon: LayoutTemplate,
  },
  {
    title: "Motion & Interaction",
    description:
      "Creating engaging digital experiences through smooth animations, transitions and micro-interactions.",
    stack: ["Framer Motion", "Interactive UI"],
    icon: Sparkles,
  },
  {
    title: "Performance Optimization",
    description:
      "Improving speed, accessibility and overall website performance for better user experiences.",
    stack: ["Performance", "Clean Code"],
    icon: Zap,
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "JavaScript",
  "Responsive Design",
  "Accessibility",
  "UI Systems",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="relative overflow-hidden bg-canvas py-28 sm:py-40">
      {/* Skills band */}
      <div className="mb-24 -rotate-2 border-y border-accent/20 bg-tint py-5 sm:mb-32">
        <Marquee items={skills} className="font-display text-3xl text-ink sm:text-5xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-line pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> Services
          </span>
          <span>05 — Expertise</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <RevealText
              as="h2"
              className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] text-ink"
              text={[{ text: "Building modern " }, { text: "digital experiences.", className: "text-accent" }]}
            />
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
              I create responsive, interactive and high-performance web
              experiences using modern frontend technologies.
            </p>
          </div>

          <ul className="border-t border-line">
            {services.map((service, index) => {
              const isOpen = open === index;
              const Icon = service.icon;
              const panelId = `service-panel-${index}`;
              return (
                <li key={service.title} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                  >
                    <span className="font-mono text-xs text-accent-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-3xl leading-tight transition-colors duration-500 sm:text-5xl",
                        isOpen ? "text-accent-deep" : "text-ink group-hover:text-accent-deep",
                      )}
                    >
                      {service.title}
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-line text-ink",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-6 pb-8 pl-9 sm:pl-14">
                          <motion.span
                            initial={{ scale: 0.4, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 16 }}
                            className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tint text-accent-deep sm:flex"
                          >
                            <Icon size={22} />
                          </motion.span>
                          <div>
                            <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
                              {service.description}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                              {service.stack.map((item) => (
                                <li
                                  key={item}
                                  className="rounded-full border border-accent/25 px-3.5 py-1.5 text-xs text-ink"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
