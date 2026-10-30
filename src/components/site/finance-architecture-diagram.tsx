import { motion } from "motion/react";

/*
 * Architecture diagram for FinanceFlow: one left-to-right flow, from the
 * accounts it aggregates to the dashboard that draws them. Boxes fade in in
 * order and the arrows draw themselves; `motion` skips both for
 * reduced-motion users.
 */

type Node = {
  label: string;
  sub: string;
  color: string;
};

const NODES: Node[] = [
  { label: "Banks & cards", sub: "+ investments", color: "var(--color-chart-4)" },
  { label: "Plaid", sub: "secure linking", color: "oklch(0.72 0.17 150)" },
  { label: "Express API", sub: "categorise · budget", color: "var(--color-primary)" },
  { label: "MongoDB", sub: "accounts · spending", color: "var(--color-chart-4)" },
  { label: "React dashboard", sub: "net worth · charts", color: "var(--color-chart-2)" },
];

const W = 140;
const H = 56;
const GAP = 32;
const Y = 24;
const X = (i: number) => 8 + i * (W + GAP);

export function FinanceArchitectureDiagram() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 844 104"
        className="w-full"
        role="img"
        aria-label="FinanceFlow architecture: banks, cards and investment accounts are linked securely through Plaid, an Express API categorises the transactions and tracks budgets, the data is stored in MongoDB, and a React dashboard draws spending and net worth."
      >
        <defs>
          <marker
            id="fin-arch-arrow"
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
          {NODES.slice(1).map((n, i) => (
            <motion.line
              key={n.label}
              x1={X(i) + W}
              y1={Y + H / 2}
              x2={X(i + 1)}
              y2={Y + H / 2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              markerEnd="url(#fin-arch-arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.16, ease: "easeOut" }}
            />
          ))}
        </g>

        {NODES.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect
              x={X(i)}
              y={Y}
              width={W}
              height={H}
              rx={14}
              fill={n.color}
              fillOpacity={0.12}
              stroke={n.color}
              strokeOpacity={0.45}
            />
            <text
              x={X(i) + W / 2}
              y={Y + 25}
              textAnchor="middle"
              className="fill-foreground text-[14px] font-semibold"
            >
              {n.label}
            </text>
            <text
              x={X(i) + W / 2}
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
