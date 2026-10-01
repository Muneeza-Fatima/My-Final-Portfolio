"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { useLenis } from "lenis/react";
import { useRef } from "react";

import { Magnetic } from "@/components/interactive/Magnetic";
import { navigation } from "@/data/navigation";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

import { contactEmail, contactPhone, socials } from "@/data/socials";
import { useSectionNav } from "@/hooks/use-section-nav";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const goTo = useSectionNav();
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const year = new Date().getFullYear();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-noir text-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
            <p className="font-display text-4xl leading-tight sm:text-5xl">
              Have an idea?
              <br />
              <span className="text-accent-soft">Let&apos;s make it real.</span>
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-white/80 underline decoration-white/25 underline-offset-8 transition-colors hover:text-white hover:decoration-accent-soft"
            >
              {contactEmail} <ArrowUpRight size={14} />
            </a>
            <a
              href={contactPhone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-fit items-center gap-2 text-sm text-white/80 underline decoration-white/25 underline-offset-8 transition-colors hover:text-white hover:decoration-accent-soft"
            >
              <FaWhatsapp size={15} className="text-[#25D366]" /> {contactPhone.display}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => goTo(item.id, e)}
                    className="text-white/75 transition-colors hover:text-accent-soft"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-white/75 transition-colors hover:text-white"
                  >
                    <span
                      className={
                        social.name === "LinkedIn"
                          ? "flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-[0_6px_16px_-6px_rgba(10,102,194,0.9)] transition-transform group-hover:scale-110"
                          : "flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white/85 transition-transform group-hover:scale-110"
                      }
                    >
                      {social.name === "GitHub" ? (
                        <FaGithub size={15} />
                      ) : social.name === "LinkedIn" ? (
                        <FaLinkedinIn size={15} />
                      ) : (
                        <Mail size={15} />
                      )}
                    </span>
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Magnetic>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-accent-soft hover:bg-accent-soft hover:text-noir"
            >
              <ArrowUp size={18} />
            </button>
          </Magnetic>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {year} Muneeza Fatima. All rights reserved.</p>
          <p>Designed &amp; built with care in Lahore, Pakistan.</p>
        </div>
      </div>

      {/* Giant wordmark rising into view */}
      <div aria-hidden className="overflow-hidden pb-10 sm:pb-14">
        <motion.p
          style={reduceMotion ? undefined : { y: wordY }}
          className="text-foil select-none whitespace-nowrap px-3 text-center font-display text-[14vw] leading-[0.9]"
        >
          Muneeza
        </motion.p>
      </div>
    </footer>
  );
}
