
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Projects", href: "#projects" },
  { title: "Services", href: "#services" },
  { title: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-[99999]
        w-full
        isolate
      "
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
      }}
    >
      <nav
        className="
          mx-auto
          flex
          h-[70px]
          w-full
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#050711]/98
          px-4
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
          sm:px-6
          lg:max-w-[1400px]
          lg:px-7
        "
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className="flex flex-col leading-none"
        >
          <span className="text-[17px] font-semibold tracking-tight text-white sm:text-[18px]">
            Muneeza Fatima
          </span>

          <span className="mt-1 text-[11px] text-white/50 sm:text-[12px]">
            Frontend Engineer
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="
                text-sm
                font-medium
                text-white/60
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Let's Talk */}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="
              flex
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-violet-500
              to-blue-500
              px-3.5
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-[0_8px_25px_rgba(99,102,241,0.3)]
              transition-all
              duration-300
              hover:scale-[1.03]
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            Let&apos;s Talk
          </a>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
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
              bg-white/5
              text-white
              transition-all
              duration-300
              hover:bg-white/10
              md:hidden
            "
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              mx-3
              mt-2
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#050711]/98
              p-3
              shadow-2xl
              backdrop-blur-xl
              sm:mx-4
              sm:p-4
              md:hidden
            "
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-white/70
                    transition-colors
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  {item.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

