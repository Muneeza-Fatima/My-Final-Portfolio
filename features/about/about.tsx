"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { AboutBackground } from "./about-background";


const focusAreas = [
  {
    label: "Frontend Engineering",
    value: "90%",
  },
  {
    label: "UI Implementation",
    value: "85%",
  },
  {
    label: "Interactive Motion",
    value: "75%",
  },
];


const highlights = [
  {
    icon: Code2,
    title: "Clean Development",
    text:
      "Writing scalable and maintainable frontend solutions.",
  },
  {
    icon: Layers3,
    title: "Thoughtful Interfaces",
    text:
      "Creating designs that feel simple and intuitive.",
  },
  {
    icon: Sparkles,
    title: "Digital Experiences",
    text:
      "Adding motion and interaction that improves usability.",
  },
];


export function About() {
  return (
    <Section
      id="about"
      className="
        relative
        overflow-hidden
        py-24
        md:py-36
      "
    >

      <AboutBackground />


      <Container>

        <div
          className="
            grid
            gap-16
            lg:grid-cols-2
            lg:gap-20
            lg:items-center
          "
        >


          {/* Content */}

          <motion.div
            initial={{
              opacity:0,
              y:30,
            }}
            whileInView={{
              opacity:1,
              y:0,
            }}
            viewport={{
              once:true,
              amount:0.3,
            }}
            transition={{
              duration:0.7,
              ease:"easeOut",
            }}
          >

            <p
              className="
                text-sm
                uppercase
                tracking-[0.35em]
                text-blue-300/80
              "
            >
              About Me
            </p>


            <h2
              className="
                mt-5
                max-w-xl
                text-4xl
                font-semibold
                leading-[1.05]
                tracking-tight
                text-white
                md:text-6xl
              "
            >
              Building digital experiences where{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-white
                  via-slate-200
                  to-blue-300
                  bg-clip-text
                  text-transparent
                "
              >
                design meets engineering.
              </span>

            </h2>


            <p
              className="
                mt-7
                max-w-lg
                text-lg
                leading-relaxed
                text-white/60
              "
            >
              I’m Muneeza Fatima, a Frontend Engineer
              focused on creating responsive,
              interactive and high-quality web
              experiences. I enjoy transforming ideas
              into clean interfaces with attention to
              performance, usability and detail.
            </p>


          </motion.div>





          {/* Profile Card */}


          <motion.div
            initial={{
              opacity:0,
              y:30,
            }}
            whileInView={{
              opacity:1,
              y:0,
            }}
            viewport={{
              once:true,
              amount:0.3,
            }}
            transition={{
              duration:0.8,
            }}

            className="
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.04]
              p-7
              backdrop-blur-xl
              shadow-[0_25px_80px_rgba(0,0,0,0.35)]
              transition
              duration-500
              hover:border-white/20
            "
          >


            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Engineering Journey
            </p>



            <div
              className="
                mt-7
                grid
                grid-cols-2
                gap-4
              "
            >


              {[
                {
                  number:"10+",
                  label:"Projects Built",
                },
                {
                  number:"2+",
                  label:"Years Learning",
                },
              ].map((item)=>(
                <div
                  key={item.label}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                    transition
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  <h3
                    className="
                      text-4xl
                      font-semibold
                      text-white
                    "
                  >
                    {item.number}
                  </h3>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-white/50
                    "
                  >
                    {item.label}
                  </p>

                </div>
              ))}


            </div>





            {/* Focus Bars */}


            <div className="mt-10">


              <p
                className="
                  mb-6
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Current Focus
              </p>



              <div className="space-y-6">


                {focusAreas.map((item)=>(
                  <div
                    key={item.label}
                  >

                    <div
                      className="
                        mb-2
                        flex
                        justify-between
                        text-sm
                        text-white/70
                      "
                    >

                      <span>
                        {item.label}
                      </span>


                      <span>
                        {item.value}
                      </span>

                    </div>


                    <div
                      className="
                        h-1.5
                        overflow-hidden
                        rounded-full
                        bg-white/10
                      "
                    >

                      <motion.div
                        initial={{
                          width:0,
                        }}
                        whileInView={{
                          width:item.value,
                        }}
                        viewport={{
                          once:true,
                        }}
                        transition={{
                          duration:1.2,
                          ease:"easeOut",
                        }}
                        className="
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-blue-300
                          to-indigo-400
                        "
                      />

                    </div>


                  </div>
                ))}


              </div>


            </div>


          </motion.div>


        </div>





        {/* Values */}


        <div
          className="
            mt-24
            grid
            gap-5
            md:grid-cols-3
          "
        >


          {highlights.map((item,index)=>{

            const Icon=item.icon;


            return (

              <motion.div

                key={item.title}

                initial={{
                  opacity:0,
                  y:30,
                }}

                whileInView={{
                  opacity:1,
                  y:0,
                }}

                viewport={{
                  once:true,
                  amount:0.3,
                }}

                transition={{
                  duration:0.6,
                  delay:index*0.12,
                }}

                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-7
                  backdrop-blur-xl
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-300/30
                "
              >


                <Icon
                  size={26}
                  className="text-blue-300"
                />


                <h3
                  className="
                    mt-6
                    text-xl
                    font-medium
                    text-white
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    mt-3
                    leading-relaxed
                    text-white/60
                  "
                >
                  {item.text}
                </p>


              </motion.div>

            );

          })}


        </div>


      </Container>


    </Section>
  );
}