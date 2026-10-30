import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";
import { FinanceArchitectureDiagram } from "@/components/site/finance-architecture-diagram";

type Project = {
  title: string;
  tagline: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** A screenshot or poster in `public/projects/`, shown beside the row. */
  image?: string;
  /** Headline result, shown on the card. */
  metric?: { value: string; label: string };
  detail?: {
    problem: string;
    hard: string;
    diagram?: ReactNode;
  };
};

const PROJECTS: Project[] = [
  {
    title: "InvoiceFlow",
    tagline:
      "An agent-based accounts-payable system. Upload a supplier invoice and an AI agent reads it, runs a 3-way match against the purchase order and delivery, then approves, holds or escalates it.",
    tech: ["Python", "FastAPI", "Google ADK", "Gemini 2.5", "React", "Firestore", "Cloud Run"],
    github: "https://github.com/tejas-sangale04/Invoice-to-payment-agent",

    image: "/projects/invoiceflow.png",
    metric: { value: "180/180", label: "decisions correct across 60 eval cases" },
    detail: {
      problem:
        "Accounts-payable teams check every invoice by hand against what was ordered and what arrived. It is slow, and overcharges and duplicate invoices slip through.",
      hard: "An LLM must never decide what to pay. Gemini only reads the invoice into a strict schema; code does every calculation, the match and the decision, and routes anything uncertain to a person. Posting runs in one Firestore transaction keyed by supplier and invoice number, so an invoice is paid exactly once even if two copies are approved at the same moment.",
      diagram: <ArchitectureDiagram />,
    },
  },
  {
    title: "FinanceFlow",
    tagline:
      "A personal-finance dashboard that links a real bank account through Plaid, then reads balances and accounts behind a signed-in session. The bank access token is encrypted before it is ever stored.",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Plaid", "JWT", "Tailwind"],
    github: "https://github.com/tejas-sangale04/financialDashboard",
    detail: {
      problem:
        "Pulling your own spending into one place means handing an app read access to your bank. The moment it holds that access, the app is the weak point, so the interesting work is not the charts, it is keeping the credential safe.",
      hard: "Plaid hands back one long-lived access token per linked bank, and it must never reach the browser. The public token is swapped for it server-side, encrypted with AES-256-CBC under a fresh random IV, and stored in a Mongo field marked select: false, so an ordinary query cannot read it back by accident. It is decrypted only in the request that calls Plaid. Sessions are split the same way: a 10-minute access token the client holds and a 30-day refresh token in an httpOnly cookie, so a leaked access token expires on its own.",
      diagram: <FinanceArchitectureDiagram />,
    },
  },
  {
    title: "Coffee Barista",
    tagline:
      "A RAG-based recommendation agent that suggests coffee from a customer's taste and context.",
    tech: ["Python", "RAG", "Vector DB", "Gemini"],
    github: "https://github.com/tejas-sangale04/Coffee-Barista",
  },
  {
    title: "Interview AI",
    tagline: "Interview practice with resume analysis, mock interviews and a performance report.",
    tech: ["React", "Node.js", "Gemini API", "MongoDB"],
    github: "https://github.com/tejas-sangale04/Interview-AI",
  },
  {
    title: "Intrusion Detection System",
    tagline: "Network intrusion detection with a Random Forest classifier.",
    tech: ["Python", "scikit-learn", "Pandas"],
    github: "https://github.com/tejas-sangale04/Intrusion-Detection-System-using-Random-Forest",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `project-${index}-detail`;

  return (
    <motion.li
      className="group border-t border-border py-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease }}
    >
      <div className="grid gap-6 lg:grid-cols-[72px_1fr_1.05fr] lg:items-start">
        <span
          className="font-hero text-3xl font-black text-muted-foreground/35 transition-colors group-hover:text-emerald-400/70"
          style={{ fontStretch: "112%" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3
            className="font-hero text-3xl font-black tracking-[-0.02em] text-foreground sm:text-4xl"
            style={{ fontStretch: "112%" }}
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          {project.metric ? (
            <p className="mt-5 inline-flex items-baseline gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-2">
              <span
                className="font-hero text-xl font-black text-emerald-300"
                style={{ fontStretch: "112%" }}
              >
                {project.metric.value}
              </span>
              <span className="text-xs text-muted-foreground">{project.metric.label}</span>
            </p>
          ) : null}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {project.image ? (
          <motion.a
            href={project.demo ?? project.github ?? project.image}
            target="_blank"
            rel="noreferrer"
            className="order-last block overflow-hidden rounded-2xl border border-border bg-background/50 lg:order-none lg:col-start-3 lg:row-span-2"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full transition-transform duration-500 hover:scale-[1.02]"
            />
          </motion.a>
        ) : null}

        <div className="flex flex-wrap items-center gap-4 lg:col-span-2 lg:col-start-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" /> Code
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20"
            >
              <ExternalLink className="size-4" /> Live site
            </a>
          ) : null}
          {project.detail ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-emerald-500/40 hover:text-emerald-200"
            >
              How it works
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && project.detail ? (
          <motion.div
            id={panelId}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="mt-8 space-y-10 rounded-3xl border border-border bg-background/50 p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
                      The problem
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.detail.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
                      The hard part
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.detail.hard}
                    </p>
                  </div>
                </div>
                {project.detail.diagram ? (
                  <div>
                    <h4 className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase">
                      Architecture
                    </h4>
                    <div className="mt-4 overflow-x-auto">
                      <div className="min-w-[560px]">{project.detail.diagram}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            Projects
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Open a project to see how it's built
          </p>
        </Reveal>

        <ul className="mt-14 border-b border-border">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
