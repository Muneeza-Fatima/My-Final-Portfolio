"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

import { cn } from "@/lib/utils";

// Shared dark card surface with the interactive shine rim (see .card-shine).
export const darkCard =
  "card-shine group flex flex-col overflow-hidden rounded-[22px] p-2.5 text-white shadow-[0_20px_40px_-30px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(109,91,208,0.5)]";

// Feeds the pointer position to .card-shine so its bright rim follows the cursor.
export function trackShine(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

// Screenshot inside a minimal dark browser frame. Images are 16:10 to match
// the frame, so nothing is cut off. Falls back to the project's initials if it is missing.
export function BrowserShot({
  src,
  title,
  url,
  overlay = true,
  className,
}: {
  src: string;
  title: string;
  url: string;
  overlay?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className={cn("overflow-hidden rounded-[16px] bg-[#0b0c0f] ring-1 ring-white/[0.06]", className)}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[10px] text-white/35">
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1d1a33] to-[#0b0c0f] font-display text-5xl font-bold text-[#b69cff]/60">
            {initials}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`${title} preview`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-[1.02]"
          />
        )}
        {overlay && (
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View live <ArrowUpRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}

// Glowing Live button; a GitHub button only when the project shares its repo.
export function ProjectLinks({
  title,
  liveUrl,
  githubUrl,
  className,
  size = "md",
}: {
  title: string;
  liveUrl: string;
  githubUrl?: string;
  className?: string;
  // "sm": compact Live button and an icon-only GitHub button.
  size?: "md" | "sm";
}) {
  const small = size === "sm";
  return (
    <div className={cn("flex flex-wrap items-center gap-3", small && "gap-2", className)}>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live`}
        className={cn(
          "group/live relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#6d5bd0] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_22px_-10px_rgba(139,107,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7a67e0] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_30px_-8px_rgba(139,107,255,0.95)] active:translate-y-0",
          small ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm",
        )}
      >
        {/* Light sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-[left] duration-700 ease-out group-hover/live:left-[120%]"
        />
        <span className="relative">Live demo</span>
        <ArrowUpRight
          size={small ? 13 : 15}
          className="relative transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
        />
      </a>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} source code on GitHub`}
          title="View source on GitHub"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full border border-white/12 font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b69cff]/50 hover:text-white hover:shadow-[0_0_22px_-6px_rgba(139,107,255,0.6)] active:translate-y-0",
            small ? "h-[34px] w-[34px]" : "px-5 py-2.5 text-sm",
          )}
        >
          <FaGithub size={small ? 14 : 15} />
          {!small && "GitHub"}
        </a>
      )}
    </div>
  );
}
