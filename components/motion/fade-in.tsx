"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";


interface FadeInProps {
  children: ReactNode;
  className?: string;
}


export function FadeIn({
  children,
  className = "",
}: FadeInProps) {


  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}

      className={className}

    >

      {children}

    </motion.div>

  );

}