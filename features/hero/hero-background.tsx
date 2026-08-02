"use client";

import { motion } from "framer-motion";

const particles = [
  { size: "h-1.5 w-1.5", left: "15%", top: "25%" },
  { size: "h-2 w-2", left: "80%", top: "30%" },
  { size: "h-1 w-1", left: "65%", top: "70%" },
  { size: "h-2 w-2", left: "25%", top: "75%" },
  { size: "h-1.5 w-1.5", left: "90%", top: "60%" },
];

export function HeroBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
        bg-[#050505]
      "
    >
      {/* Blue Glow */}

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-32
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/30
          blur-[110px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Purple Glow */}

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-20
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-purple-600/20
          blur-[100px]
          transform-gpu
          will-change-transform
        "
      />

      {/* Particles */}

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -35, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index,
          }}
          className={`
            absolute
            ${particle.size}
            rounded-full
            bg-white
            transform-gpu
            will-change-transform
          `}
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </div>
  );
}