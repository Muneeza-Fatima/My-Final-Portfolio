"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

import { internship } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const brands: Record<string, { icon: IconType; color: string }> = {
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#1572B6" },
  JavaScript: { icon: SiJavascript, color: "#D4B106" },
  React: { icon: SiReact, color: "#149ECA" },
  "Next.js": { icon: SiNextdotjs, color: "#111216" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#0EA5E9" },
  Git: { icon: SiGit, color: "#F05032" },
};

// Toolkit pills with brand icons; each lifts and picks up its brand colour on hover.
export function ToolkitChips() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <ul className="flex flex-wrap gap-2">
      {internship.stack.map((name, index) => {
        const brand = brands[name];
        const Icon = brand?.icon ?? Wrench;
        const color = brand?.color ?? "#3b3b48";
        return (
          <motion.li
            key={name}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex cursor-default items-center gap-2 rounded-full border-shine px-3.5 py-1.5 text-xs font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-14px_rgba(17,18,22,0.4)]"
          >
            <Icon
              aria-hidden
              size={14}
              style={{ color }}
              className="transition-transform duration-300 group-hover:scale-125"
            />
            {name}
          </motion.li>
        );
      })}
    </ul>
  );
}
