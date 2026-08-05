"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/container";


const navItems = [
  {
    title: "Home",
    href: "/",
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


    if(href === "/"){

      window.scrollTo({
        top:0,
        behavior:"smooth",
      });

      setOpen(false);

      return;

    }



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

          px-5
          py-3

          shadow-2xl

          backdrop-blur-xl

          md:px-7
          "

        >



          {/* Logo */}

          <button

            onClick={()=>handleScroll("/")}

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





          {/* Desktop Menu */}


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
            bg-white
            px-5
            py-2.5
            text-sm
            font-medium
            text-black
            transition
            hover:bg-neutral-200
            md:flex
            "

          >

            Let&apos;s Talk

            <ArrowRight size={15}/>


          </button>





          {/* Mobile Button */}


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
              height:0,
              y:-10,
            }}


            animate={{
              opacity:1,
              height:"auto",
              y:0,
            }}


            exit={{
              opacity:0,
              height:0,
              y:-10,
            }}


            className="
            mt-3
            overflow-hidden
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


              {navItems.map((item)=>(


                <button

                  key={item.title}

                  onClick={()=>handleScroll(item.href)}

                  className="
                  text-left
                  text-sm
                  text-neutral-300
                  transition
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
                bg-white
                py-3
                text-sm
                font-medium
                text-black
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