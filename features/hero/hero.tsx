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
      transform-gpu
      pt-[130px]
      sm:pt-[135px]
      md:pt-[140px]
      lg:pt-[120px]
      pb-16
      "
    >

      <HeroBackground />


      <Container>

        <div
          className="
          grid
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1fr_0.9fr]
          lg:gap-8
          xl:gap-10
          "
        >


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


            <div className="mt-7">

              <HeroButtons />

            </div>


          </div>



          {/* Image */}

          <div
            className="
            order-1
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