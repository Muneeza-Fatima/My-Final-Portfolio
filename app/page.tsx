import { About } from "@/features/about";
import { Contact } from "@/features/contact";
import { Faq } from "@/features/faq";
import { Footer } from "@/features/footer";
import { Hero } from "@/features/hero";
import { Services } from "@/features/services";

import ProofVault from "@/components/work/ProofVault";
import WorkCategories from "@/components/work/WorkCategories";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WorkCategories />
      <ProofVault />
      <Faq />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
