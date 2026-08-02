"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";


const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Work",
    href: "#projects",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];


export function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);


  return (

    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[99999]
        w-full
        bg-[#050505]/80
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-5
        "
      >

        <nav
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-black/60
            px-5
            py-4
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          "
        >


          <Link
            href="#home"
            className="flex flex-col"
          >

            <span className="text-lg font-bold text-white">
              Muneeza Fatima
            </span>

            <span className="text-xs uppercase tracking-[0.25em] text-white/50">
              Frontend Engineer
            </span>

          </Link>



          <div className="hidden items-center gap-8 lg:flex">

            {navItems.map((item)=>(

              <Link
                key={item.href}
                href={item.href}
                className="
                  text-sm
                  font-medium
                  text-white/70
                  transition
                  hover:text-white
                "
              >
                {item.label}
              </Link>

            ))}

          </div>



          <div className="flex items-center gap-3">


            <Link
              href="#contact"
              className="
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
                shadow-[0_0_30px_rgba(139,92,246,0.45)]
                transition
                hover:-translate-y-1
              "
            >
              Hire Me
            </Link>



            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-white
                lg:hidden
              "
            >

              {mobileOpen ? (
                <X size={22}/>
              ) : (
                <Menu size={22}/>
              )}

            </button>


          </div>


        </nav>



        {mobileOpen && (

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-white/10
              bg-black/90
              p-4
              backdrop-blur-xl
              lg:hidden
            "
          >

            {navItems.map((item)=>(

              <Link
                key={item.href}
                href={item.href}
                onClick={()=>setMobileOpen(false)}
                className="
                  block
                  rounded-xl
                  px-4
                  py-3
                  text-white/70
                  hover:bg-white/10
                  hover:text-white
                "
              >
                {item.label}
              </Link>

            ))}

          </div>

        )}


      </div>


    </header>

  );
}