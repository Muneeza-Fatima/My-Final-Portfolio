"use client";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroButtons } from "./hero-buttons";
import { HeroBackground } from "./hero-background";

import { Container } from "@/components/ui/container";


export function Hero() {

  return (

    <section
      id="home"
      className="
      relative
      min-h-screen
      overflow-hidden
      pt-[120px]
      sm:pt-[125px]
      md:pt-[130px]
      lg:pt-[115px]
      pb-16
      "
    >

      {/* Background */}
      <HeroBackground />


      <Container>

        <div
          className="
          grid
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1fr_0.95fr]
          lg:gap-8
          xl:gap-12
          "
        >


          {/* LEFT CONTENT */}

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


            <div
              className="
              mt-7
              "
            >

              <HeroButtons />

            </div>


          </div>




          {/* RIGHT IMAGE */}

          <div
            className="
            order-1
            relative
            flex
            justify-center
            lg:order-2
            lg:justify-end
            "
          >

            <HeroImage />

          </div>



        </div>


      </Container>


    </section>

  );
}