"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "I am a Frontend Engineer",
  "I build custom websites",
  "I create seamless user experiences",
  "I turn ideas into digital products",
];

export function AnimatedRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[70px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={roles[index]}
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -50,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-3xl
            md:text-5xl
            lg:text-6xl
            font-bold
          "
        >
          {roles[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}