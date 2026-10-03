import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";

import { CaseHeader } from "@/components/work/CaseHeader";
import { BackBar } from "@/components/work/BackButton";
import WorkCTA from "@/components/work/WorkCTA";
import { PortfolioEvolution } from "@/components/work/crafted/PortfolioEvolution";
import { ProjectStack } from "@/components/work/crafted/ProjectStack";
import { Footer } from "@/features/footer";

export const metadata: Metadata = pageMetadata({
  title: "Crafted Work",
  description:
    "Client builds and independent frontend projects by Muneeza Fatima — portfolios, e-commerce, healthcare and more, each one live to explore.",
  path: "/work/demo-projects",
});

function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
}) {
  return (
    <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {title} <span className="heading-accent text-[#6d5bd0]">{accent}</span>
        </h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-muted sm:text-[15px]">{intro}</p>
    </div>
  );
}

const container = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12";

export default function DemoProjectsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <CaseHeader
        chapter="Chapter 01 · Crafted Work"
        title={["Selected projects.", "Built to be used."]}
        intro="Client builds and independent projects — responsive interfaces, thoughtful UX and interaction, each one live to explore."
        meta={[
          { label: "Status", value: "All live" },
          { label: "Built for", value: "Clients & practice" },
          { label: "Focus", value: "UI & interaction" },
        ]}
      />

      <section className="pt-16 sm:pt-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects,"
            accent="real launches."
            intro="Client builds first, then independent projects — scroll through each one."
          />
          <ProjectStack />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            eyebrow="Portfolio evolution"
            title="How my portfolio"
            accent="grew."
            intro="Every version of my own portfolio, from the first page I built to the site you're on now."
          />
          <PortfolioEvolution />
        </div>
      </section>

      <WorkCTA />
      <BackBar />
      <Footer />
    </main>
  );
}
