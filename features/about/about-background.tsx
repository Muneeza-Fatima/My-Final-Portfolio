"use client";

import { motion } from "framer-motion";


const particles = [
  {
    size: "h-1.5 w-1.5",
    left: "12%",
    top: "28%",
    delay: 0,
  },
  {
    size: "h-2 w-2",
    left: "78%",
    top: "22%",
    delay: 1.5,
  },
  {
    size: "h-1 w-1",
    left: "62%",
    top: "68%",
    delay: 2,
  },
  {
    size: "h-2 w-2",
    left: "30%",
    top: "75%",
    delay: 1,
  },
  {
    size: "h-1 w-1",
    left: "85%",
    top: "60%",
    delay: 2.5,
  },
];


export function AboutBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
      "
    >


      {/* Main Cyan Glow */}

      <motion.div

        animate={{
          x:[0,70,0],
          y:[0,-50,0],
          scale:[1,1.15,1],
        }}

        transition={{
          duration:20,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
          absolute
          -left-40
          top-10
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-400/10
          blur-[150px]
        "

      />



      {/* Blue Depth Glow */}

      <motion.div

        animate={{
          x:[0,-80,0],
          y:[0,60,0],
          scale:[1,1.2,1],
        }}

        transition={{
          duration:24,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
          absolute
          -right-44
          top-32
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue-500/20
          blur-[170px]
        "

      />




      {/* Subtle Violet Accent */}

      <motion.div

        animate={{
          opacity:[0.3,0.6,0.3],
          scale:[1,1.1,1],
        }}

        transition={{
          duration:12,
          repeat:Infinity,
          ease:"easeInOut",
        }}

        className="
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-[130px]
        "

      />





      {/* Floating Particles */}

      {particles.map((particle,index)=>(

        <motion.span

          key={index}

          animate={{
            y:[0,-25,0],
            opacity:[
              0.15,
              0.7,
              0.15,
            ],
          }}

          transition={{
            duration:5 + index,
            repeat:Infinity,
            delay:particle.delay,
            ease:"easeInOut",
          }}

          className={`
            absolute
            ${particle.size}
            rounded-full
            bg-white/40
          `}

          style={{
            left:particle.left,
            top:particle.top,
          }}

        />

      ))}



      {/* Soft Grid Texture */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />


    </div>
  );
}