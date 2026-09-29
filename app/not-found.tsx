import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-canvas px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.15] blur-[140px]"
      />
      <p className="relative font-display text-[clamp(8rem,30vw,20rem)] leading-none text-foil">404</p>
      <h1 className="relative mt-4 font-display text-4xl text-ink sm:text-5xl">
        This page wandered <span className="text-accent">off.</span>
      </h1>
      <p className="relative mt-4 max-w-sm text-sm leading-7 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="group relative mt-10 inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm text-canvas transition-colors hover:bg-accent-deep"
      >
        Back home
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={15} />
        </span>
      </Link>
    </main>
  );
}
