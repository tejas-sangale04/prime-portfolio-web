import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Spark = { id: number; x: number; y: number; size: number; delay: number; dur: number };

function makeSparks(count: number, seed = 1): Spark[] {
  // deterministic pseudo-random so SSR and client agree
  let s = seed * 9301;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: rnd() * 100,
    y: rnd() * 100,
    size: 2 + rnd() * 4,
    delay: rnd() * 4,
    dur: 2.4 + rnd() * 3,
  }));
}

/** Ambient field of drifting, twinkling sparks. */
export function SparkleField({
  count = 26,
  seed = 3,
  className,
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [sparks] = useState(() => makeSparks(count, seed));

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {sparks.map((sp) => (
        <motion.span
          key={sp.id}
          className="absolute rounded-full bg-primary-glow"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            width: sp.size,
            height: sp.size,
            boxShadow: "0 0 10px 2px color-mix(in oklab, var(--primary-glow) 70%, transparent)",
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            reduce
              ? { opacity: 0.5 }
              : { opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4], y: [0, -26, 0] }
          }
          transition={{ duration: sp.dur, delay: sp.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Wraps inline text with orbiting four-point sparks. */
export function SparkleText({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const points = [
    { x: "-6%", y: "-18%", d: 0, s: 14 },
    { x: "48%", y: "-32%", d: 0.9, s: 10 },
    { x: "101%", y: "12%", d: 1.6, s: 16 },
    { x: "84%", y: "88%", d: 2.4, s: 11 },
  ];

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      {points.map((p, i) => (
        <motion.svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute text-primary-glow"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={reduce ? { opacity: 0.8, scale: 1 } : { opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 2.6, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            fill="currentColor"
            d="M12 0c.7 5.7 5.6 10.6 11.3 11.3C17.6 12 12.7 16.9 12 22.6 11.3 16.9 6.4 12 .7 11.3 6.4 10.6 11.3 5.7 12 0z"
          />
        </motion.svg>
      ))}
    </span>
  );
}

/** Cursor-following spark comet with a soft trailing halo. */
export function SparkCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="absolute inset-0 m-auto block size-2 rounded-full bg-primary-glow"
          style={{ boxShadow: "0 0 16px 4px color-mix(in oklab, var(--primary-glow) 75%, transparent)" }}
          animate={{ scale: [1, 1.45, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="block size-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_70%)]" />
      </div>
    </motion.div>
  );
}

/** Card wrapper: tilts toward the pointer and emits sparks on hover. */
export function SparkCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("relative", className)}
    >
      {children}
      {hover && !reduce ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <SparkleField count={10} seed={7} />
        </div>
      ) : null}
    </motion.div>
  );
}
