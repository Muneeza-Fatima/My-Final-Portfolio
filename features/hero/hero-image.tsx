"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroImage() {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        relative
        mt-4
        flex
        items-center
        justify-center
        md:mt-6
        lg:mt-0
      "
    >
      {/* Soft Outer Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />

      {/* Premium Gradient Ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          -inset-2
          rounded-full
          bg-gradient-to-r
          from-blue-500
          via-purple-500
          to-pink-500
          opacity-40
          blur-sm
        "
      />

      {/* Glass Border Ring */}
      <div
        className="
          absolute
          -inset-4
          rounded-full
          border
          border-white/10
        "
      />

      {/* Image */}
      <div
        className="
          relative
          h-[250px]
          w-[250px]
          overflow-hidden
          rounded-full
          border
          border-white/20
          shadow-2xl
          md:h-[340px]
          md:w-[340px]
          lg:h-[360px]
          lg:w-[360px]
        "
      >
        <Image
          src="/images/profile.png"
          alt="Muneeza Fatima"
          fill
          priority
          sizes="(max-width: 768px) 250px, 360px"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}