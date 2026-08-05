"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
        scale: 0.94,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      }}

      className="
      relative
      flex
      items-center
      justify-center
      pt-4
      sm:pt-6
      lg:pt-0
      "

    >


      {/* Animated Glow */}

      <motion.div

        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.65, 0.4],
        }}

        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
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



      {/* Floating Image */}

      <motion.div

        animate={{
          y: [0, -4, 0],
        }}

        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
        relative
        z-10
        w-[280px]
        sm:w-[320px]
        md:w-[360px]
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

      </motion.div>



      {/* Shine Glow Ring */}

      <motion.div

        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
        absolute
        -inset-8
        rounded-full
        bg-gradient-to-r
        from-blue-400/20
        via-purple-400/20
        to-pink-400/20
        blur-xl
        "

      />


    </motion.div>

  );
}