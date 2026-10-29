import { motion } from "motion/react";

/*
 * Architecture diagram for InvoiceFlow, drawn as SVG so it stays sharp,
 * themeable and animatable. Boxes fade in in order and the flow lines draw
 * themselves; `motion` skips both for reduced-motion users.
 */

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
  kind: "ui" | "api" | "ai" | "store";
};

const H = 46;

const NODES: Node[] = [
  { id: "ui", x: 10, y: 118, w: 128, label: "React UI", sub: "upload invoice", kind: "ui" },
  { id: "api", x: 178, y: 118, w: 128, label: "FastAPI", sub: "auth · storage", kind: "api" },
  { id: "task", x: 346, y: 118, w: 132, label: "Task queue", sub: "retry · resume", kind: "api" },
  { id: "extract", x: 346, y: 20, w: 132, label: "Extraction", sub: "Gemini + schema", kind: "ai" },
  { id: "match", x: 522, y: 118, w: 136, label: "3-way match", sub: "code, not LLM", kind: "api" },
  {
    id: "decide",
    x: 522,
    y: 216,
    w: 136,
    label: "Decision rules",
    sub: "first rule wins",
    kind: "api",
  },
  {
    id: "explain",
    x: 346,
    y: 216,
    w: 132,
    label: "Explanation",
    sub: "Gemini + checks",
    kind: "ai",
  },
  { id: "ledger", x: 700, y: 118, w: 128, label: "Ledger", sub: "posted once", kind: "store" },
  { id: "store", x: 700, y: 216, w: 128, label: "Firestore", sub: "audit log", kind: "store" },
];

const EDGES: [string, string][] = [
  ["ui", "api"],
  ["api", "task"],
  ["task", "extract"],
  ["task", "match"],
  ["match", "decide"],
  ["match", "ledger"],
  ["decide", "explain"],
  ["decide", "store"],
];

const FILL: Record<Node["kind"], string> = {
  ui: "var(--color-chart-2)",
  api: "var(--color-primary)",
  ai: "oklch(0.72 0.17 150)",
  store: "var(--color-chart-4)",
};

const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** Orthogonal path between two boxes: across, then up or down, then across. */
function edgePath(a: Node, b: Node) {
  const [ay, by] = [a.y + H / 2, b.y + H / 2];
  if (Math.abs(ay - by) < 2) return `M ${a.x + a.w} ${ay} L ${b.x} ${by}`;
  const mid = b.x + b.w / 2;
  if (mid > a.x && mid < a.x + a.w) {
    // Directly above or below: one vertical line.
    return `M ${mid} ${by < ay ? a.y : a.y + H} L ${mid} ${by < ay ? b.y + H : b.y}`;
  }
  const x = a.x + a.w + 18;
  return `M ${a.x + a.w} ${ay} L ${x} ${ay} L ${x} ${by} L ${b.x} ${by}`;
}

export function ArchitectureDiagram() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 838 282"
        className="w-full"
        role="img"
        aria-label="InvoiceFlow architecture: the React UI uploads an invoice to FastAPI, which stores the file and queues a task. The task runs Gemini extraction, then a code-only three-way match and decision rules, which post to the ledger, write the audit log in Firestore and draft a supplier explanation."
      >
        <defs>
          <marker
            id="arch-arrow"
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
          {EDGES.map(([from, to], i) => (
            <motion.path
              key={`${from}-${to}`}
              d={edgePath(byId(from), byId(to))}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              markerEnd="url(#arch-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: "easeOut" }}
            />
          ))}
        </g>

        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={H}
              rx={12}
              fill={FILL[n.kind]}
              fillOpacity={0.12}
              stroke={FILL[n.kind]}
              strokeOpacity={0.45}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + (n.sub ? 20 : 27)}
              textAnchor="middle"
              className="fill-foreground text-[13px] font-semibold"
            >
              {n.label}
            </text>
            {n.sub ? (
              <text
                x={n.x + n.w / 2}
                y={n.y + 34}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {n.sub}
              </text>
            ) : null}
          </motion.g>
        ))}
      </svg>

      <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {(
          [
            ["ui", "Frontend"],
            ["api", "Backend / rules"],
            ["ai", "AI agent"],
            ["store", "Data"],
          ] as [Node["kind"], string][]
        ).map(([kind, label]) => (
          <span key={kind} className="inline-flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: FILL[kind], opacity: 0.8 }}
            />
            {label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
