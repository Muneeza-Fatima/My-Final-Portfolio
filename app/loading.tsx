export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas" aria-busy="true">
      <span className="font-display text-3xl text-accent animate-pulse">Muneeza.</span>
      <span className="sr-only">Loading…</span>
    </main>
  );
}
