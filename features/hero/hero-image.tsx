"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.96,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
      relative
      flex
      items-center
      justify-center
      pt-6
      sm:pt-8
      md:pt-4
      lg:pt-0
      "

    >


      {/* Glow */}

      <motion.div

        animate={{
          opacity:[0.45,0.7,0.45],
          scale:[1,1.04,1],
        }}

        transition={{
          duration:5,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
        absolute
        -inset-10
        rounded-full
        bg-gradient-to-r
        from-blue-500/40
        via-purple-500/35
        to-pink-500/30
        blur-3xl
        "

      />



      {/* Image */}

      <div

        className="
        relative
        z-10
        w-[330px]
        sm:w-[360px]
        md:w-[370px]
        lg:w-[390px]
        xl:w-[420px]
        "

      >

        <Image

          src="/images/profile.png"

          alt="Muneeza Fatima Frontend Engineer"

          width={700}

          height={700}

          priority

          className="
          h-auto
          w-full
          object-cover
          drop-shadow-[0_0_55px_rgba(139,92,246,0.55)]
          "

        />

      </div>



    </motion.div>

  );
}