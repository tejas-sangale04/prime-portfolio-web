import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHidden(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ visibility: hidden ? "hidden" : "visible" }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading</p>
      </div>
    </div>
  );
}