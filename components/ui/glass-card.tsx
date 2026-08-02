import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(139,92,246,0.08)]
        transition-all
        duration-500
        hover:border-primary/30
        hover:shadow-[0_0_60px_rgba(139,92,246,0.18)]
        `,
        className
      )}
    >
      {children}
    </div>
  );
}