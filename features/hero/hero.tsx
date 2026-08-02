"use client";

import { useRef, useEffect, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { HeroBackground } from "./hero-background";
import { HeroButtons } from "./hero-buttons";
import { HeroImage } from "./hero-image";
import { HeroTrust } from "./hero-trust";


export function Hero() {

  const heroRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };

  }, []);



  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset:[
      "start start",
      "end start",
    ],
  });



  const textY = useTransform(
    scrollYProgress,
    [0,0.7],
    [0,0]
  );


  const textOpacity = useTransform(
    scrollYProgress,
    [0,0.7],
    [1,1]
  );



  const imageY = useTransform(
    scrollYProgress,
    [0,0.8],
    isMobile
      ? [0,0]
      : [80,-80]
  );



  const imageScale = useTransform(
    scrollYProgress,
    [0,0.7],
    isMobile
      ? [1,1]
      : [0.92,1]
  );



  return (

    <Section
      id="home"
      className="
        relative
        bg-[#050505]
        py-0
        min-h-[105vh]
        md:min-h-[120vh]
        lg:min-h-[125vh]
        xl:min-h-[130vh]
      "
    >


      <HeroBackground />



      {!isMobile && (

        <motion.div

          animate={{
            scale:[
              1,
              1.15,
              1,
            ],

            opacity:[
              0.18,
              0.35,
              0.18,
            ],
          }}

          transition={{
            duration:8,
            repeat:Infinity,
            ease:"easeInOut",
          }}

          className="
            absolute
            left-1/2
            top-1/3
            -translate-x-1/2
            h-96
            w-96
            rounded-full
            bg-purple-500/20
            blur-3xl
          "

        />

      )}





      <div
        ref={heroRef}
        className="
          relative
          z-20
        "
      >


        <Container>


          <div
            className="
              flex
              min-h-screen
              items-start
              justify-center
              pt-40
              pb-12
              md:pt-32
              md:pb-0
              lg:items-center
              lg:justify-between
            "
          >



            <div
              className="
                flex
                w-full
                flex-col
                items-center
                text-center
              "
            >



              <motion.div

                style={{
                  y:textY,
                  opacity:textOpacity,
                }}

                className="
                  relative
                  z-30
                  w-full
                "

              >



                <motion.p

                  initial={false}

                  animate={{
                    opacity:1,
                    y:0,
                  }}

                  className="
                    mb-4
                    text-sm
                    uppercase
                    tracking-[0.35em]
                    text-blue-400
                  "

                >
                  Hello, I&apos;m
                </motion.p>




                <motion.h1

                  initial={{
                    opacity:0,
                    y:30,
                  }}

                  animate={{
                    opacity:1,
                    y:0,
                  }}

                  transition={{
                    duration:0.9,
                  }}

                  className="
                    text-4xl
                    font-bold
                    text-white
                    sm:text-6xl
                    md:text-7xl
                    lg:text-8xl
                  "

                >
                  Muneeza Fatima
                </motion.h1>





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
                    mx-auto
                    mt-5
                    max-w-2xl
                    text-base
                    text-neutral-400
                    sm:text-lg
                    lg:max-w-3xl
                    lg:text-xl
                  "

                >

                  Frontend Developer crafting modern
                  responsive websites, interactive digital
                  experiences that help businesses grow online.

                </motion.p>



              </motion.div>






              <motion.div

                style={{
                  y:imageY,
                  scale:imageScale,
                }}


                initial={{
                  opacity:0,
                  scale:0.92,
                  y:50,
                }}


                animate={{
                  opacity:1,
                  scale:1,
                  y:0,
                }}


                transition={{

                  duration:
                    isMobile ? 0.5 : 1.3,

                  delay:
                    isMobile ? 0 : 0.9,

                  ease:"easeOut",

                }}


                className="
                  mt-10
                  flex
                  flex-col
                  items-center
                  md:mt-12
                  lg:mt-8
                  xl:mt-10
                "

              >



                <HeroImage />



                <div className="mt-12 lg:mt-14">
                  <HeroButtons />
                </div>



                <div className="mt-10 lg:mt-12">
                  <HeroTrust />
                </div>



              </motion.div>




            </div>



          </div>


        </Container>


      </div>


    </Section>

  );

}