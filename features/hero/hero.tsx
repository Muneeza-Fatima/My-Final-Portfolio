
"use client";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroButtons } from "./hero-buttons";
import { HeroBackground } from "./hero-background";
import { HeroTrust } from "./hero-trust";

import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        flex
        items-center
      "
    >
      {/* Background */}
      <HeroBackground />

      <Container>
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            items-center
            gap-8
            py-24
            lg:grid-cols-[1fr_0.95fr]
            lg:gap-10
            lg:py-20
          "
        >
          {/* Image */}
          <div
            className="
              order-1
              relative
              z-0
              flex
              justify-center
              lg:order-2
              lg:justify-end
            "
          >
            <HeroImage />
          </div>

          {/* Content */}
          <div
            className="
              order-2
              relative
              z-10
              max-w-xl
              lg:order-1
            "
          >
            <HeroContent />

            {/* CTA Buttons */}
            <div className="relative z-20 mt-7">
              <HeroButtons />
            </div>

            {/* Trust / Stats Card */}
            <HeroTrust />
          </div>
        </div>
      </Container>
    </section>
  );
}

