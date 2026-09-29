"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

type RevealTextProps = {
  // Plain string, or segments so parts can be styled (e.g. accent colour).
  text: string | Segment[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  // Animate on mount instead of when scrolled into view.
  immediate?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Each word slides up out of a clipping mask, staggered.
export function RevealText({ text, as = "h2", className, delay = 0, immediate = false }: RevealTextProps) {
  const reduceMotion = usePrefersReducedMotion();
  const segments: Segment[] = typeof text === "string" ? [{ text }] : text;
  const Tag = motion[as];

  let index = 0;
  const words = segments.flatMap((segment) =>
    segment.text
      .split(/(\n|[^\S\n]+)/)
      .filter((part) => part.length > 0)
      .map((part) => ({ part, className: segment.className })),
  );

  const label = segments.map((s) => s.text).join("").replace(/\n/g, " ");

  return (
    <Tag
      className={className}
      aria-label={label}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
    >
      {words.map(({ part, className: wordClass }, i) => {
        if (part === "\n") return <br key={`br-${i}`} />;
        if (/^\s+$/.test(part)) return <span key={`s-${i}`}> </span>;
        const order = index++;
        return (
          <span
            key={`${part}-${i}`}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
          >
            <motion.span
              className={cn("inline-block will-change-transform", wordClass)}
              variants={{
                hidden: reduceMotion ? { y: 0 } : { y: "110%" },
                show: {
                  y: 0,
                  transition: { duration: 0.9, ease, delay: delay + order * 0.06 },
                },
              }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
