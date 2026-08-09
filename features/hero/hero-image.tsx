"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroImage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        flex
        justify-center
        items-center
      "
    >

      {/* Static Premium Border Shine */}
      <div
        className="
          absolute
          -inset-[2px]
          rounded-[32px]

          bg-gradient-to-r
          from-white/40
          via-blue-400/40
          to-purple-400/40

          opacity-80
        "
      />

      {/* Image Card */}
      <div
        className="
          relative
          z-10

          overflow-hidden
          rounded-[30px]

          bg-black

          w-[280px]
          sm:w-[330px]
          md:w-[370px]
          lg:w-[350px]
          xl:w-[380px]
        "
      >
        <Image
          src="/images/profile.png"
          alt="Muneeza Fatima Frontend Engineer"
          width={700}
          height={700}
          priority
          className="
            block
            w-full
            h-auto
            object-cover
          "
        />
      </div>

    </motion.div>
  );
}