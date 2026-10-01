import type { Metadata } from "next";

import { CaseHeader } from "@/components/work/CaseHeader";
import WorkCTA from "@/components/work/WorkCTA";
import { CertificateShowcase } from "@/components/work/proof/CertificateShowcase";
import { VerifiedSeal } from "@/components/work/proof/VerifiedSeal";
import { clientWork, getCertificate, testimonials } from "@/data/work";
import { Footer } from "@/features/footer";

export const metadata: Metadata = {
  title: `Client Work — ${clientWork.company}`,
  description: clientWork.summary,
};

export default function ClientWorkPage() {
  const certificate = getCertificate(clientWork.certificateId);
  const testimonial = testimonials.find((t) => t.certificateId === clientWork.certificateId);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <CaseHeader
        chapter="Chapter 02 · Client Work"
        title={["Real work.", "Trust in writing."]}
        intro={clientWork.summary}
        aside={<VerifiedSeal size={124} label="CLIENT APPROVED · UAE · " />}
        meta={[
          { label: "Client", value: `${clientWork.client}, ${clientWork.role}` },
          { label: "Company", value: clientWork.company },
          { label: "Industry", value: clientWork.industry },
          { label: "Location", value: clientWork.location },
        ]}
      />

      {/* The brief */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-deep">The brief</p>
            <h2 className="mt-5 font-display text-5xl leading-[1] sm:text-6xl">
              A {clientWork.project.toLowerCase()} for a{" "}
              <span className="text-accent">founder’s presence.</span>
            </h2>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">Scope</p>
            <ol className="mt-5 border-t border-line">
              {clientWork.scope.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-6 border-b border-line py-5 font-display text-2xl text-ink sm:text-3xl"
                >
                  <span className="font-mono text-xs text-accent-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Endorsement + certificate */}
      <section className="relative overflow-hidden bg-noir py-24 text-white sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#6d5bd0]/20 blur-[150px]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
          {testimonial && (
            <figure>
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b69cff]">
                <span className="h-px w-8 bg-[#b69cff]" />
                In the client’s words
              </p>
              <blockquote className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                <span className="text-[#b69cff]">&ldquo;</span>
                {testimonial.quote}
                <span className="text-[#b69cff]">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white/60">
                  {testimonial.role} · {testimonial.company}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                  {testimonial.source}
                </p>
              </figcaption>
            </figure>
          )}

          {certificate && <CertificateShowcase certificate={certificate} tilt={-1.4} />}
        </div>
      </section>

      <WorkCTA />
      <Footer />
    </main>
  );
}
