"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity:0,
        scale:0.9,
        y:30,
      }}

      animate={{
        opacity:1,
        scale:1,
        y:0,
      }}

      transition={{
        duration:0.9,
        ease:[0.22,1,0.36,1],
      }}

      className="
      relative
      w-full
      max-w-[300px]
      sm:max-w-[360px]
      lg:max-w-[430px]
      "
    >


      {/* Outer Glow */}

      <div
        className="
        absolute
        -inset-6
        rounded-full
        bg-gradient-to-r
        from-blue-500/30
        via-purple-500/30
        to-pink-500/20
        blur-3xl
        "
      />



      {/* Shining Card */}

      <motion.div

        animate={{
          rotate: [0,1,0,-1,0],
        }}

        transition={{
          duration:8,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
        relative
        rounded-[2.5rem]
        p-[2px]
        bg-gradient-to-r
        from-blue-400/60
        via-purple-400/60
        to-pink-400/60
        "
      >


        <div
          className="
          relative
          aspect-square
          overflow-hidden
          rounded-[2.4rem]
          border
          border-white/10
          bg-black/40
          backdrop-blur-xl
          "
        >

          <Image

            src="/images/profile.png"

            alt="Frontend Engineer"

            fill

            priority

            sizes="
            (max-width:640px) 300px,
            (max-width:1024px) 360px,
            430px
            "

            className="
            object-cover
            object-center
            scale-105
            "
          />


          {/* Image Shine */}

          <motion.div

            animate={{
              x:["-120%","120%"],
            }}

            transition={{
              duration:4,
              repeat:Infinity,
              repeatDelay:3,
            }}

            className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            skew-x-12
            "
          />

        </div>


      </motion.div>


    </motion.div>

  );
}