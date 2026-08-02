"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export function CursorGlow() {

  const [position, setPosition] = useState({
    x: -200,
    y: -200,
  });


  useEffect(() => {

    const move = (event: MouseEvent) => {

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

    };


    window.addEventListener(
      "mousemove",
      move,
      {
        passive: true,
      }
    );


    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );
    };


  }, []);


  return (
    <motion.div

      animate={{
        x: position.x - 60,
        y: position.y - 60,
      }}

      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}

      className="
      pointer-events-none
      fixed
      left-0
      top-0
      z-[999]
      hidden
      h-32
      w-32
      rounded-full
      bg-violet-500/10
      blur-2xl
      lg:block
      "

    />
  );
}