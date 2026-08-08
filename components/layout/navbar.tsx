
"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

  const handleScroll = (href: string) => {
    const section = document.querySelector(href);

    if (section) {
      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    setOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[99999]
        isolate
        w-full
      "
    >
      <div className="w-full px-4 pt-4 sm:px-5 md:px-7">
        {/* Navbar */}
        <nav
          className="
            relative
            z-[99999]

            flex
            items-center
            justify-between

            rounded-2xl

            border
            border-white/10

            bg-[#050816]/95

            backdrop-blur-2xl

            px-4
            py-2.5

            shadow-[0_20px_70px_rgba(0,0,0,0.45)]

            sm:px-5
            sm:py-3

            md:px-7
          "
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleScroll("#home")}
            className="
              flex
              min-w-0
              flex-col
              text-left
            "
          >
            <span
              className="
                whitespace-nowrap
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
                whitespace-nowrap
                text-[10px]
                text-neutral-400

                sm:text-xs
              "
            >
              Frontend Engineer
            </span>
          </button>

          {/* Desktop Navigation */}
          <div
            className="
              hidden
              items-center
              gap-8
              md:flex
            "
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.title}
                onClick={() => handleScroll(item.href)}
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

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => handleScroll("#contact")}
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

            <ArrowRight size={16} />
          </button>

          {/* Mobile Right Side */}
          <div
            className="
              flex
              items-center
              gap-2

              md:hidden
            "
          >
            {/* Mobile Let's Talk */}
            <button
              type="button"
              onClick={() => handleScroll("#contact")}
              className="
                flex
                items-center
                gap-1.5

                rounded-lg

                bg-gradient-to-r
                from-violet-500
                via-purple-500
                to-blue-500

                px-3
                py-2

                text-[11px]
                font-semibold

                text-white

                shadow-[0_0_20px_rgba(139,92,246,0.25)]

                transition

                active:scale-95
              "
            >
              Let&apos;s Talk

              <ArrowRight size={13} />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                flex
                h-9
                w-9

                shrink-0

                items-center
                justify-center

                rounded-lg

                border
                border-white/10

                bg-white/5

                text-white

                transition

                hover:bg-white/10

                md:hidden
              "
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                y: -10,
                height: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                mt-2

                overflow-hidden

                rounded-2xl

                border
                border-white/10

                bg-[#050816]/95

                backdrop-blur-2xl

                p-4

                shadow-[0_20px_70px_rgba(0,0,0,0.45)]

                md:hidden
              "
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => handleScroll(item.href)}
                    className="
                      rounded-lg
                      px-2
                      py-1.5

                      text-left

                      text-sm

                      text-neutral-300

                      transition

                      hover:bg-white/5
                      hover:text-white
                    "
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );

}