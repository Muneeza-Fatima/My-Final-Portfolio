"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const countries = [
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "UAE", code: "ae" },
  { name: "Pakistan", code: "pk" },
  { name: "Other", code: null },
];

function Flag({ code }: { code: string | null }) {
  if (!code) return <Globe size={16} className="text-muted" aria-hidden />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${code}.svg`}
      alt=""
      aria-hidden
      className="h-[14px] w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
    />
  );
}

// Country dropdown with flags (a native <select> can't show images).
// A hidden input keeps `required` validation working inside the form.
export function CountrySelect({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = countries.find((c) => c.name === value);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const choose = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(Math.max(0, countries.findIndex((c) => c.name === value)));
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHighlight((i) => (i + step + countries.length) % countries.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(countries[highlight].name);
      else setOpen(true);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <input
        tabIndex={-1}
        aria-hidden
        required
        name="country"
        value={value}
        onChange={() => {}}
        className="pointer-events-none absolute inset-0 opacity-0"
      />
      <button
        type="button"
        id="country"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(className, "flex items-center gap-3 text-left", open && "border-accent")}
      >
        {selected ? (
          <>
            <Flag code={selected.code} />
            <span>{selected.name}</span>
          </>
        ) : (
          <span className="text-transparent">.</span>
        )}
      </button>
      <span
        className={cn(
          "pointer-events-none absolute left-5 text-muted transition-all duration-300",
          value ? "top-2.5 text-[10px] uppercase tracking-[0.2em]" : "top-5 text-sm",
        )}
      >
        Country
      </span>
      <ChevronDown
        size={16}
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted transition-transform duration-300",
          open && "rotate-180",
        )}
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label="Country"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-[0_24px_50px_-24px_rgba(17,18,22,0.35)]"
          >
            {countries.map((country, index) => {
              const isSelected = country.name === value;
              return (
                <li
                  key={country.name}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setHighlight(index)}
                  onClick={() => choose(country.name)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink transition-colors",
                    index === highlight && "bg-[#f3f0ff]",
                    isSelected && "font-medium text-[#6d5bd0]",
                  )}
                >
                  <Flag code={country.code} />
                  {country.name}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
