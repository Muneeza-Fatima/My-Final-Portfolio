import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";

import { CaseHeader } from "@/components/work/CaseHeader";
import { BackBar } from "@/components/work/BackButton";
import WorkCTA from "@/components/work/WorkCTA";
import { MoreProjects } from "@/components/work/crafted/MoreProjects";
import { PortfolioEvolution } from "@/components/work/crafted/PortfolioEvolution";
import { ProjectStack } from "@/components/work/crafted/ProjectStack";
import { Footer } from "@/features/footer";
import { cn } from "@/lib/utils";

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
  dark = false,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  // Light text for sections on the dark (noir) background.
  dark?: boolean;
}) {
  return (
    <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
      <div>
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.35em]",
            dark ? "text-[#b69cff]" : "text-muted",
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]",
            dark && "text-white",
          )}
        >
          {title}{" "}
          <span className={cn("heading-accent", dark ? "text-[#b69cff]" : "text-[#6d5bd0]")}>{accent}</span>
        </h2>
      </div>
      <p className={cn("max-w-md text-sm leading-7 sm:text-[15px]", dark ? "text-white/60" : "text-muted")}>
        {intro}
      </p>
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
            intro="Client builds and standout projects — scroll through each one."
          />
          <ProjectStack />
        </div>
      </section>

      <section className="relative mt-16 overflow-hidden bg-noir py-20 sm:mt-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-64 -top-40 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(closest-side,rgba(109,91,208,0.22),transparent)]"
        />
        <div className={cn(container, "relative")}>
          <SectionHeading
            dark
            eyebrow="More builds"
            title="Smaller projects,"
            accent="big lessons."
            intro="Independent websites and a game — each one live to explore."
          />
          <MoreProjects />
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
