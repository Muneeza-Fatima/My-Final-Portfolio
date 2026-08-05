"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.95,
        y: 30,
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}

      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
      relative
      w-full
      max-w-[360px]
      sm:max-w-[400px]
      lg:max-w-[410px]
      "
    >


      {/* Glow */}

      <div

        className="
        absolute
        -inset-8
        rounded-full
        bg-gradient-to-r
        from-blue-500/30
        via-purple-500/30
        to-pink-500/20
        blur-3xl
        "

      />



      {/* Image Card */}

      <div

        className="
        relative
        aspect-square
        overflow-hidden
        rounded-[2.5rem]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        "

      >

        <Image

          src="/images/profile.png"

          alt="Frontend Engineer"

          fill

          priority

          sizes="
          (max-width:640px) 360px,
          (max-width:1024px) 400px,
          410px
          "

          className="
          object-cover
          object-center
          "

        />


      </div>


    </motion.div>

  );
}