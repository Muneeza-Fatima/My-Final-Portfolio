
"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "10+",
    label: "Projects Completed",
  },
  {
    value: "2+",
    label: "Years Learning",
  },
  {
    value: "React",
    label: "Frontend Development",
  },
];

export function HeroTrust() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.8,
        ease: "easeOut",
      }}
      className="mt-8 w-full max-w-2xl"
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
          px-4
          py-5
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(99,102,241,0.10)]
          sm:px-6
        "
      >
        {/* Soft glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-16
            -top-16
            h-32
            w-32
            rounded-full
            bg-purple-500/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-16
            -right-16
            h-32
            w-32
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />

        {/* Stats */}
        <div className="relative grid grid-cols-3 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1 + index * 0.15,
              }}
              className="flex min-w-0 flex-col items-center px-2 text-center sm:px-4"
            >
              <span
                className="
                  text-lg
                  font-semibold
                  tracking-tight
                  text-white
                  sm:text-2xl
                "
              >
                {stat.value}
              </span>

              <span
                className="
                  mt-1
                  text-[9px]
                  leading-tight
                  text-white/50
                  sm:text-xs
                "
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

