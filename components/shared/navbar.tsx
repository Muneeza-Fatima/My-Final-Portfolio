"use client";

import { useState } from "react";

import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { Container } from "@/components/ui/container";


const navItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];


export function Navbar() {

  const [open, setOpen] = useState(false);


  const handleScroll = (href:string) => {

    const section = document.querySelector(href);

    if(section){

      section.scrollIntoView({
        behavior:"smooth",
        block:"start",
      });

    }

    setOpen(false);

  };


  return (

    <motion.header

      initial={{
        opacity:0,
        y:-20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:0.6,
      }}

      className="
      fixed
      top-0
      left-0
      right-0

      z-[9999]

      pt-3
      sm:pt-5
      "

    >


      <Container>


        <nav

          className="
          flex
          w-full

          items-center

          rounded-2xl

          border
          border-white/10

          bg-[#050816]/95

          px-3
          py-3

          shadow-2xl

          backdrop-blur-xl

          sm:px-5

          md:px-7
          "

        >


          {/* Logo */}


          <button

            onClick={()=>handleScroll("#home")}

            className="
            flex
            shrink-0

            mr-auto

            flex-col

            text-left
            "

          >

            <span

              className="
              text-sm
              font-semibold
              tracking-tight
              text-white

              sm:text-base
              md:text-lg
              "

            >

              Muneeza Fatima

            </span>


            <span

              className="
              text-[10px]

              text-neutral-400
              "

            >

              Frontend Engineer

            </span>


          </button>





          {/* Desktop Menu */}


          <div

            className="
            hidden

            items-center

            gap-8

            md:flex
            "

          >

            {
              navItems.map((item)=>(

                <button

                  key={item.title}

                  onClick={()=>handleScroll(item.href)}

                  className="
                  text-sm

                  text-neutral-400

                  transition

                  hover:text-white
                  "

                >

                  {item.title}

                </button>

              ))
            }


          </div>





          {/* Actions */}


          <div

            className="
            flex

            shrink-0

            items-center

            gap-2

            ml-auto
            "

          >


            {/* Desktop Let's Talk */}


            <button

              onClick={()=>handleScroll("#contact")}

              className="
              hidden

              items-center

              gap-2

              rounded-xl

              bg-white

              px-5
              py-2.5

              text-sm

              font-medium

              text-black

              md:flex
              "

            >

              Let&apos;s Talk

              <ArrowRight size={15}/>

            </button>





            {/* Mobile Talk */}


            <button

              onClick={()=>handleScroll("#contact")}

              className="
              flex

              items-center

              gap-1

              rounded-lg

              bg-white

              px-2.5

              py-2

              text-xs

              font-medium

              text-black

              md:hidden
              "

            >

              Talk

              <ArrowRight size={12}/>

            </button>





            {/* Mobile Toggle */}


            <button

              type="button"

              onClick={()=>setOpen(!open)}

              className="
              flex

              h-10

              w-10

              shrink-0

              items-center

              justify-center

              rounded-xl

              border

              border-white/10

              text-white

              md:hidden
              "

            >

              {

                open ?

                <X size={21}/> :

                <Menu size={21}/>

              }


            </button>


          </div>


        </nav>





        {/* Mobile Menu */}


        <AnimatePresence>

        {

          open && (

            <motion.div

              initial={{
                opacity:0,
                height:0,
              }}

              animate={{
                opacity:1,
                height:"auto",
              }}

              exit={{
                opacity:0,
                height:0,
              }}

              className="
              mt-3

              rounded-2xl

              border
              border-white/10

              bg-[#050816]/95

              p-5

              backdrop-blur-xl

              md:hidden
              "

            >

              <div

                className="
                flex
                flex-col
                gap-4
                "

              >

                {
                  navItems.map((item)=>(

                    <button

                      key={item.title}

                      onClick={()=>handleScroll(item.href)}

                      className="
                      text-left

                      text-sm

                      text-neutral-300
                      "

                    >

                      {item.title}

                    </button>

                  ))
                }


              </div>


            </motion.div>

          )

        }

        </AnimatePresence>


      </Container>


    </motion.header>

  );

}