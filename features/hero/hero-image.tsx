"use client";

import Image from "next/image";
import { motion } from "framer-motion";


export function HeroImage() {

  return (

    <motion.div

      initial={{
        opacity:0,
        scale:0.95,
      }}

      animate={{
        opacity:1,
        scale:1,
      }}

      transition={{
        duration:0.8,
      }}

      className="
        relative
        flex
        justify-center
      "

    >


      {/* Soft Glow */}

      <div
        className="
          absolute

          -inset-10

          rounded-full

          bg-gradient-to-r

          from-blue-500/20

          via-purple-500/20

          to-transparent

          blur-3xl
        "
      />



      {/* Image */}

      <motion.div

        animate={{
          y:[
            0,
            -8,
            0,
          ],
        }}

        transition={{
          duration:6,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
          relative
          z-10

          h-[390px]
          w-[300px]

          overflow-hidden

          rounded-[45px]

          border

          border-white/10

          shadow-2xl


          sm:h-[460px]

          sm:w-[350px]


          lg:h-[520px]

          lg:w-[400px]
        "

      >

        <Image

          src="/images/profile.png"

          alt="Muneeza Fatima"

          fill

          priority

          sizes="
          (max-width:768px) 300px,
          400px
          "

          className="
            object-cover
          "

        />



        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-32
            bg-gradient-to-t
            from-black/50
            to-transparent
          "
        />


      </motion.div>


    </motion.div>

  );
}