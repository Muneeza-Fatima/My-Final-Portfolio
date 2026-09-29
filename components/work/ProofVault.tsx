"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { RevealText } from "@/components/interactive/RevealText";
import { certificates, getCertificate, testimonials } from "@/data/work";

import { CertificateSheet } from "./proof/CertificateSheet";
import { CertificateViewer } from "./proof/CertificateViewer";
import { ProofId } from "./proof/ProofId";
import { Spotlight } from "./proof/Spotlight";
import { VerifiedSeal } from "./proof/VerifiedSeal";

const ease = [0.22, 1, 0.36, 1] as const;

function Signature({ name }: { name: string }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <svg viewBox="0 0 320 70" className="h-12 w-auto text-accent-deep" aria-hidden>
      <motion.text
        x="4"
        y="50"
        className="font-display"
        fontSize="44"
        stroke="currentColor"
        strokeWidth="0.9"
        initial={reduceMotion ? false : { strokeDasharray: 900, strokeDashoffset: 900, fillOpacity: 0 }}
        whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ strokeDashoffset: { duration: 2.4, ease: "easeInOut" }, fillOpacity: { delay: 1.8, duration: 0.8 } }}
        style={{ fill: "currentColor" }}
      >
        {name}
      </motion.text>
    </svg>
  );
}

const ledger = [
  { value: "01", label: "Internship" },
  { value: String(certificates.length).padStart(2, "0"), label: "Certificates" },
  { value: String(testimonials.length).padStart(2, "0"), label: "Client endorsement" },
  { value: "UAE · PK", label: "Worked across" },
];

export default function ProofVault() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const testimonial = testimonials[0];
  const testimonialCertificate = testimonial.certificateId
    ? getCertificate(testimonial.certificateId)
    : undefined;

  return (
    <section id="proof" className="relative overflow-hidden bg-tint-soft py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-accent/20 pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> The proof vault
          </span>
          <span>03 — Evidence</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <RevealText
            as="h2"
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink"
            text={[{ text: "Proof, " }, { text: "not ", className: "text-accent" }, { text: "promises." }]}
          />
          <p className="max-w-sm text-sm leading-7 text-muted lg:text-right">
            Every claim here is backed by a document you can open. Tilt a
            certificate, then click to inspect the original.
          </p>
        </div>

        {/* Certificates */}
        <div className="mt-16 grid gap-12 sm:mt-24 md:grid-cols-2 lg:gap-16">
          {certificates.map((certificate, index) => (
            <div key={certificate.id} className="flex flex-col gap-5">
              <CertificateSheet
                certificate={certificate}
                tilt={index % 2 === 0 ? -1.6 : 1.4}
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

        {/* Testimonial as a signed letter */}
        <Spotlight className="mt-24 rounded-[32px] sm:mt-32">
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="relative grid overflow-hidden rounded-[32px] border border-line bg-surface lg:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative p-7 sm:p-12">
              <div className="flex items-start justify-between gap-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-deep">
                  Client endorsement
                </p>
                <VerifiedSeal size={82} className="-mr-2 -mt-2 sm:-mr-4 sm:-mt-4" />
              </div>

              <span aria-hidden className="mt-2 block font-display text-8xl leading-none text-accent/50">
                &ldquo;
              </span>
              <blockquote className="-mt-6 font-display text-2xl leading-[1.35] text-ink sm:text-[2.1rem]">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
                <div>
                  <Signature name={testimonial.name} />
                  <p className="mt-1 text-sm font-medium text-ink">{testimonial.name}</p>
                  <p className="text-xs text-muted">
                    {testimonial.role} · {testimonial.company} · {testimonial.location}
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {testimonial.source}
                </p>
              </figcaption>
            </div>

            <div className="flex flex-col justify-between gap-10 bg-noir p-7 text-white sm:p-12">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
                  The engagement
                </p>
                <h3 className="mt-4 font-display text-4xl leading-tight">
                  A premium portfolio for a <span className="text-accent-soft">UAE founder.</span>
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Designed and developed end-to-end, then formally recognised by
                  the client with a Certificate of Appreciation.
                </p>
              </div>

              <div className="grid gap-3">
                {testimonialCertificate && (
                  <button
                    type="button"
                    onClick={() => setOpenIndex(certificates.indexOf(testimonialCertificate))}
                    className="inline-flex items-center justify-between gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white transition hover:border-accent-soft hover:bg-white/5"
                  >
                    See the original certificate
                    <ArrowUpRight size={15} />
                  </button>
                )}
                <Link
                  href="/work/client-work"
                  className="inline-flex items-center justify-between gap-2 rounded-full bg-accent-soft px-5 py-3 text-sm font-medium text-ink transition hover:bg-tint"
                >
                  Read the case study
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </motion.figure>
        </Spotlight>

        {/* Ledger */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-accent/15 bg-accent/15 lg:grid-cols-4">
          {ledger.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease }}
              className="flex flex-col bg-tint-soft p-7 sm:p-9"
            >
              <dt className="order-2 mt-2 text-[10px] uppercase tracking-[0.3em] text-muted">
                {item.label}
              </dt>
              <dd className="font-display text-5xl text-ink sm:text-6xl">{item.value}</dd>
            </motion.div>
          ))}
        </dl>
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
