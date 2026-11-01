import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { pageMetadata } from "@/config/seo";

import { BackBar } from "@/components/work/BackButton";
import { CaseHeader } from "@/components/work/CaseHeader";
import WorkCTA from "@/components/work/WorkCTA";
import { BrowserShot, ProjectLinks, Rating } from "@/components/work/crafted/ProjectParts";
import { caseStudyHref, getProject, projects } from "@/data/projects";
import { Footer } from "@/features/footer";

type Props = { params: Promise<{ slug: string }> };

// One page per project, all built at deploy time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Site copy uses dashes for style; summaries and meta read better without.
const plain = (text: string) => text.replace(/\s*—\s*/g, ", ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} Case Study`,
    description: `${plain(project.description)} See the problem, the solution and the result.`,
    path: caseStudyHref(project),
  });
}

const container = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
      <span className="font-mono tracking-normal text-[#6d5bd0]">{number}</span>
      {children}
    </p>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const { caseStudy } = project;
  const isClient = project.type === "Client work";

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <CaseHeader
        chapter={`Case study · ${project.number}`}
        title={[project.title, `${project.category}.`]}
        intro={plain(project.description)}
        meta={[
          { label: "Role", value: project.role },
          { label: "Built for", value: isClient ? "Client" : project.badge ?? "Independent project" },
          { label: "Built with", value: project.tech.slice(0, 3).join(", ") },
          { label: "Status", value: project.rating ? `Live · ${project.rating}/5 rating` : "Live" },
        ]}
      />

      {/* Screenshot and links */}
      <section className="relative overflow-hidden bg-noir py-14 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-60 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,91,208,0.2),transparent)]"
        />
        <div className={`${container} relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14`}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="group block">
            <BrowserShot src={project.image} title={project.title} url={project.liveUrl} />
          </a>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b69cff]">See it live</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Explore {project.title} yourself.
            </h2>
            {project.rating && <Rating value={project.rating} className="mt-4" />}
            <ProjectLinks className="mt-6" title={project.title} liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
          </div>
        </div>
      </section>

      {/* Problem and solution */}
      <section className="py-20 sm:py-28">
        <div className={`${container} space-y-16 sm:space-y-20`}>
          {[
            { number: "01", label: "The problem", heading: "What needed solving", text: caseStudy.problem },
            { number: "02", label: "The solution", heading: "How I solved it", text: caseStudy.solution },
          ].map((block) => (
            <div key={block.number} className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <SectionLabel number={block.number}>{block.label}</SectionLabel>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  {block.heading}
                </h2>
              </div>
              <p className="text-base leading-8 text-ink/80 sm:text-lg sm:leading-9">{block.text}</p>
            </div>
          ))}

          {/* Highlights */}
          <div className="border-t border-line pt-10">
            <SectionLabel number="03">Highlights</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              What I built
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.highlights.map((item, i) => (
                <li key={item} className="rounded-[20px] border border-line bg-surface p-6">
                  <span className="font-mono text-xs text-[#6d5bd0]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-4 text-[15px] font-medium leading-7 text-ink">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Result */}
          <div className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionLabel number="04">The result</SectionLabel>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                Where it landed
              </h2>
            </div>
            <div>
              <p className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold leading-[1.45] tracking-[-0.01em] text-ink">
                {caseStudy.result}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                    {item}
                  </li>
                ))}
              </ul>
              <ProjectLinks
                className="mt-8"
                tone="light"
                title={project.title}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Previous / next project */}
      <nav aria-label="More case studies" className="border-t border-line">
        <div className={`${container} grid gap-4 py-10 sm:grid-cols-2`}>
          {[
            { project: previous, label: "Previous project", Icon: ArrowLeft, align: "" },
            { project: next, label: "Next project", Icon: ArrowRight, align: "sm:text-right sm:items-end" },
          ].map(({ project: item, label, Icon, align }) => (
            <Link
              key={label}
              href={caseStudyHref(item)}
              className={`group flex flex-col gap-2 rounded-[20px] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6d5bd0]/40 ${align}`}
            >
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                {label === "Previous project" && <Icon size={13} />}
                {label}
                {label === "Next project" && <Icon size={13} />}
              </span>
              <span className="font-display text-xl font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-[#6d5bd0]">
                {item.title}
              </span>
              <span className="text-xs text-muted">{item.category}</span>
            </Link>
          ))}
        </div>
      </nav>

      <WorkCTA />
      <BackBar />
      <Footer />
    </main>
  );
}
