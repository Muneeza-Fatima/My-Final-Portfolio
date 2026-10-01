// Premium static backdrop for the hero (replaces the background video):
// deep base, two slow-drifting purple/indigo light fields, a fine grid that
// fades out toward the edges, a soft glow behind the portrait and a hairline
// highlight along the top. Purely decorative.
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base: deep night with a faint violet tint toward the top right */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_0%,#1b1530_0%,#0e0f12_55%)]" />

      {/* Slow-moving light fields */}
      <div className="absolute -left-[15%] top-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(139,107,255,0.22),transparent)] blur-3xl animate-[hero-drift_22s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute -right-[10%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent)] blur-3xl animate-[hero-drift_28s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />

      {/* Fine grid, masked so it only shows in the middle of the hero */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 85%)",
        }}
      />

      {/* Soft glow behind the portrait (right column on desktop) */}
      <div className="absolute bottom-[-10%] left-1/2 h-[60%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.16),transparent)] lg:left-auto lg:right-[-5%] lg:top-[15%] lg:h-[85%] lg:w-[55%] lg:translate-x-0" />

      {/* Hairline highlight under the navbar */}
      <div className="absolute inset-x-0 top-[72px] h-px bg-gradient-to-r from-transparent via-[#b69cff]/40 to-transparent" />

      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-noir to-transparent" />
    </div>
  );
}
