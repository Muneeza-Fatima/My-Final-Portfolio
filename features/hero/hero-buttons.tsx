"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export function HeroButtons() {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        delay:1.7,
        duration:0.6,
      }}

      className="
      flex
      flex-col
      xs:flex-row
      sm:flex-row
      gap-3
      "
    >


      {/* Primary */}

      <Link

        href="/projects"

        className="
        group
        flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-white
        px-6
        py-3
        text-sm
        font-semibold
        text-black
        transition
        hover:scale-105
        "
      >

        View My Work


        <ArrowRight

          size={16}

          className="
          transition-transform
          group-hover:translate-x-1
          "
        />


      </Link>




      {/* Secondary */}

      <Link

        href="/contact"

        className="
        flex
        items-center
        justify-center
        rounded-full
        border
        border-white/20
        bg-white/5
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-white/10
        "
      >

        Let&apos;s Talk

      </Link>



    </motion.div>

  );
}