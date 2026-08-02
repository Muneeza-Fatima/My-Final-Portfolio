"use client";

import { motion } from "framer-motion";


export function ProjectsBackground(){

  return(
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
    >

      <motion.div
        animate={{
          x:[0,80,0],
          y:[0,-40,0],
        }}
        transition={{
          duration:22,
          repeat:Infinity,
          ease:"easeInOut",
        }}
        className="
          absolute
          left-[-200px]
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/10
          blur-[160px]
        "
      />


      <motion.div
        animate={{
          x:[0,-70,0],
          y:[0,50,0],
        }}
        transition={{
          duration:25,
          repeat:Infinity,
          ease:"easeInOut",
        }}
        className="
          absolute
          right-[-200px]
          bottom-20
          h-[550px]
          w-[550px]
          rounded-full
          bg-indigo-500/10
          blur-[170px]
        "
      />

    </div>
  );
}