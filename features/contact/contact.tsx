"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { Magnetic } from "@/components/interactive/Magnetic";
import { RevealText } from "@/components/interactive/RevealText";
import { contactEmail, socials } from "@/data/socials";

import { ContactForm } from "./contact-form";

const lahoreTime = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Karachi",
});

const subscribeToClock = (onChange: () => void) => {
  const timer = setInterval(onChange, 15000);
  return () => clearInterval(timer);
};

function LocalTime() {
  // Server snapshot is a placeholder so the markup matches before hydration.
  const time = useSyncExternalStore(
    subscribeToClock,
    () => lahoreTime.format(new Date()),
    () => "--:--",
  );

  return <span className="font-mono tabular-nums">{time}</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contactEmail}`;
    }
  };

  return (
    <Magnetic strength={0.2}>
      <button
        type="button"
        onClick={copy}
        className="group flex items-center gap-4 rounded-full border border-line bg-surface py-2 pl-6 pr-2 text-left transition-colors hover:border-accent"
      >
        <span className="text-sm text-ink sm:text-base">{contactEmail}</span>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tint text-accent-deep">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email copied" : ""}
        </span>
      </button>
    </Magnetic>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-canvas py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-line pb-5 text-[10px] uppercase tracking-[0.35em] text-muted">
          <span className="flex items-center gap-3 text-accent-deep">
            <span className="h-px w-8 bg-accent" /> Contact
          </span>
          <span>06 — Say hello</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col">
            <RevealText
              as="h2"
              className="font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.92] text-ink"
              text={[{ text: "Let’s create something " }, { text: "remarkable.", className: "text-accent" }]}
            />
            <p className="mt-6 max-w-md text-sm leading-7 text-muted sm:text-base">
              Have a website idea, frontend project or digital product in mind?
              Let&apos;s discuss how we can create something impactful.
            </p>

            <div className="mt-10">
              <CopyEmail />
            </div>

            <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-8 lg:mt-16">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">Lahore, PK</dt>
                <dd className="mt-2 text-2xl text-ink">
                  <LocalTime />
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">Status</dt>
                <dd className="mt-2 flex items-center gap-2 text-sm text-ink">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Open for freelance
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">Response</dt>
                <dd className="mt-2 text-sm text-ink">Within 24–48 hours</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">Elsewhere</dt>
                <dd className="mt-2 flex gap-4 text-sm">
                  {socials
                    .filter((s) => s.name !== "Email")
                    .map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {social.name}
                      </a>
                    ))}
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
