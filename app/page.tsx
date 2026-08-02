import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Projects } from "@/features/projects";
import { Services } from "@/features/services";
import { Contact } from "@/features/contact";
import { Footer } from "@/features/footer";


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Services/>
      <Contact/>
      <Footer/>
    </main>
  );
}