"use client";

import { motion } from "framer-motion";


const stats = [
  {
    value: "10+",
    label: "Projects",
  },
  {
    value: "2+",
    label: "Years Building",
  },
  {
    value: "React",
    label: "Frontend",
  },
];


export function HeroTrust() {

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
        delay:.5,
      }}

      className="
        mt-10

        grid
        grid-cols-3

        gap-4

        border-t
        border-white/10

        pt-8

        w-full

      "

    >

      {stats.map((item)=>(

        <div
          key={item.label}
          className="
            text-center
            min-w-0
          "
        >

          <h3
            className="
              text-lg
              sm:text-xl
              font-bold
              text-white
              truncate
            "
          >
            {item.value}
          </h3>


          <p
            className="
              mt-1
              text-[10px]
              sm:text-xs
              uppercase
              tracking-wider
              text-neutral-500
              whitespace-nowrap
            "
          >
            {item.label}
          </p>


        </div>

      ))}


    </motion.div>

  );
}