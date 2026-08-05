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
      pt-[145px]
      pb-8
      sm:pt-[130px]
      md:pt-[140px]
      lg:pt-[130px]
      "

    >

      {/* Background */}

      <HeroBackground />



      <Container>


        <div

          className="
          grid
          grid-cols-1
          lg:grid-cols-[1.1fr_0.9fr]
          items-center
          gap-8
          lg:gap-3
          "

        >



          {/* IMAGE */}

          <div

            className="
            order-1
            lg:order-2
            relative
            flex
            justify-center
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
            lg:order-1
            relative
            z-10
            max-w-xl
            "

          >

            <HeroContent />



            <div className="mt-5">

              <HeroButtons />

            </div>


          </div>



        </div>


      </Container>


    </section>

  );
}