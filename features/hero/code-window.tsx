"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Syntax colours kept inside the hero's purple/lavender family.
const kw = "text-[#b69cff]";
const str = "text-[#e7dcff]";
const key = "text-[#d8ccff]";
const dim = "text-white/35";

// Decorative editor window that sits behind the portrait. The code is a
// small "about me" object — purely visual, hidden from screen readers.
export function CodeWindow({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      {/* Second window outline, offset behind, for a stacked-windows feel */}
      <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-[20px] border border-[#a78bfa]/30" />

      <motion.div
        initial={
          reduceMotion ? false : { clipPath: "inset(100% 0 0 0 round 20px)" }
        }
        animate={{ clipPath: "inset(0% 0 0 0 round 20px)" }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="absolute inset-0 overflow-hidden rounded-[20px] border border-[#a78bfa]/40 bg-[#15122a]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_40px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md"
      >
        {/* Title bar */}
        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b69cff]/80" />
          <span className="ml-3 rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/55">
            muneeza.tsx
          </span>
        </div>

        {/* Soft purple light behind the head */}
        <div className="absolute left-1/2 top-[18%] h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.45),rgba(167,139,250,0.08)_60%,transparent)]" />

        {/* Code */}
        <pre className="relative px-4 pt-3 font-mono text-[10px] leading-[1.9] text-white/70 opacity-70 sm:text-[11px] lg:text-xs">
          <code>
            <span className={kw}>const</span>{" "}
            <span className={key}>developer</span>{" "}
            <span className={dim}>=</span> {"{"}
            {"\n  "}
            <span className={key}>name</span>
            <span className={dim}>:</span>{" "}
            <span className={str}>&quot;Muneeza Fatima&quot;</span>,{"\n  "}
            <span className={key}>role</span>
            <span className={dim}>:</span>{" "}
            <span className={str}>&quot;Frontend Developer&quot;</span>,{"\n  "}
            <span className={key}>stack</span>
            <span className={dim}>:</span> [
            <span className={str}>&quot;React&quot;</span>,{" "}
            <span className={str}>&quot;Next.js&quot;</span>],
            {"\n  "}
            <span className={key}>craft</span>
            <span className={dim}>:</span>{" "}
            <span className={str}>&quot;pixel-perfect UI&quot;</span>,{"\n"}
            {"}"};{"\n\n"}
            <span className={kw}>export default function</span>{" "}
            <span className={key}>Portfolio</span>() {"{"}
            {"\n  "}
            <span className={kw}>return</span> <span className={dim}>&lt;</span>
            <span className={key}>Experience</span>{" "}
            <span className={key}>quality</span>
            <span className={dim}>=</span>
            <span className={str}>&quot;premium&quot;</span>{" "}
            <span className={dim}>/&gt;</span>;{"\n"}
            {"}"}
          </code>
        </pre>
      </motion.div>
    </div>
  );
}
