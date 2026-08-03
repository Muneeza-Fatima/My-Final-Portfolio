"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { HeroBackground } from "./hero-background";
import { HeroButtons } from "./hero-buttons";
import { HeroImage } from "./hero-image";
import { HeroTrust } from "./hero-trust";


export function Hero() {

  return (

    <Section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050816]

        pt-28
        pb-16

        md:pt-32
      "
    >

      <HeroBackground />


      <Container>

        <div
          className="
            relative
            z-10

            flex
            flex-col
            items-center

            text-center
          "
        >


          {/* Badge */}

          <motion.div

            initial={{
              opacity:0,
              y:15,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            transition={{
              duration:0.6,
            }}

            className="
              flex
              max-w-full
              items-center
              justify-center

              rounded-full

              border
              border-white/10

              bg-white/5

              px-4
              py-2

              text-center

              text-[10px]

              uppercase

              tracking-[0.18em]

              text-neutral-300

              backdrop-blur-xl

              whitespace-normal

              sm:px-5
              sm:text-[11px]
              sm:tracking-[0.25em]
            "

          >

            <span>
              ✦ Available for freelance projects
            </span>

          </motion.div>





          {/* Heading */}

          <motion.h1

            initial={{
              opacity:0,
              y:25,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            transition={{
              duration:0.8,
              delay:0.1,
            }}

            className="
              mt-8

              max-w-4xl

              text-[42px]

              font-bold

              leading-[1.05]

              tracking-tight

              text-white

              sm:text-6xl

              md:text-7xl
            "

          >

            Turning ideas 

            <br />


            <span
              className="
                bg-gradient-to-r

                from-blue-400

                via-purple-400

                to-white

                bg-clip-text

                text-transparent
              "
            >

              into immersive

            </span>


            <br />


            digital experiences.


          </motion.h1>





          {/* Description */}

          <motion.p

            initial={{
              opacity:0,
              y:20,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            transition={{
              delay:0.25,
            }}

            className="
              mt-6

              max-w-xl

              text-sm

              leading-relaxed

              text-neutral-400

              sm:text-base

              md:text-lg
            "

          >

            I create elegant, responsive websites where thoughtful design meets powerful frontend engineering.

          </motion.p>





          {/* Buttons */}

          <motion.div

            initial={{
              opacity:0,
              y:20,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            transition={{
              delay:0.4,
            }}

            className="
              mt-8

              w-full

              flex

              justify-center
            "

          >

            <HeroButtons />

          </motion.div>





          {/* Image */}

          <motion.div

            initial={{
              opacity:0,
              scale:0.95,
              y:30,
            }}

            animate={{
              opacity:1,
              scale:1,
              y:0,
            }}

            transition={{
              duration:0.8,
              delay:0.5,
            }}

            className="
              mt-12

              flex

              justify-center
            "

          >

            <HeroImage />

          </motion.div>





          {/* Stats */}

          <HeroTrust />


        </div>


      </Container>


    </Section>

  );

}