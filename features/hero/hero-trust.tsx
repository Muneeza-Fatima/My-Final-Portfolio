"use client";

import { motion } from "framer-motion";


const stats = [

  {
    value:"10+",
    label:"Projects",
  },

  {
    value:"2+",
    label:"Years Building",
  },

  {
    value:"React",
    label:"Frontend",
  },

];



export function HeroTrust(){

  return (

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
        delay:1.2,
        duration:.6,
      }}

      className="
        mt-10

        grid

        w-full

        max-w-xl

        grid-cols-3

        gap-3

        border-t

        border-white/10

        pt-7

      "

    >



      {stats.map((item,index)=>(


        <motion.div

          key={item.label}

          initial={{
            opacity:0,
            y:15,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            delay:
              1.3 +
              index * .15,
          }}

          className="
            text-center
          "

        >


          <h3

            className="
              text-base

              font-bold

              text-white

              sm:text-xl
            "

          >

            {item.value}

          </h3>



          <p

            className="
              mt-1

              text-[9px]

              uppercase

              tracking-widest

              text-neutral-500

              sm:text-xs
            "

          >

            {item.label}

          </p>


        </motion.div>


      ))}



    </motion.div>

  );

}