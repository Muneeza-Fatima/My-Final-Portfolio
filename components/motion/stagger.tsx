"use client";

import {
  motion,
} from "framer-motion";

import {
  ReactNode,
} from "react";



export function Stagger({
  children,
}: {
  children: ReactNode;
}) {


  return (

    <motion.div

      initial="hidden"

      whileInView="show"

      viewport={{
        once:true,
        amount:0.2,
      }}

      variants={{

        hidden:{},

        show:{
          transition:{
            staggerChildren:0.08,
          },
        },

      }}

    >

      {children}

    </motion.div>

  );

}





export function StaggerItem({
  children,
}: {
  children: ReactNode;
}) {


  return (

    <motion.div

      variants={{

        hidden:{
          opacity:0,
          y:15,
        },

        show:{
          opacity:1,
          y:0,
        },

      }}

      transition={{
        duration:0.4,
        ease:"easeOut",
      }}

    >

      {children}

    </motion.div>

  );

}