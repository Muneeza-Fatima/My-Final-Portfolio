"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CountrySelect } from "./country-select";

const empty = { name: "", email: "", country: "", projectType: "", message: "" };

type Status = { type: "idle" } | { type: "success" } | { type: "error"; message: string };

const fieldBase =
  "peer w-full rounded-2xl border border-line bg-surface px-5 pb-3 pt-7 text-sm text-ink outline-none transition-colors focus:border-accent";
const labelBase =
  "pointer-events-none absolute left-5 top-5 origin-left text-sm text-muted transition-all duration-300 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent-deep peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({ type: "success" });
        setForm(empty);
      } else {
        setStatus({ type: "error", message: data.message || "Failed to send message." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status.type === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[520px] flex-col items-center justify-center rounded-[28px] border border-line bg-surface p-10 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white"
            >
              <Check size={34} />
            </motion.span>
            <h3 className="mt-8 font-display text-4xl text-ink">Message received.</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
              Thank you — I&apos;ll get back to you within 24–48 hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus({ type: "idle" })}
              className="mt-8 text-sm text-accent-deep underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 rounded-[28px] border border-line bg-tint-soft p-5 sm:grid-cols-2 sm:p-7"
          >
            <div className="relative">
              <input id="name" name="name" required value={form.name} onChange={update} placeholder=" " autoComplete="name" className={fieldBase} />
              <label htmlFor="name" className={labelBase}>Your name</label>
            </div>
            <div className="relative">
              <input id="email" name="email" type="email" required value={form.email} onChange={update} placeholder=" " autoComplete="email" className={fieldBase} />
              <label htmlFor="email" className={labelBase}>Email address</label>
            </div>
            <CountrySelect
              value={form.country}
              onChange={(country) => setForm((prev) => ({ ...prev, country }))}
              className={fieldBase}
            />
            <div className="relative">
              <input id="projectType" name="projectType" required value={form.projectType} onChange={update} placeholder=" " className={fieldBase} />
              <label htmlFor="projectType" className={labelBase}>Project type</label>
            </div>
            <div className="relative sm:col-span-2">
              <textarea id="message" name="message" required rows={6} value={form.message} onChange={update} placeholder=" " className={cn(fieldBase, "resize-none")} />
              <label htmlFor="message" className={labelBase}>Tell me about your project</label>
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p
                role="alert"
                className={cn("text-sm", status.type === "error" ? "text-accent-deep" : "text-muted")}
              >
                {status.type === "error" ? status.message : "All fields are required."}
              </p>
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm text-canvas transition-colors hover:bg-accent-deep disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send inquiry"}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
