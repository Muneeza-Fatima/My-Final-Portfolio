"use client";

import { motion } from "framer-motion";


export function ContactBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
    >

      {/* Blue Ambient Glow */}

      <motion.div
        animate={{
          x: [0, 90, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -left-48
          top-10
          h-[550px]
          w-[550px]
          rounded-full
          bg-blue-500/10
          blur-[160px]
        "
      />



      {/* Violet Ambient Glow */}

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}

        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -right-48
          bottom-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-violet-500/10
          blur-[180px]
        "
      />



      {/* Floating Ring */}

      <motion.div
        animate={{
          rotate:360,
          y:[0,-25,0],
        }}

        transition={{
          rotate:{
            duration:30,
            repeat:Infinity,
            ease:"linear",
          },

          y:{
            duration:8,
            repeat:Infinity,
            ease:"easeInOut",
          },
        }}

        className="
          absolute
          left-1/2
          top-32
          h-44
          w-44
          -translate-x-1/2
          rounded-full
          border
          border-white/10
        "
      />



      {/* Soft Grid */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:90px_90px]
          opacity-20
        "
      />


    </div>
  );
}