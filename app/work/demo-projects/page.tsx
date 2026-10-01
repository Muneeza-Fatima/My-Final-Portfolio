import type { Metadata } from "next";

import { CaseHeader } from "@/components/work/CaseHeader";
import WorkCTA from "@/components/work/WorkCTA";
import { projects } from "@/data/projects";
import { Footer } from "@/features/footer";
import { ProjectCard } from "@/features/projects/projects-card";

export const metadata: Metadata = {
  title: "Crafted Work",
  description: "Independent frontend builds exploring interfaces, interaction and craft.",
};

export default function DemoProjectsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <CaseHeader
        chapter="Chapter 01 · Crafted Work"
        title={["Selected projects.", "Built to explore."]}
        intro="Frontend projects focused on responsive interfaces, thoughtful UX, interactive experiences and modern development practice — each one live and open source."
        meta={[
          { label: "Projects", value: String(projects.length).padStart(2, "0") },
          { label: "Status", value: "Live" },
          { label: "Source", value: "Open on GitHub" },
          { label: "Focus", value: "UI & interaction" },
        ]}
      />

      <section className="py-24 sm:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-28 px-5 sm:px-8 lg:px-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <WorkCTA />
      <Footer />
    </main>
  );
}
