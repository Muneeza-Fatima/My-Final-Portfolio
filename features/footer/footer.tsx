"use client";

import { motion } from "framer-motion";
import {
  Mail,
} from "lucide-react";


export function Footer() {

  return (

    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        py-14
        md:py-16
      "
    >

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-b
          from-transparent
          via-white/[0.01]
          to-blue-500/[0.03]
        "
      />



      <motion.div

        initial={{
          opacity:0,
          y:25,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
          amount:0.3,
        }}

        transition={{
          duration:0.7,
        }}

        className="
          mx-auto
          max-w-7xl
          px-6
          md:px-10
        "
      >


        <div
          className="
            flex
            flex-col
            justify-between
            gap-10
            md:flex-row
          "
        >



          {/* Brand */}


          <div>

            <h3
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              Muneeza Fatima
            </h3>


            <p
              className="
                mt-2
                text-sm
                text-blue-300
              "
            >
              Frontend Engineer
            </p>



            <p
              className="
                mt-5
                max-w-sm
                leading-relaxed
                text-white/60
              "
            >
              Building modern digital experiences
              with React, Next.js and thoughtful
              user interfaces.
            </p>


          </div>







          {/* Connect */}


          <div>

            <h4
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Connect
            </h4>



            <div
              className="
                mt-6
                flex
                gap-3
              "
            >


              <a
                href="https://github.com/Muneeza-Fatima"
                target="_blank"
                rel="noopener noreferrer"

                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-sm
                  font-semibold
                  text-white/70
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                "
              >
                GH
              </a>




              <a
                href="https://linkedin.com/in/muneeza-fatima-b3695536a"
                target="_blank"
                rel="noopener noreferrer"

                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-sm
                  font-semibold
                  text-white/70
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                "
              >
                in
              </a>





              <a
                href="mailto:muneezafatima567@gmail.com"

                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-white/70
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/20
                  hover:bg-white/10
                "
              >

                <Mail size={19}/>

              </a>



            </div>


          </div>


        </div>








        <div
          className="
            mt-12
            border-t
            border-white/10
            pt-7
            text-center
            text-sm
            text-white/40
          "
        >

          © 2026 Muneeza Fatima. All rights reserved.

        </div>


      </motion.div>


    </footer>

  );
}