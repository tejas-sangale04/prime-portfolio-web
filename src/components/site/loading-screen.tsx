import { useEffect, useState } from "react";

const NAMASKAR_MS = 800;
const WELCOME_MS = 800;
const FADE_MS = 200;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"namaste" | "welcome">("namaste");
  const [faded, setFaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Mark as seen only once the splash actually finishes (not on mount) —
    // writing it eagerly here would make React 18 StrictMode's dev-only
    // double-invoke see "already seen" on the second run and skip straight
    // to the end before "Welcome" ever shows.
    let seen = false;
    try {
      seen = sessionStorage.getItem("splash-seen") === "1";
    } catch {
      // ignore (e.g. storage disabled)
    }

    const markSeen = () => {
      try {
        sessionStorage.setItem("splash-seen", "1");
      } catch {
        // ignore (e.g. storage disabled)
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setFaded(true);
      setRemoved(true);
      markSeen();
      return;
    }

    const toWelcome = setTimeout(() => setPhase("welcome"), NAMASKAR_MS);
    const toFade = setTimeout(() => setFaded(true), NAMASKAR_MS + WELCOME_MS);
    const toRemove = setTimeout(() => {
      setRemoved(true);
      markSeen();
    }, NAMASKAR_MS + WELCOME_MS + FADE_MS);

    return () => {
      clearTimeout(toWelcome);
      clearTimeout(toFade);
      clearTimeout(toRemove);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-500 ${
        faded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-14 items-center justify-center sm:h-16">
        <p
          className={`absolute font-hero text-4xl font-black tracking-[-0.02em] text-foreground transition-opacity duration-500 sm:text-5xl ${
            phase === "namaste" ? "opacity-100" : "opacity-0"
          }`}
        >
          नमस्ते
        </p>
        <p
          className={`absolute font-hero text-4xl font-black tracking-[-0.02em] text-foreground transition-opacity duration-500 sm:text-5xl ${
            phase === "welcome" ? "opacity-100" : "opacity-0"
          }`}
        >
          Welcome
        </p>
      </div>
    </div>
  );
}
