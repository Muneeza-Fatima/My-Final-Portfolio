"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef, useState } from "react";

import { Marquee } from "@/components/interactive/Marquee";
import { ServiceVisual } from "./service-visuals";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Service = {
  title: string;
  short: string;
  description: string;
  points: string[];
  tech: string[];
};

const services: Service[] = [
  {
    title: "Custom Websites",
    short: "Websites",
    description:
      "Any kind of website you have in mind — business sites, company profiles, booking or catalogue sites — designed and built around your brief.",
    points: ["Designed around your brand", "Responsive on every screen", "Fast, clean code"],
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "SaaS Development",
    short: "SaaS",
    description:
      "Front ends for SaaS products and web apps — the screens your users live in every day, connected to your backend.",
    points: ["Dashboards & data views", "Auth & onboarding flows", "Connected to your APIs"],
    tech: ["Next.js", "React", "TypeScript"],
  },
  {
    title: "AI Chatbots",
    short: "AI Chatbots",
    description:
      "AI-powered chat assistants on your website that answer visitors' questions, guide them and capture leads — around the clock.",
    points: ["Chat UI in your brand", "Answers from your content", "Lead capture built in"],
    tech: ["AI APIs", "React", "Chat UI"],
  },
  {
    title: "E-commerce Stores",
    short: "E-commerce",
    description: "Online stores that make browsing easy and buying feel effortless.",
    points: ["Product & category pages", "Cart and checkout flow", "Mobile-first shopping"],
    tech: ["React", "Next.js"],
  },
  {
    title: "Portfolio & Personal Brand",
    short: "Portfolio",
    description: "Websites that make founders, creators and professionals look credible at first glance.",
    points: ["Story-led layout", "Premium visual identity", "Clear call to action"],
    tech: ["Next.js", "Framer Motion"],
  },
  {
    title: "Landing Pages",
    short: "Landing",
    description: "Focused, fast pages for launches, campaigns and products — built to convert.",
    points: ["One clear message", "Conversion-focused layout", "Quick turnaround"],
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "UI/UX Design",
    short: "UI/UX",
    description: "Interfaces people understand instantly and enjoy using.",
    points: ["Layout & visual hierarchy", "Design to code, pixel-close", "Consistent UI system"],
    tech: ["Interface design", "Prototyping"],
  },
  {
    title: "Website Redesign",
    short: "Redesign",
    description: "Turn an outdated site into one that feels current — and keep it that way.",
    points: ["Modern refresh", "Mobile issues fixed", "Ongoing support"],
    tech: ["HTML/CSS/JS", "React", "Next.js"],
  },
  {
    title: "Performance & SEO",
    short: "SEO",
    description: "Faster pages, better accessibility and a structure search engines understand.",
    points: ["Speed optimisation", "Accessibility fixes", "SEO-ready markup"],
    tech: ["Core Web Vitals", "Semantic HTML"],
  },
];

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "JavaScript",
  "HTML5 & CSS3",
  "UI/UX Design",
  "AI Integrations",
  "Responsive Design",
];

const total = services.length;
const STEP_SVH = 60; // scroll distance per service
const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

function Points({ service }: { service: Service }) {
  return (
    <>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:mt-6">
        What you get
      </p>
      <ul className="mt-2.5 grid gap-2 sm:mt-3 sm:gap-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm text-white/85 sm:text-[15px]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6d5bd0]/25 text-[#c9bcff]">
              <Check size={12} strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-white/40 sm:mt-5">{service.tech.join("  ·  ")}</p>
    </>
  );
}

// One segment of the progress bar; fills as its step is scrolled through.
function Segment({
  index,
  progress,
  onSelect,
  label,
}: {
  index: number;
  progress: MotionValue<number>;
  onSelect: () => void;
  label: string;
}) {
  const fill = useTransform(progress, (p) => Math.min(1, Math.max(0, p * total - index)));
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Go to ${label}`}
      className="group flex-1 py-3 outline-none"
    >
      <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/10">
        <motion.span
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-[#6d5bd0] to-[#b69cff]"
          style={{ scaleX: fill }}
        />
      </span>
      <span className="mt-2 hidden truncate text-left text-[10px] uppercase tracking-[0.16em] text-white/35 transition-colors group-hover:text-white/80 lg:block">
        {label}
      </span>
    </button>
  );
}

function CallToAction() {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/55 sm:text-[15px]">
      <span>
        <span className="font-semibold text-white">Need something else?</span> If it runs in a
        browser, I can most likely build it.
      </span>
      <a
        href="#contact"
        className="group inline-flex items-center gap-1.5 font-medium text-white underline decoration-[#b69cff]/50 underline-offset-8 transition hover:decoration-[#b69cff]"
      >
        Tell me about it
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </p>
  );
}

function Heading() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">Services</p>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
        Whatever you need, <span className="heading-accent text-[#b69cff]">built.</span>
      </h2>
    </div>
  );
}

// Faint violet glow and masked grid behind the dark block.
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[#6d5bd0]/20 blur-[160px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#b69cff]/10 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

// Pinned scroll story: the section holds on screen and shows one service at a
// time, very large; scrolling moves to the next, with a segmented progress bar.
function ServiceStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(p * total))));
  });

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (range / total) * (index + 0.5), behavior: "smooth" });
  };

  const service = services[active];

  return (
    <div ref={ref} className="relative" style={{ height: `calc(100svh + ${total * STEP_SVH}svh)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[72px]">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-6 pt-6 sm:px-10 sm:pt-10 lg:px-14">
          <div className="flex items-start justify-between gap-6">
            <Heading />
            <p className="font-mono text-sm text-white/40 sm:text-base">
              <span className="text-[#b69cff]">{pad(active + 1)}</span> / {pad(total)}
            </p>
          </div>

          <div className="grid flex-1 content-center gap-4 py-4 sm:gap-6 sm:py-6 md:grid-cols-[1.15fr_0.8fr_1fr] md:items-center md:gap-6 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-10">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={service.title}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease }}
                  className="font-display text-[clamp(2.1rem,9vw,3rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white [overflow-wrap:anywhere] md:text-[clamp(2rem,4.3vw,4.75rem)]"
                >
                  {service.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease }}
                  className="mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[360px]"
                >
                  <ServiceVisual index={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.1 } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
              >
                <p className="line-clamp-3 max-w-md text-sm leading-6 text-white/70 sm:text-[15px] sm:leading-7 md:line-clamp-none lg:text-base">
                  {service.description}
                </p>
                <Points service={service} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5 sm:gap-2">
            {services.map((item, index) => (
              <Segment
                key={item.title}
                index={index}
                progress={scrollYProgress}
                label={item.short}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reduced motion: the same content as a static dark list.
function ServiceList() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-14">
      <Heading />
      <ul className="mt-10 border-t border-white/10">
        {services.map((service, index) => (
          <li
            key={service.title}
            className="grid gap-4 border-b border-white/10 py-8 lg:grid-cols-[4rem_1.2fr_1fr_14rem] lg:items-center lg:gap-10"
          >
            <span className="font-mono text-sm text-[#b69cff]">{pad(index + 1)}</span>
            <h3 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{service.title}</h3>
            <div>
              <p className="text-[15px] leading-7 text-white/70">{service.description}</p>
              <Points service={service} />
            </div>
            <div className="hidden lg:block">
              <ServiceVisual index={index} still />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="services" className="relative bg-canvas">
      {/* Skills band — straight, always moving */}
      <div className="border-y border-accent/20 bg-tint py-5 text-ink">
        <Marquee
          items={skills}
          className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-4xl"
        />
      </div>

      <div className="relative bg-noir text-white">
        <Backdrop />
        <div className="relative">{reduceMotion ? <ServiceList /> : <ServiceStory />}</div>
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-4 sm:px-10 sm:pb-24 lg:px-14">
          <div className="border-t border-white/10 pt-8">
            <CallToAction />
          </div>
        </div>
      </div>
    </section>
  );
}
