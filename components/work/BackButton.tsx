"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { previousPath } from "@/lib/nav-history";

// Returns to the page the visitor came from on this site (the home page
// lands on its Work section); if they arrived directly, e.g. from Google,
// it takes them to the Work section of the home page.
export function BackButton({ fallback = "/#work" }: { fallback?: string }) {
  const router = useRouter();

  const goBack = () => {
    const prev = previousPath();
    if (!prev || prev === window.location.pathname) router.push(fallback);
    else router.push(prev === "/" ? "/#work" : prev);
  };

  return (
    <motion.button
      type="button"
      onClick={goBack}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-2 pr-5 text-sm font-medium text-ink backdrop-blur-sm transition-all duration-300 hover:border-[#6d5bd0]/50 hover:shadow-[0_10px_24px_-14px_rgba(109,91,208,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5bd0]/40"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6d5bd0] text-white transition-transform duration-300 group-hover:-translate-x-0.5">
        <ArrowLeft size={15} />
      </span>
      Back
    </motion.button>
  );
}

// Slim bar at the end of a work page, just above the footer.
export function BackBar() {
  return (
    <div className="relative -mt-px bg-tint-soft pb-16 pt-2 sm:pb-20">
      <div className="mx-auto flex max-w-7xl justify-center border-t border-line px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <BackButton />
      </div>
    </div>
  );
}
