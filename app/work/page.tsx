import type { Metadata } from "next";

import ProofVault from "@/components/work/ProofVault";
import WorkCategories from "@/components/work/WorkCategories";
import WorkCTA from "@/components/work/WorkCTA";
import { Footer } from "@/features/footer";
import { Projects } from "@/features/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Internship, demo projects and client work — each chapter backed by documented proof.",
};

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
