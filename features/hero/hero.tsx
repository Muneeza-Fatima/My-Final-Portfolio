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
        min-h-[100svh]
        overflow-hidden

        pt-[140px]

        sm:pt-[150px]

        md:pt-[130px]

        lg:pt-[120px]

        pb-12
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


            lg:grid-cols-[1fr_0.95fr]


            lg:gap-8

          "

        >



          {/* Mobile First Image */}

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



            <div

              className="
                mt-7
              "

            >

              <HeroButtons />

            </div>


          </div>



        </div>


      </Container>


    </section>

  );

}