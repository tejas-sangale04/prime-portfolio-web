import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Hanging lanyard ID card.
 *
 * The strap is a small Verlet rope pinned at the top centre of the stage; the
 * card hangs from the last rope point and tilts with the last segment. Drag
 * the card to swing it, release to let it fall back, click (or Enter) to flip.
 * Coordinates are relative to the anchor, so the server render already shows
 * the card at rest and the simulation only takes over on the client.
 */

const POINTS = 10;
const GRAVITY = 0.55;
const DAMPING = 0.975;
const ITERATIONS = 14;

type Vec = { x: number; y: number };
type Pt = Vec & { px: number; py: number };

function useCardSize() {
  const [size, setSize] = useState({ w: 250, h: 440, rope: 170 });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () =>
      setSize(mq.matches ? { w: 250, h: 440, rope: 170 } : { w: 210, h: 370, rope: 120 });
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return size;
}

export function IdCard() {
  const reduce = useReducedMotion();
  const { w, h, rope } = useCardSize();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const strapHiRef = useRef<SVGPathElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Mutable simulation state lives in refs so frames never re-render React.
  const pts = useRef<Pt[]>([]);
  const drag = useRef<{ target: Vec; offset: Vec; start: Vec; moved: boolean } | null>(null);
  const angle = useRef(0);

  useEffect(() => {
    const seg = rope / (POINTS - 1);
    // Start swung out to one side so the card swings in on load.
    const start = reduce ? 0 : -1.1;
    pts.current = Array.from({ length: POINTS }, (_, i) => {
      const x = Math.sin(start) * i * seg;
      const y = Math.cos(start) * i * seg;
      return { x, y, px: x, py: y };
    });
    angle.current = 0;

    const render = () => {
      const p = pts.current;
      const last = p[POINTS - 1];
      let d = `M ${p[0].x} ${p[0].y}`;
      for (let i = 1; i < POINTS - 1; i++) {
        const mx = (p[i].x + p[i + 1].x) / 2;
        const my = (p[i].y + p[i + 1].y) / 2;
        d += ` Q ${p[i].x} ${p[i].y} ${mx} ${my}`;
      }
      d += ` L ${last.x} ${last.y}`;
      strapRef.current?.setAttribute("d", d);
      strapHiRef.current?.setAttribute("d", d);
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${last.x - w / 2}px, ${last.y}px) rotate(${angle.current}deg)`;
      }
    };

    if (reduce) {
      angle.current = 0;
      render();
      return;
    }

    let raf = 0;
    let t = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(step);
    });
    if (stageRef.current) io.observe(stageRef.current);

    // Fixed 60 Hz physics steps so the swing feels the same at any frame rate.
    let lastTime = 0;
    let acc = 0;
    function step(now: number) {
      raf = 0;
      if (!visible) {
        lastTime = 0;
        return;
      }
      acc += lastTime ? Math.min(now - lastTime, 100) : 1000 / 60;
      lastTime = now;
      while (acc >= 1000 / 60) {
        tick();
        acc -= 1000 / 60;
      }
      render();
      raf = requestAnimationFrame(step);
    }

    function tick() {
      t += 1;
      const p = pts.current;
      const wind = drag.current ? 0 : Math.sin(t / 110) * 0.02;

      for (let i = 1; i < POINTS; i++) {
        const pt = p[i];
        const vx = (pt.x - pt.px) * DAMPING;
        const vy = (pt.y - pt.py) * DAMPING;
        pt.px = pt.x;
        pt.py = pt.y;
        pt.x += vx + wind * (i / POINTS);
        pt.y += vy + GRAVITY;
      }

      for (let k = 0; k < ITERATIONS; k++) {
        p[0].x = 0;
        p[0].y = 0;
        if (drag.current) {
          p[POINTS - 1].x = drag.current.target.x;
          p[POINTS - 1].y = drag.current.target.y;
        }
        for (let i = 0; i < POINTS - 1; i++) {
          const a = p[i];
          const b = p[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - seg) / dist / 2;
          if (i > 0) {
            a.x += dx * diff;
            a.y += dy * diff;
          }
          b.x -= dx * diff;
          b.y -= dy * diff;
        }
      }

      const last = p[POINTS - 1];
      const prev = p[POINTS - 2];
      const target = (Math.atan2(last.x - prev.x, last.y - prev.y) * 180) / Math.PI;
      angle.current += (-target - angle.current) * 0.35;
    }

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce, rope, w, h]);

  const toLocal = (e: React.PointerEvent): Vec => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - (r.left + r.width / 2), y: e.clientY - r.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduce) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = toLocal(e);
    const last = pts.current[POINTS - 1];
    drag.current = {
      target: { x: last.x, y: last.y },
      offset: { x: pos.x - last.x, y: pos.y - last.y },
      start: pos,
      moved: false,
    };
    setDragging(true);
  };

  // Hovering nudges the card: kick the lower rope points along the pointer's motion.
  const push = (dx: number) => {
    if (reduce || drag.current) return;
    const p = pts.current;
    for (let i = 1; i < POINTS; i++) p[i].px -= dx * (i / (POINTS - 1));
  };

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    // Entering from the left swings it right, and vice versa.
    push(e.clientX < r.left + r.width / 2 ? 7 : -7);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) {
      if (e.pointerType === "mouse") push(Math.max(-1.5, Math.min(1.5, e.movementX * 0.12)));
      return;
    }
    const pos = toLocal(e);
    if (Math.hypot(pos.x - d.start.x, pos.y - d.start.y) > 5) d.moved = true;
    // Keep the strap from stretching much past its length.
    let x = pos.x - d.offset.x;
    let y = pos.y - d.offset.y;
    const len = Math.hypot(x, y);
    const max = rope * 1.25;
    if (len > max) {
      x = (x / len) * max;
      y = (y / len) * max;
    }
    d.target = { x, y };
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (d && !d.moved) setFlipped((f) => !f);
  };

  return (
    <div
      ref={stageRef}
      className="relative mx-auto w-full select-none"
      style={{ height: rope + h + 64 }}
    >
      {/* ceiling clip the strap hangs from */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-20 h-3 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-secondary shadow-lg"
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-10 overflow-visible"
        width="1"
        height="1"
      >
        <defs>
          <linearGradient id="strap-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--strap-from, var(--primary))" />
            <stop offset="100%" stopColor="var(--strap-to, var(--primary-glow))" />
          </linearGradient>
        </defs>
        <path
          ref={strapRef}
          d={`M 0 0 L 0 ${rope}`}
          fill="none"
          stroke="url(#strap-grad)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          ref={strapHiRef}
          d={`M 0 0 L 0 ${rope}`}
          fill="none"
          stroke="oklch(1 0 0 / 0.35)"
          strokeWidth={1.5}
          strokeDasharray="6 7"
        />
      </svg>

      <div
        ref={cardRef}
        className="absolute left-1/2 top-0 z-20 origin-top will-change-transform"
        style={{ width: w, transform: `translate(${-w / 2}px, ${rope}px)` }}
      >
        {/* metal clip joining strap and card */}
        <div
          aria-hidden="true"
          className="mx-auto h-5 w-8 rounded-t-md border border-white/20 bg-gradient-to-b from-zinc-300 to-zinc-500 shadow"
        />
        <div
          role="button"
          tabIndex={0}
          aria-label={
            flipped ? "ID card, back side. Press to flip." : "ID card, front side. Press to flip."
          }
          aria-pressed={flipped}
          onPointerDown={onPointerDown}
          onPointerEnter={onPointerEnter}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
          className={cn(
            "relative -mt-1 touch-none rounded-3xl outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-ring",
            dragging ? "cursor-grabbing" : "cursor-grab",
            // Lift the card toward the viewer on hover, as on the reference site.
            reduce ? "" : "transition-transform duration-500 ease-out hover:scale-[1.07]",
          )}
          style={{ height: h }}
        >
          <div
            className="relative size-full transition-transform duration-700 [transform-style:preserve-3d]"
            style={{
              transform: flipped ? "rotateY(180deg)" : "none",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <CardFront />
            <CardBack />
          </div>
        </div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[11px] text-muted-foreground/80">
        {reduce ? "Click the card to flip it" : "Hover or drag to swing · click to flip"}
      </p>
    </div>
  );
}

const face =
  "absolute inset-0 overflow-hidden rounded-3xl border-4 border-zinc-400/40 [backface-visibility:hidden] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7),0_0_40px_-10px_color-mix(in_oklab,var(--primary)_45%,transparent)]";

function CardFront() {
  return (
    <div className={cn(face, "flex flex-col bg-card")}>
      {/* profile photo — public/portfolio_img.png */}
      <div className="relative flex h-[56%] items-center justify-center bg-muted">
        <span className="absolute top-3 right-3 z-10 rounded-full bg-amber-500/90 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
          Nashik
        </span>
        <User className="absolute size-14 text-muted-foreground/40" aria-hidden="true" />
        <img
          src="/portfolio_img.png"
          alt="Tejas Sangale"
          className="relative size-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-4 text-left">
        <p className="text-xl leading-tight font-bold text-foreground">
          Tejas <span className="text-primary">Sangale</span>
        </p>
       {/* <p className="mt-1 text-sm font-semibold text-foreground">Full Stack Developer</p>*/}
        <p className="mt-1 text-[10px] tracking-widest text-muted-foreground uppercase">
          B.E. Computer Engineering
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            { label: "OOPs", classes: "bg-violet-500/15 text-violet-300 light:text-violet-700" },
            { label: "Python", classes: "bg-sky-500/15 text-sky-300 light:text-sky-700" },
            { label: "React", classes: "bg-emerald-500/15 text-emerald-300 light:text-emerald-700" },
          ].map((s) => (
            <span
              key={s.label}
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                s.classes,
              )}
            >
              {s.label}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between text-[9px] tracking-widest text-muted-foreground uppercase">
          <span>ID 0426-FSD</span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-chart-3" /> Open to work
          </span>
        </div>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className={cn(face, "flex flex-col bg-card p-5 [transform:rotateY(180deg)]")}>
      <p className="font-hero text-2xl leading-[1.05] font-black text-foreground">
        Nice to
        <br />
        <span className="font-serif text-2xl font-semibold text-primary italic">meet you.</span>
      </p>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        At a glance
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          { k: "6+", v: "Projects" },
          { k: "500+", v: "DSA" },
          { k: "8+", v: "Certs" },
        ].map((s) => (
          <div key={s.v} className="rounded-xl bg-secondary/60 p-2">
            <p className="text-base font-bold text-primary">{s.k}</p>
            <p className="text-[10px] text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Builds AI-powered web & mobile products. Focused on clean architecture, performance and
        accessible UI.
      </p>

      <div className="my-auto flex items-center justify-between gap-3">
        <div className="text-[10px] leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Let's connect</p>
          <p>tejassangale90@gmail.com</p>
          <p>github.com/tejas-sangale04</p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1">
          <QrPattern className="size-16" />
          <p className="text-[8px] font-bold uppercase tracking-wide text-muted-foreground">
            Scan for résumé
          </p>
        </div>
      </div>
    </div>
  );
}

function QrPattern({ className }: { className?: string }) {
  const n = 11;
  const finder = (x: number, y: number) =>
    (x < 3 && y < 3) || (x >= n - 3 && y < 3) || (x < 3 && y >= n - 3);
  return (
    <div
      aria-hidden="true"
      className={cn("grid gap-px rounded-lg bg-foreground p-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
    >
      {Array.from({ length: n * n }, (_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const on = finder(x, y)
          ? !(x % (n - 3) === 1 && y % (n - 3) === 1)
          : (x * 31 + y * 17 + x * y) % 3 === 0;
        return <span key={i} className={on ? "bg-background" : ""} />;
      })}
    </div>
  );
}
