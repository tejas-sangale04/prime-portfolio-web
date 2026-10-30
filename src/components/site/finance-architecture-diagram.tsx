import { motion } from "motion/react";

/*
 * Architecture diagram for FinanceFlow, drawn the same way as the InvoiceFlow
 * one: SVG so it stays sharp and themeable, boxes fading in in order and the
 * flow lines drawing themselves, with `motion` skipping both for
 * reduced-motion users.
 */

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
  kind: "ui" | "api" | "plaid" | "crypto";
};

const H = 46;

const NODES: Node[] = [
  { id: "ui", x: 10, y: 118, w: 128, label: "React UI", sub: "Plaid Link", kind: "ui" },
  { id: "auth", x: 178, y: 20, w: 128, label: "Auth", sub: "bcrypt + JWT", kind: "api" },
  {
    id: "session",
    x: 346,
    y: 20,
    w: 132,
    label: "Session tokens",
    sub: "10 min · 30 day cookie",
    kind: "api",
  },
  { id: "api", x: 178, y: 118, w: 128, label: "Express API", sub: "auth guard", kind: "api" },
  {
    id: "exchange",
    x: 346,
    y: 118,
    w: 132,
    label: "Token exchange",
    sub: "public → access",
    kind: "plaid",
  },
  {
    id: "crypto",
    x: 522,
    y: 118,
    w: 136,
    label: "AES-256-CBC",
    sub: "random IV per token",
    kind: "crypto",
  },
  { id: "store", x: 700, y: 118, w: 128, label: "MongoDB", sub: "select: false", kind: "crypto" },
  {
    id: "balances",
    x: 522,
    y: 216,
    w: 136,
    label: "Balances & accounts",
    sub: "Plaid /auth",
    kind: "plaid",
  },
  {
    id: "decrypt",
    x: 700,
    y: 216,
    w: 128,
    label: "Decrypt on use",
    sub: "never leaves server",
    kind: "crypto",
  },
];

const EDGES: [string, string][] = [
  ["ui", "api"],
  ["api", "auth"],
  ["auth", "session"],
  ["api", "exchange"],
  ["exchange", "crypto"],
  ["crypto", "store"],
  ["store", "decrypt"],
  ["decrypt", "balances"],
];

const FILL: Record<Node["kind"], string> = {
  ui: "var(--color-chart-2)",
  api: "var(--color-primary)",
  plaid: "oklch(0.72 0.17 150)",
  crypto: "var(--color-chart-4)",
};

const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** Orthogonal path between two boxes: across, then up or down, then across. */
function edgePath(a: Node, b: Node) {
  const [ay, by] = [a.y + H / 2, b.y + H / 2];
  if (Math.abs(ay - by) < 2) {
    // Side by side: draw from whichever edge faces the other box.
    return b.x > a.x
      ? `M ${a.x + a.w} ${ay} L ${b.x} ${by}`
      : `M ${a.x} ${ay} L ${b.x + b.w} ${by}`;
  }
  const mid = b.x + b.w / 2;
  if (mid > a.x && mid < a.x + a.w) {
    // Directly above or below: one vertical line.
    return `M ${mid} ${by < ay ? a.y : a.y + H} L ${mid} ${by < ay ? b.y + H : b.y}`;
  }
  const x = a.x + a.w + 18;
  return `M ${a.x + a.w} ${ay} L ${x} ${ay} L ${x} ${by} L ${b.x} ${by}`;
}

export function FinanceArchitectureDiagram() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 838 282"
        className="w-full"
        role="img"
        aria-label="FinanceFlow architecture: the React UI opens Plaid Link and calls the Express API, which signs the user in with bcrypt and issues a short access token plus a long refresh cookie. The API exchanges Plaid's public token for an access token, encrypts it with AES-256-CBC and stores it in MongoDB in a field that is never selected by default; it is decrypted only on the server when fetching balances and accounts from Plaid."
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
          {EDGES.map(([from, to], i) => (
            <motion.path
              key={`${from}-${to}`}
              d={edgePath(byId(from), byId(to))}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              markerEnd="url(#fin-arch-arrow)"
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
            ["api", "Backend / auth"],
            ["plaid", "Plaid"],
            ["crypto", "Encrypted store"],
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
