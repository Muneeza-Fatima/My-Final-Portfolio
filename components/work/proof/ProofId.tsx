import { cn } from "@/lib/utils";

type ProofIdProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

// Monospace "document reference" tag used next to every piece of proof.
export function ProofId({ children, className, tone = "light" }: ProofIdProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
        tone === "light"
          ? "border-accent/25 bg-surface text-accent-deep"
          : "border-white/20 bg-white/10 text-white/80",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
