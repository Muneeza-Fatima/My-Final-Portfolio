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
        pointer-events-none
      "
    >

      {/* Purple Aurora Glow */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2

          w-[420px]
          h-[420px]

          rounded-full

          bg-purple-600/40
          blur-[120px]
        "
      />


      {/* Blue Ambient Light */}
      <motion.div
        animate={{
          x: [-50, 60, -20, -50],
          y: [30, -30, 40, 30],
          scale: [1,1.2,1],
        }}
        transition={{
          duration:18,
          repeat:Infinity,
          ease:"easeInOut",
        }}
        className="
          absolute

          top-[40%]
          right-[-120px]

          w-[350px]
          h-[350px]

          rounded-full

          bg-blue-500/30

          blur-[110px]
        "
      />


      {/* Pink Accent Glow */}
      <motion.div
        animate={{
          y:[0,-60,0],
          opacity:[0.5,0.8,0.5],
        }}
        transition={{
          duration:10,
          repeat:Infinity,
          ease:"easeInOut",
        }}
        className="
          absolute

          bottom-20
          left-10

          w-[250px]
          h-[250px]

          rounded-full

          bg-fuchsia-500/30

          blur-[100px]
        "
      />


      {/* Subtle Noise Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-black/10
          to-black/40
        "
      />

    </div>
  );
}