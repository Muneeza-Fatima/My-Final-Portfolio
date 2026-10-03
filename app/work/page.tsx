import type { Metadata } from "next";

import { pageMetadata } from "@/config/seo";

import ProofVault from "@/components/work/ProofVault";
import WorkCategories from "@/components/work/WorkCategories";
import WorkCTA from "@/components/work/WorkCTA";
import { Footer } from "@/features/footer";
import { Projects } from "@/features/projects";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Crafted work, client work and a certified internship — every chapter of Muneeza Fatima's frontend work, backed by documented proof.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="bg-canvas pt-10">
      <WorkCategories />
      <ProofVault />
      <Projects />
      <WorkCTA />
      <Footer />
    </main>
  );
}
