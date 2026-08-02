"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Menu, X } from "lucide-react";

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

    const handleScroll = () => {
      setOpen(false);
    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  return (

    <header
      className="
        fixed
        inset-x-0
        top-0
        z-[999]
        bg-[#050505]/80
        backdrop-blur-xl
        pt-4
      "
    >

      <Container>

        <nav
          className="
            relative
            z-[1000]
            rounded-full
            border
            border-white/10
            bg-transparent
            px-5
            py-3
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <Link
              href="/"
              className="
                flex
                flex-col
                leading-tight
                text-white
              "
            >

              <span
                className="
                  text-lg
                  font-semibold
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



            <div
              className="
                hidden
                items-center
                gap-8
                md:flex
              "
            >

              {navItems.map((item) => (

                <Link
                  key={item.title}
                  href={item.href}
                  className="
                    text-sm
                    text-neutral-400
                    transition
                    hover:text-white
                  "
                >
                  {item.title}
                </Link>

              ))}

            </div>



            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-transparent
                text-white
                outline-none
                overflow-hidden
                md:hidden
              "
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >

              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}

            </button>


          </div>



          {open && (

            <div
              className="
                mt-3
                flex
                flex-col
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-black/90
                p-4
                backdrop-blur-xl
                md:hidden
              "
            >

              {navItems.map((item) => (

                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
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

            </div>

          )}

        </nav>

      </Container>

    </header>

  );
}