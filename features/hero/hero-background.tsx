"use client";

import { motion } from "framer-motion";


export function HeroBackground() {

  return (

    <div
      className="
      absolute
      inset-0
      -z-10
      overflow-hidden
      "
    >


      {/* Main Blue Glow */}

      <div

        className="
        absolute
        -top-40
        left-1/2
        -translate-x-1/2
        h-[450px]
        w-[450px]
        rounded-full
        bg-blue-500/20
        blur-[120px]
        "

      />



      {/* Moving Purple Glow */}

      <motion.div

        animate={{
          x:[0,30,0],
          y:[0,20,0],
        }}

        transition={{
          duration:14,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
        absolute
        right-[-120px]
        top-[25%]
        h-[350px]
        w-[350px]
        rounded-full
        bg-purple-500/20
        blur-[100px]
        "

      />



      {/* Bottom Soft Glow */}

      <div

        className="
        absolute
        bottom-[-120px]
        left-[20%]
        h-[300px]
        w-[300px]
        rounded-full
        bg-pink-500/10
        blur-[100px]
        "

      />


    </div>

  );
}