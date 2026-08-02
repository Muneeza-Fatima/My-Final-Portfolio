"use client";

import { motion } from "framer-motion";


export function ServicesBackground() {
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

      {/* Blue Glow */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -left-40
          top-20
          h-[520px]
          w-[520px]
          rounded-full
          bg-blue-500/10
          blur-[150px]
        "
      />



      {/* Violet Glow */}

      <motion.div
        animate={{
          x: [0, -90, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}

        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          -right-40
          top-1/3
          h-[600px]
          w-[600px]
          rounded-full
          bg-violet-500/10
          blur-[170px]
        "
      />



      {/* Floating Orb */}

      <motion.div
        animate={{
          y:[0,-30,0],
          rotate:[0,180,360],
        }}

        transition={{
          duration:20,
          repeat:Infinity,
          ease:"linear",
        }}

        className="
          absolute
          left-1/2
          top-20
          h-40
          w-40
          rounded-full
          border
          border-white/10
          bg-white/[0.02]
          blur-[1px]
        "
      />



      {/* Subtle Grid */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:80px_80px]
          opacity-20
        "
      />


    </div>
  );
}