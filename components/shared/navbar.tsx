"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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



  useEffect(() => {

    const closeMenu = () => {
      setOpen(false);
    };


    window.addEventListener(
      "scroll",
      closeMenu
    );


    return () => {
      window.removeEventListener(
        "scroll",
        closeMenu
      );
    };

  }, []);



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
        inset-x-0
        top-0
        z-[999]
        pt-5
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

            bg-[#050816]/70

            px-5
            py-3

            shadow-2xl

            backdrop-blur-xl


            md:px-7
          "
        >


          {/* Logo */}

          <Link
            href="/"
            className="
              group
              flex
              flex-col
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


          </Link>





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

              <Link

                key={item.title}

                href={item.href}

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


              </Link>

            ))}


          </div>





          {/* Desktop CTA */}

          <Link

            href="#contact"

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


          </Link>






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

            style={{
              WebkitTapHighlightColor:"transparent",
            }}

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

              bg-[#050816]/90

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

              <Link

                key={item.title}

                href={item.href}

                onClick={()=>setOpen(false)}

                className="
                  text-sm
                  text-neutral-300
                  transition
                  hover:text-white
                "

              >

                {item.title}

              </Link>

            ))}



            <Link

              href="#contact"

              onClick={()=>setOpen(false)}

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

            </Link>


            </div>


          </motion.div>

        )}

        </AnimatePresence>



      </Container>


    </motion.header>

  );

}