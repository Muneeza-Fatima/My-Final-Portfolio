import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

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
        chapter="Chapter 03 · Client Work"
        crumb="Client Work"
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
            <a
              href={clientWork.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm text-canvas transition hover:bg-accent-deep"
            >
              Visit bhventures.ae
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </a>
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
      <section className="bg-tint-soft py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
          {testimonial && (
            <figure>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-deep">
                In the client’s words
              </p>
              <blockquote className="mt-6 font-display text-3xl leading-[1.3] text-ink sm:text-4xl">
                <span className="text-accent">&ldquo;</span>
                {testimonial.quote}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 border-t border-accent/20 pt-6">
                <p className="text-sm text-ink">{testimonial.name}</p>
                <p className="text-xs text-muted">
                  {testimonial.role} · {testimonial.company}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
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
