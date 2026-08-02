"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";


export function Particles() {


  const particles = useMemo(
    () => [

      { id: 1, x: 10, y: 20, size: 3 },
      { id: 2, x: 25, y: 70, size: 4 },
      { id: 3, x: 40, y: 35, size: 2 },
      { id: 4, x: 55, y: 80, size: 3 },
      { id: 5, x: 70, y: 25, size: 4 },
      { id: 6, x: 85, y: 60, size: 2 },
      { id: 7, x: 15, y: 85, size: 3 },
      { id: 8, x: 90, y: 15, size: 3 },
      { id: 9, x: 35, y: 55, size: 4 },
      { id: 10, x: 60, y: 45, size: 2 },

    ],
    []
  );



  return (

    <div
      className="
      pointer-events-none
      absolute
      inset-0
      overflow-hidden
      "
    >

      {
        particles.map((particle)=>(

          <motion.span

            key={particle.id}

            animate={{

              y:[
                0,
                -20,
                0
              ],

              opacity:[
                0.2,
                0.6,
                0.2
              ]

            }}

            transition={{

              duration:
              5 + (particle.id % 3),

              repeat:
              Infinity,

              ease:
              "easeInOut"

            }}


            style={{

              left:
              `${particle.x}%`,

              top:
              `${particle.y}%`,

              width:
              `${particle.size}px`,

              height:
              `${particle.size}px`

            }}


            className="
            absolute
            rounded-full
            bg-primary/40
            blur-sm
            "

          />

        ))
      }


    </div>

  );

}