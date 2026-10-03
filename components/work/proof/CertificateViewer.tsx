"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileText,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Certificate } from "@/data/work";

import { ProofId } from "./ProofId";
import { lockScroll } from "@/lib/scroll-lock";

type CertificateViewerProps = {
  certificates: Certificate[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function CertificateViewer({
  certificates,
  index,
  onClose,
  onChange,
}: CertificateViewerProps) {
  const reduceMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const open = index !== null;
  const certificate = open ? certificates[index] : null;
  const hasMany = certificates.length > 1;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setZoomed(false);
      onChange((index + step + certificates.length) % certificates.length);
    },
    [index, certificates.length, onChange],
  );

  // Lock page scroll (native + Lenis) while open.
  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const returnFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && hasMany) go(1);
      if (event.key === "ArrowLeft" && hasMany) go(-1);

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnFocus?.focus();
    };
  }, [open, onClose, go, hasMany]);

  const toggleZoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
    setZoomed((value) => !value);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <motion.div
          key="certificate-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-canvas/85 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${certificate.title} — ${certificate.issuer}`}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-line bg-surface outline-none lg:flex-row"
          >
            {/* Certificate image */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-tint-soft p-3 sm:p-6">
              <button
                type="button"
                onClick={toggleZoom}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                data-cursor={zoomed ? "Out" : "Zoom"}
                className={zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
              >
                <motion.img
                  key={certificate.id}
                  src={certificate.image}
                  alt={`${certificate.title} issued by ${certificate.issuer} to ${certificate.recipient}`}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1, scale: zoomed ? 2.1 : 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: origin }}
                  className="max-h-[52vh] w-auto rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:max-h-[78vh]"
                />
              </button>

              <span className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-surface/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted sm:inline-flex">
                {zoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                Click to {zoomed ? "zoom out" : "zoom in"}
              </span>
            </div>

            {/* Meta */}
            <div className="flex shrink-0 flex-col gap-6 border-t border-line p-6 sm:p-8 lg:w-[340px] lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-deep">
                  {certificate.kind}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>

              <div>
                <h3 className="font-display text-3xl leading-tight text-ink">
                  {certificate.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {certificate.summary}
                </p>
              </div>

              <dl className="grid gap-4 border-y border-line py-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Issued by</dt>
                  <dd className="text-right text-ink">{certificate.issuer}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Awarded to</dt>
                  <dd className="text-right text-ink">{certificate.recipient}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Date</dt>
                  <dd className="text-right text-ink">{certificate.date}</dd>
                </div>
              </dl>

              {certificate.number && <ProofId>No. {certificate.number}</ProofId>}

              <div className="mt-auto grid gap-3">
                <a
                  href={certificate.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas transition hover:bg-accent-deep"
                >
                  <FileText size={15} />
                  Open original PDF
                </a>
                {certificate.issuerUrl && (
                  <a
                    href={certificate.issuerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-ink transition hover:border-accent"
                  >
                    Visit {certificate.issuer}
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>

              {hasMany && (
                <div className="flex items-center justify-between text-xs text-muted">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex items-center gap-2 transition hover:text-ink"
                  >
                    <ArrowLeft size={14} /> Prev
                  </button>
                  <span className="font-mono">
                    {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(certificates.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="inline-flex items-center gap-2 transition hover:text-ink"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
