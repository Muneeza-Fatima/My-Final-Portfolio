"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Globe2, GraduationCap, Laptop } from "lucide-react";
import { useState } from "react";

import { RevealText } from "@/components/interactive/RevealText";
import { trackShine } from "@/components/work/crafted/ProjectParts";
import { certificates, testimonials } from "@/data/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { CertificateSheet } from "./proof/CertificateSheet";
import { CertificateViewer } from "./proof/CertificateViewer";
import { ProofId } from "./proof/ProofId";

const ease = [0.22, 1, 0.36, 1] as const;

// Proof points — kept as facts, never counts. Each has a related backdrop.
const points = [
  { icon: GraduationCap, label: "Certified internship", image: "/projects/Internship.jpeg" },
  { icon: BadgeCheck, label: "Client-recognised work", image: "/projects/client-work.jpeg" },
  { icon: Globe2, label: "International clients", image: "/images/what-i-bring-frontend.jpg" },
  { icon: Laptop, label: "Remote, across time zones", image: null },
];

// Backdrop for "Remote, across time zones": time-zone meridians with the
// two zones I work across marked.
function TimeZones() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full bg-[radial-gradient(120%_90%_at_70%_20%,#2a2350,#101117_65%)]"
    >
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={i * 33} y1="0" x2={i * 33} y2="300" stroke="rgba(182,156,255,0.12)" />
      ))}
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(182,156,255,0.08)" />
      ))}
      <ellipse cx="200" cy="125" rx="150" ry="58" fill="none" stroke="rgba(182,156,255,0.25)" />
      {[
        { x: 186, label: "UAE · GMT+4" },
        { x: 214, label: "PK · GMT+5" },
      ].map((zone, i) => (
        <g key={zone.label}>
          <line x1={zone.x} y1="40" x2={zone.x} y2="200" stroke="rgba(182,156,255,0.6)" strokeDasharray="3 4" />
          <circle cx={zone.x} cy="125" r="5" fill="#b69cff" />
          <circle cx={zone.x} cy="125" r="12" fill="none" stroke="rgba(182,156,255,0.45)" />
          <text
            x="200"
            y={i === 0 ? 96 : 166}
            textAnchor="middle"
            fill="rgba(230,222,255,0.9)"
            fontSize="17"
            fontFamily="var(--font-code)"
          >
            {zone.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// First sentence of a quote, so the card stays short.
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return match ? match[0].trim() : text;
}

export default function ProofVault() {
  const reduceMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const testimonial = testimonials[0];

  return (
    <section id="proof" className="relative overflow-hidden bg-tint-soft py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
              The proof
            </p>
            <RevealText
              as="h2"
              className="mt-3 font-display text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink"
              text={[{ text: "Proof, not " }, { text: "promises.", className: "text-[#6d5bd0]" }]}
            />
          </div>
          <p className="max-w-md text-sm leading-7 text-muted sm:text-[15px]">
            I work with international clients, and every claim here is backed by
            a document you can open.
          </p>
        </div>

        {/* Certificates */}
        <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
          {certificates.map((certificate, index) => (
            <div key={certificate.id} className="flex flex-col gap-4">
              <CertificateSheet
                certificate={certificate}
                tilt={index % 2 === 0 ? -1.2 : 1.2}
                onOpen={() => setOpenIndex(index)}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <p className="text-sm text-muted">{certificate.title}</p>
                <ProofId>
                  {certificate.number ? `No. ${certificate.number}` : `Issued ${certificate.date}`}
                </ProofId>
              </div>
            </div>
          ))}
        </div>

        {/* Short client quote + proof points */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {testimonial && (
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease }}
              onPointerMove={trackShine}
              className="card-shine flex flex-col justify-between gap-8 overflow-hidden rounded-[24px] p-7 text-white sm:p-9"
            >
              <blockquote className="font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.4] tracking-[-0.01em]">
                <span className="text-[#b69cff]">&ldquo;</span>
                {firstSentence(testimonial.quote)}
                <span className="text-[#b69cff]">&rdquo;</span>
              </blockquote>
              <figcaption className="border-t border-white/10 pt-5">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-white/55">
                  {testimonial.role} · {testimonial.company}
                </p>
              </figcaption>
            </motion.figure>
          )}

          <ul className="grid grid-cols-2 gap-3">
            {points.map(({ icon: Icon, label, image }, index) => (
              <motion.li
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                onPointerMove={trackShine}
                className="card-shine group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[20px] p-5 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                ) : (
                  <TimeZones />
                )}
                {/* Keeps the label readable on any image */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/95 via-[#0e0f12]/55 to-[#0e0f12]/25"
                />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-sm">
                  <Icon size={17} className="text-[#c9bcff]" aria-hidden />
                </span>
                <span className="relative text-sm font-semibold leading-snug">{label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <CertificateViewer
        certificates={certificates}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  );
}
