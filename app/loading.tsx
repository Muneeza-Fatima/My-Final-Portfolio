export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-primary" />

        <div className="absolute h-8 w-8 rounded-full bg-primary/20 blur-xl" />
      </div>
    </main>
  );
}