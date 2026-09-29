"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { FoilCard } from "@/components/interactive/FoilCard";
import type { Certificate } from "@/data/work";

type CertificateSheetProps = {
  certificate: Certificate;
  onOpen: () => void;
  tilt?: number;
  className?: string;
};

// A certificate as a pinned sheet with a foil sheen. Clicking opens the viewer.
export function CertificateSheet({ certificate, onOpen, tilt = 0, className }: CertificateSheetProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 110, damping: 20 }}
      className={className}
    >
      <FoilCard className="rounded-[14px]">
        <button
          type="button"
          onClick={onOpen}
          data-cursor="Open"
          aria-label={`View ${certificate.title} from ${certificate.issuer}`}
          className="group relative block w-full rounded-[14px] border border-line bg-surface p-3 text-left shadow-[0_40px_80px_-40px_rgba(38,38,47,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-accent-deep"
        >
          {/* Rose-gold pin */}
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#F4F3F8,#6E6E80_45%,#26262F)] shadow-[0_6px_10px_rgba(38,38,47,0.35)]"
          />

          <div className="overflow-hidden rounded-[8px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={certificate.image}
              alt={`${certificate.title} — ${certificate.issuer}`}
              loading="lazy"
              className="aspect-[1.414/1] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex items-end justify-between gap-4 px-1.5 pb-1 pt-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-accent-deep">
                {certificate.kind}
              </p>
              <p className="mt-1.5 font-display text-2xl leading-tight text-ink">{certificate.issuer}</p>
            </div>
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {certificate.date}
            </p>
          </div>
        </button>
      </FoilCard>
    </motion.div>
  );
}
