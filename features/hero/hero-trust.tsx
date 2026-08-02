"use client";

import { motion } from "framer-motion";


const stats = [
  {
    value: "2+",
    title: "Years",
    description: "Learning & Building",
  },
  {
    value: "10+",
    title: "Projects",
    description: "Completed",
  },
  {
    value: "Frontend",
    title: "Focused",
    description: "Development",
  },
];


export function HeroTrust() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
      className="
        mt-10
        grid
        grid-cols-3
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-4
        py-5
        backdrop-blur-xl
        text-center
      "
    >

      {stats.map((stat) => (

        <motion.div
          key={stat.title}
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            flex
            flex-col
            items-center
          "
        >

          <h3
            className="
              text-xl
              font-semibold
              text-white
              md:text-2xl
            "
          >
            {stat.value}
          </h3>


          <p
            className="
              mt-1
              text-sm
              text-neutral-300
            "
          >
            {stat.title}
          </p>


          <p
            className="
              text-xs
              text-neutral-500
            "
          >
            {stat.description}
          </p>

        </motion.div>

      ))}

    </motion.div>
  );
}