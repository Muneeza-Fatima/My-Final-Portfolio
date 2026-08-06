"use client";

import { motion } from "framer-motion";


const titleLines = [
  "Building Digital",
  "Experiences With",
  "Code & Creativity",
];


export function HeroContent() {


  return (

    <div className="space-y-6">


      {/* Small Label */}

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
          duration:0.6,
        }}

        className="
          text-sm
          uppercase
          tracking-[0.3em]
          text-violet-400
        "

      >

        Frontend Engineer

      </motion.p>





      {/* Heading */}

      <h1

        className="
          text-4xl

          font-bold

          leading-[1.05]

          tracking-tight

          text-white


          sm:text-5xl


          lg:text-6xl

        "

      >

        {titleLines.map((line,index)=>(

          <motion.span

            key={line}

            initial={{
              opacity:0,
              y:30,
              filter:"blur(8px)",
            }}

            animate={{
              opacity:1,
              y:0,
              filter:"blur(0px)",
            }}

            transition={{
              duration:0.7,

              delay:index * 0.15,

              ease:[0.22,1,0.36,1],
            }}

            className="
              block
            "

          >

            {line}

          </motion.span>

        ))}


      </h1>





      {/* Description */}

      <motion.p

        initial={{
          opacity:0,
          y:25,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          duration:0.7,
          delay:0.5,
        }}

        className="
          max-w-lg

          text-base

          leading-relaxed

          text-neutral-400


          sm:text-lg

        "

      >

        I create modern, responsive and interactive websites
        using React, Next.js and modern frontend technologies.
        Turning ideas into fast, beautiful digital experiences.

      </motion.p>




      {/* Stats */}

      <motion.div

        initial={{
          opacity:0,
          y:25,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          duration:0.7,
          delay:0.7,
        }}

        className="
          grid

          grid-cols-3

          gap-4

          pt-4

        "

      >


        <div>

          <h3 className="
            text-xl
            font-bold
            text-white
          ">
            10+
          </h3>

          <p className="
            text-xs
            text-neutral-500
          ">
            Projects
          </p>

        </div>



        <div>

          <h3 className="
            text-xl
            font-bold
            text-white
          ">
            2+
          </h3>

          <p className="
            text-xs
            text-neutral-500
          ">
            Years Learning
          </p>

        </div>



        <div>

          <h3 className="
            text-xl
            font-bold
            text-white
          ">
            React
          </h3>

          <p className="
            text-xs
            text-neutral-500
          ">
            Development
          </p>

        </div>


      </motion.div>


    </div>

  );

}