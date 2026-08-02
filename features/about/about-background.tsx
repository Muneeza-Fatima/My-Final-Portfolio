"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";


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


  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
    window.innerWidth < 768
  );


  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };

  }, []);



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



      {/* Cyan Glow */}

      <motion.div

        animate={
          isMobile
            ? undefined
            : {
                x:[0,70,0],
                y:[0,-50,0],
                scale:[1,1.15,1],
              }
        }


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
          blur-[120px]
        "

      />




      {/* Blue Glow */}

      <motion.div

        animate={
          isMobile
            ? undefined
            : {
                x:[0,-80,0],
                y:[0,60,0],
                scale:[1,1.2,1],
              }
        }


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
          blur-[140px]
        "

      />




      {/* Violet Accent */}

      <motion.div

        animate={
          isMobile
            ? undefined
            : {
                opacity:[
                  0.3,
                  0.6,
                  0.3,
                ],
                scale:[
                  1,
                  1.1,
                  1,
                ],
              }
        }


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
          blur-[120px]
        "

      />





      {/* Particles Desktop Only */}

      {!isMobile && (

        <>
          {particles.map((particle,index)=>(

            <motion.span

              key={index}

              animate={{
                y:[
                  0,
                  -25,
                  0,
                ],
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
        </>

      )}





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