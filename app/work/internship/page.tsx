import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { CaseHeader } from "@/components/work/CaseHeader";
import { InternshipOutcomes, InternshipTimeline } from "@/components/work/InternshipTimeline";
import WorkCTA from "@/components/work/WorkCTA";
import { CertificateShowcase } from "@/components/work/proof/CertificateShowcase";
import { ProofId } from "@/components/work/proof/ProofId";
import { VerifiedSeal } from "@/components/work/proof/VerifiedSeal";
import { getCertificate, internship } from "@/data/work";
import { Footer } from "@/features/footer";

export const metadata: Metadata = {
  title: `Internship — ${internship.company}`,
  description: `${internship.duration} ${internship.department} internship at ${internship.company}, ${internship.period}.`,
};

export default function InternshipPage() {
  const certificate = getCertificate(internship.certificateId);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <CaseHeader
        chapter="Chapter 01 · Internship"
        crumb="Internship"
        title={["Where the foundation", "was built."]}
        intro={internship.summary}
        aside={<VerifiedSeal size={124} />}
        meta={[
          { label: "Company", value: internship.company },
          { label: "Role", value: internship.role },
          { label: "Period", value: `${internship.start} — ${internship.end}` },
          { label: "Location", value: "Lahore, Pakistan" },
        ]}
      />

      {/* Recognition + certificate */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-deep">
              On record
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[1] sm:text-6xl">
              Certified by <span className="text-accent">{internship.company}.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted sm:text-base">{internship.recognition}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ProofId>No. {internship.certificateNumber}</ProofId>
              <ProofId>{internship.duration}</ProofId>
              <ProofId>{internship.department}</ProofId>
            </div>

            <a
              href={internship.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-sm text-ink underline decoration-accent/40 underline-offset-8 transition hover:decoration-accent"
            >
              digitalbrains.tech <ArrowUpRight size={15} />
            </a>
          </div>

          {certificate && <CertificateShowcase certificate={certificate} tilt={1.2} />}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-tint-soft py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-deep">
              The eight weeks
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[1] sm:text-6xl">
              From onboarding
              <br />
              <span className="text-accent">to delivery.</span>
            </h2>

            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
              Toolkit
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {internship.stack.map((tool) => (
                <li key={tool} className="rounded-full border border-accent/25 bg-surface px-3.5 py-1.5 text-xs text-ink">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <InternshipTimeline />
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <InternshipOutcomes />
        </div>
      </section>

      <WorkCTA />
      <Footer />
    </main>
  );
}
