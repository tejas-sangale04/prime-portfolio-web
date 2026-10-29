import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { SkillIcon, type SkillIconSource } from "@/components/site/skill-icon";

/*
 * A rotating 3D sphere of skill labels.
 *
 * Labels sit on a Fibonacci sphere and are projected with plain CSS
 * transforms, so no WebGL is needed. It spins slowly on its own, follows a
 * drag, and keeps the drag's momentum. Positions update through refs, so
 * frames never re-render React; only `active` (the hovered category) does.
 */

export type SphereSkill = { label: string; category: string; icon: SkillIconSource };

const FRICTION = 0.95;
const IDLE = { x: 0.0012, y: 0.0035 };

export function SkillSphere({
  skills,
  active,
  className,
}: {
  skills: SphereSkill[];
  active: string | null;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const vel = useRef({ ...IDLE });
  const rot = useRef({ x: -0.3, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  // Unit-sphere positions, evenly spread.
  const points = useRef(
    skills.map((_, i) => {
      const n = skills.length;
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    }),
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const render = () => {
      const radius = stage.clientWidth / 2.25;
      const { x: ax, y: ay } = rot.current;
      const [sx, cx, sy, cy] = [Math.sin(ax), Math.cos(ax), Math.sin(ay), Math.cos(ay)];
      points.current.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // Rotate around Y, then X.
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const scale = 0.6 + depth * 0.6;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    if (reduce) {
      render();
      return;
    }

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(step);
    });
    io.observe(stage);

    function step() {
      raf = 0;
      if (!visible) return;
      if (!drag.current) {
        // Ease back toward the idle spin after a flick.
        vel.current.x = vel.current.x * FRICTION + IDLE.x * (1 - FRICTION);
        vel.current.y = vel.current.y * FRICTION + IDLE.y * (1 - FRICTION);
      }
      rot.current.x += vel.current.x;
      rot.current.y += vel.current.y;
      render();
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduce) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    vel.current = { x: -dy * 0.004, y: dx * 0.004 };
    drag.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={`Skill sphere: ${skills.map((s) => s.label).join(", ")}`}
      className={cn(
        "relative aspect-square w-full touch-none select-none",
        reduce ? "" : "cursor-grab active:cursor-grabbing",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)] blur-2xl"
      />
      {skills.map((s, i) => {
        const on = active === s.category;
        return (
          <span
            key={s.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 left-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-hero text-xs font-bold whitespace-nowrap sm:text-sm transition-[color,background-color,box-shadow] duration-300 will-change-transform",
              on
                ? "bg-emerald-500/15 text-emerald-300 shadow-[0_0_18px] shadow-emerald-500/40"
                : active
                  ? "text-muted-foreground/50"
                  : "text-slate-300",
            )}
            style={{ fontStretch: "112%" }}
          >
            <SkillIcon icon={s.icon} className="size-3.5 shrink-0 sm:size-4" />
            {s.label}
          </span>
        );
      })}
    </div>
  );
}
