"use client";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroButtons } from "./hero-buttons";
import { HeroBackground } from "./hero-background";

import { Container } from "@/components/ui/container";


export function Hero() {

  return (

    <section

      className="
      relative
      overflow-hidden
      pt-[125px]
      pb-10
      sm:pt-[135px]
      md:pt-[140px]
      lg:pt-[130px]
      "

    >

      <HeroBackground />


      <Container>


        <div

          className="
          grid
          grid-cols-1
          items-center
          gap-8
          lg:grid-cols-[1.1fr_0.9fr]
          lg:gap-3
          "

        >



          {/* IMAGE */}

          <div

            className="
            order-1
            flex
            justify-center
            lg:order-2
            lg:justify-end
            lg:-translate-x-8
            lg:-translate-y-6
            "

          >

            <HeroImage />

          </div>





          {/* CONTENT */}

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


            <div className="mt-6">

              <HeroButtons />

            </div>


          </div>



        </div>


      </Container>


    </section>

  );
}