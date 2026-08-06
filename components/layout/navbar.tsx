"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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


  const [open,setOpen] = useState(false);



  const handleScroll = (href:string) => {


    const section = document.querySelector(href);



    if(section){


      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        100;



      window.scrollTo({

        top,

        behavior:"smooth",

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
        duration:0.5,
      }}


      className="
        fixed
        top-0
        left-0
        right-0
        z-[99999]
        pt-4
        sm:pt-5
      "

    >


      <Container>


        <nav

          className="
            flex
            items-center
            justify-between

            rounded-2xl

            border
            border-white/10

            bg-[#050816]/95

            backdrop-blur-2xl

            px-5
            py-3

            shadow-[0_20px_70px_rgba(0,0,0,0.45)]

            md:px-7
          "

        >



          {/* Logo */}


          <button

            onClick={()=>handleScroll("#home")}

            className="
              flex
              flex-col
              text-left
            "

          >


            <span

              className="
                text-base
                font-semibold
                tracking-tight
                text-white
                md:text-lg
              "

            >

              Muneeza Fatima

            </span>



            <span

              className="
                text-xs
                text-neutral-400
              "

            >

              Frontend Engineer

            </span>


          </button>





          {/* Desktop Links */}


          <div

            className="
              hidden
              items-center
              gap-8
              md:flex
            "

          >

            {navItems.map((item)=>(


              <button

                key={item.title}

                onClick={()=>handleScroll(item.href)}

                className="
                  group
                  relative
                  text-sm
                  font-medium
                  text-neutral-400
                  transition
                  hover:text-white
                "

              >

                {item.title}


                <span

                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-white
                    transition-all
                    duration-300
                    group-hover:w-full
                  "

                />


              </button>


            ))}


          </div>





          {/* CTA */}


          <button

            onClick={()=>handleScroll("#contact")}


            className="
              hidden
              items-center
              gap-2

              rounded-xl

              bg-gradient-to-r
              from-violet-500
              via-purple-500
              to-blue-500

              px-5
              py-2.5

              text-sm
              font-semibold
              text-white

              shadow-[0_0_35px_rgba(139,92,246,0.35)]

              transition

              hover:-translate-y-1

              md:flex
            "

          >

            Let&apos;s Talk

            <ArrowRight size={16}/>


          </button>





          {/* Mobile Menu Button */}


          <button

            type="button"

            onClick={()=>setOpen(!open)}

            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              border
              border-white/10

              bg-white/5

              text-white

              md:hidden
            "

          >

            {open ? (
              <X size={21}/>
            ):(
              <Menu size={21}/>
            )}

          </button>


        </nav>





        {/* Mobile Menu */}


        <AnimatePresence>


        {open && (


          <motion.div

            initial={{
              opacity:0,
              y:-10,
              height:0,
            }}

            animate={{
              opacity:1,
              y:0,
              height:"auto",
            }}

            exit={{
              opacity:0,
              y:-10,
              height:0,
            }}

            transition={{
              duration:0.25,
            }}


            className="
              mt-3
              overflow-hidden

              rounded-2xl

              border
              border-white/10

              bg-[#050816]/95

              backdrop-blur-2xl

              p-5

              md:hidden
            "

          >


            <div className="flex flex-col gap-4">


              {navItems.map((item)=>(


                <button

                  key={item.title}

                  onClick={()=>handleScroll(item.href)}

                  className="
                    text-left
                    text-sm
                    text-neutral-300
                    hover:text-white
                  "

                >

                  {item.title}

                </button>


              ))}



              <button

                onClick={()=>handleScroll("#contact")}

                className="
                  mt-2

                  flex
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-gradient-to-r
                  from-violet-500
                  via-purple-500
                  to-blue-500

                  py-3

                  text-sm
                  font-semibold
                  text-white
                "

              >

                Let&apos;s Talk

                <ArrowRight size={15}/>

              </button>


            </div>


          </motion.div>


        )}


        </AnimatePresence>



      </Container>


    </motion.header>


  );

}