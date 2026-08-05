"use client";

import { motion } from "framer-motion";


export function HeroContent() {

  const lines = [
    "Building Digital",
    "Experiences",
    "With Code &",
    "Creativity",
  ];


  const stats = [
    {
      number: "10+",
      title: "Projects Completed",
    },
    {
      number: "2+",
      title: "Years Learning",
    },
    {
      number: "React",
      title: "Frontend Development",
    },
  ];



  return (
    <div className="max-w-lg">


      {/* Label */}

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
          duration:0.5,
        }}

        className="
        mb-4
        text-xs
        uppercase
        tracking-[0.35em]
        text-blue-400
        "
      >
        Frontend Engineer
      </motion.p>



      {/* Heading */}

      <h1
        className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-5xl
        font-bold
        leading-[1.05]
        tracking-tight
        "
      >

        {lines.map((line,index)=>(

          <motion.div

            key={line}

            initial={{
              opacity:0,
              y:45,
              filter:"blur(8px)",
            }}

            animate={{
              opacity:1,
              y:0,
              filter:"blur(0px)",
            }}

            transition={{
              duration:0.7,
              delay:index * 0.2,
              ease:[0.22,1,0.36,1],
            }}

            className={`
            block

            ${
              index >= 2
              ?
              "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              :
              "text-white"
            }

            `}
          >

            {line}

          </motion.div>

        ))}

      </h1>




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
          delay:1,
          duration:0.6,
        }}

        className="
        mt-5
        max-w-md
        text-base
        leading-relaxed
        text-white/60
        "
      >

        I create responsive and interactive websites that combine
        modern UI design, clean code, and smooth user experiences.
        My focus is building fast, scalable, and visually engaging
        digital products.

      </motion.p>




      {/* Stats Cards */}

      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          delay:1.3,
          duration:0.6,
        }}

        className="
        mt-6
        grid
        grid-cols-3
        gap-3
        "
      >

        {stats.map((item)=>(


          <div

            key={item.title}

            className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            p-4
            backdrop-blur-xl
            "
          >


            {/* Glow */}

            <div

              className="
              absolute
              inset-0
              -z-10
              bg-gradient-to-br
              from-blue-500/30
              via-purple-500/20
              to-pink-500/20
              blur-xl
              opacity-70
              transition
              duration-500
              group-hover:opacity-100
              "

            />



            <h3

              className="
              text-xl
              font-bold
              text-white
              "
            >

              {item.number}

            </h3>



            <p

              className="
              mt-1
              text-xs
              leading-relaxed
              text-white/60
              "
            >

              {item.title}

            </p>



          </div>


        ))}


      </motion.div>


    </div>
  );
}