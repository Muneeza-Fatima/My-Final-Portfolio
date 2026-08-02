"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroButtons() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-4
        sm:flex-row
        sm:gap-5
      "
    >

      {/* Primary Button */}
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.04,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <Link
          href="#projects"
          className="
            group
            relative
            flex
            h-11
            items-center
            justify-center
            rounded-full
            bg-white
            px-7
            text-sm
            font-medium
            text-black
            shadow-lg
            transition
          "
        >
          View My Work
        </Link>
      </motion.div>


      {/* Secondary Button */}
      <motion.div
        whileHover={{
          y: -4,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <Link
          href="#contact"
          className="
            flex
            h-11
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/5
            px-7
            text-sm
            font-medium
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/10
          "
        >
          Contact Me
        </Link>
      </motion.div>

    </div>
  );
}