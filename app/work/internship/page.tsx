import type { Metadata } from "next";

import { CaseHeader } from "@/components/work/CaseHeader";
import { InternshipOutcomes, InternshipTimeline } from "@/components/work/InternshipTimeline";
import WorkCTA from "@/components/work/WorkCTA";
import { ToolkitChips } from "@/components/work/internship/ToolkitChips";
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
        chapter="Chapter 03 · Internship"
        title={["Where the foundation", "was built."]}
        intro={internship.summary}
        aside={<VerifiedSeal size={84} />}
        meta={[
          { label: "Company", value: internship.company },
          { label: "Role", value: internship.role },
          { label: "Period", value: `${internship.start} — ${internship.end}` },
          { label: "Location", value: "Lahore, Pakistan" },
        ]}
      />

      {/* Recognition + certificate */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
              On record
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Certified by <span className="text-[#6d5bd0]">{internship.company}.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-[15px]">{internship.recognition}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <ProofId>No. {internship.certificateNumber}</ProofId>
              <ProofId>{internship.duration}</ProofId>
              <ProofId>{internship.department}</ProofId>
            </div>
          </div>

          {certificate && (
            <div>
              <CertificateShowcase certificate={certificate} tilt={1.2} />
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-muted">
                Hover to tilt · click to inspect
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-tint-soft py-16 sm:py-20">
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
              The eight weeks
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              From onboarding
              <br />
              <span className="text-[#6d5bd0]">to delivery.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              Eight weeks, two at a time — from first commit to final delivery.
            </p>

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
              Toolkit
            </p>
            <div className="mt-4">
              <ToolkitChips />
            </div>
          </div>

          <InternshipTimeline />
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
            Outcomes
          </p>
          <h2 className="mb-8 mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            What it <span className="text-[#6d5bd0]">added up to.</span>
          </h2>
          <InternshipOutcomes />
        </div>
      </section>

      <WorkCTA />
      <Footer />
    </main>
  );
}
