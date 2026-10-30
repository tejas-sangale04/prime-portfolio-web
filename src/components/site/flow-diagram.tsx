import { useId } from "react";
import { motion } from "motion/react";

/*
 * A project's architecture as one left-to-right flow.
 *
 * Deliberately plain: five or so boxes and an arrow between each pair, drawn
 * as SVG so it stays sharp and themeable. Boxes fade in in order and the
 * arrows draw themselves; `motion` skips both for reduced-motion users.
 */

export type FlowTone = "source" | "ai" | "api" | "store" | "ui";

export type FlowNode = {
  label: string;
  sub: string;
  tone: FlowTone;
};

const TONE: Record<FlowTone, string> = {
  source: "var(--color-chart-4)",
  ai: "oklch(0.72 0.17 150)",
  api: "var(--color-primary)",
  store: "var(--color-chart-5)",
  ui: "var(--color-chart-2)",
};

const W = 140;
const H = 56;
const GAP = 32;
const Y = 24;
const x = (i: number) => 8 + i * (W + GAP);

export function FlowDiagram({ nodes, label }: { nodes: FlowNode[]; label: string }) {
  // Markers are document-global, so each diagram needs its own id.
  const arrow = `flow-arrow-${useId().replace(/:/g, "")}`;
  const width = x(nodes.length - 1) + W + 8;

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${width} 104`} className="w-full" role="img" aria-label={label}>
        <defs>
          <marker
            id={arrow}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
          </marker>
        </defs>

        <g className="text-muted-foreground/60">
          {nodes.slice(1).map((n, i) => (
            <motion.line
              key={n.label}
              x1={x(i) + W}
              y1={Y + H / 2}
              x2={x(i + 1)}
              y2={Y + H / 2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              markerEnd={`url(#${arrow})`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.16, ease: "easeOut" }}
            />
          ))}
        </g>

        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={x(i)}
              y={Y}
              width={W}
              height={H}
              rx={14}
              fill={TONE[n.tone]}
              fillOpacity={0.12}
              stroke={TONE[n.tone]}
              strokeOpacity={0.45}
            />
            <text
              x={x(i) + W / 2}
              y={Y + 25}
              textAnchor="middle"
              className="fill-foreground text-[14px] font-semibold"
            >
              {n.label}
            </text>
            <text
              x={x(i) + W / 2}
              y={Y + 42}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  );
}
