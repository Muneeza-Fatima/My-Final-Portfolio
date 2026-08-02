"use client";

import { motion } from "framer-motion";

import { profile } from "@/data/profile";

import { HeroModel as LazyHeroModel } from "@/components/three/lazy-hero-model";

import { Particles } from "@/components/effects/particles";
import { HeroGlow } from "@/components/effects/hero-glow";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { FadeIn } from "@/components/motion/fade-in";

import {
  Stagger,
  StaggerItem,
} from "@/components/motion/stagger";


export function Hero() {

  return (

    <Section

      id="home"

      className="
        relative
        pt-36
        md:pt-32
      "

    >

      <HeroGlow />

      <Particles />


      <Container>


        <div

          className="
            grid
            items-center
            gap-14
            pt-10
            lg:grid-cols-2
          "

        >


          {/* CONTENT */}

          <div>


            <FadeIn>


              <p
                className="
                  mb-6
                  inline-flex
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2
                  text-sm
                  text-muted
                  backdrop-blur-md
                "
              >
                Available for freelance opportunities
              </p>



              <h1
                className="
                  max-w-3xl
                  text-4xl
                  font-bold
                  leading-tight
                  sm:text-5xl
                  md:text-7xl
                "
              >

                Designing

                <span className="text-primary">
                  {" "}
                  beautiful
                </span>

                <br />

                digital experiences.

              </h1>



              <p

                className="
                  mt-6
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-muted
                  md:text-lg
                "

              >

                {profile.description}

              </p>



              <div

                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-4
                "

              >

                <Button>
                  View My Work
                </Button>


                <Button variant="secondary">
                  Contact Me
                </Button>


              </div>


            </FadeIn>




            <Stagger>


              <div

                className="
                  mt-10
                  grid
                  grid-cols-3
                  gap-3
                  md:mt-14
                  md:gap-4
                "

              >

                {profile.stats.map((stat)=>(


                  <StaggerItem

                    key={stat.label}

                  >


                    <div

                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-3
                        backdrop-blur-md
                        md:p-4
                      "

                    >

                      <h3

                        className="
                          text-xl
                          font-bold
                          md:text-2xl
                        "

                      >

                        {stat.value}

                      </h3>


                      <p

                        className="
                          mt-1
                          text-xs
                          text-muted
                        "

                      >

                        {stat.label}

                      </p>


                    </div>


                  </StaggerItem>


                ))}

              </div>


            </Stagger>


          </div>




          {/* MODEL */}


          <motion.div

            initial={{
              opacity:0,
              scale:0.95,
            }}

            whileInView={{
              opacity:1,
              scale:1,
            }}

            viewport={{
              once:true,
            }}

            transition={{
              duration:0.5,
            }}

            className="
              flex
              justify-center
            "

          >

            <LazyHeroModel />

          </motion.div>



        </div>


      </Container>


    </Section>

  );

}