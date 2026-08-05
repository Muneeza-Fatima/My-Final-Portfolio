"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity:0,
        scale:0.96,
      }}

      animate={{
        opacity:1,
        scale:1,
      }}

      transition={{
        duration:0.7,
        ease:[0.22,1,0.36,1],
      }}

      className="
      relative
      flex
      items-center
      justify-center
      pt-6
      sm:pt-8
      lg:pt-0
      "

    >


      {/* Glow */}

      <div

        className="
        absolute
        -inset-10
        rounded-full
        bg-gradient-to-r
        from-blue-500/30
        via-purple-500/25
        to-pink-500/20
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
          drop-shadow-[0_0_50px_rgba(139,92,246,0.45)]
          "

        />


      </div>


    </motion.div>

  );
}