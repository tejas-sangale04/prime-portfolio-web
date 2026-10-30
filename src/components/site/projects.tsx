import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";
import { FlowDiagram } from "@/components/site/flow-diagram";

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
    demo: "https://invoiceflow-web-6060358211.asia-south1.run.app/login",
  },
  {
    title: "FinanceFlow",
    tagline:
      "A personal finance dashboard that pulls bank accounts, credit cards and investment platforms into one view, with secure account aggregation, transaction categorisation, budgets and net-worth charts.",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Plaid", "JWT", "Tailwind"],
    github: "https://github.com/tejas-sangale04/financialDashboard",
    image: "/projects/financeflow.png",
    demo: "https://financial-dashboard-teal-eta.vercel.app/",
    detail: {
      problem:
        "Money is spread across several banks, cards and investment platforms, so nothing shows what you actually have or where it went this month. FinanceFlow aggregates all of it into one screen and keeps the APIs fast enough for the charts to stay responsive.",
      hard: "Linking a real bank means holding a credential that must never reach the browser. Plaid's public token is exchanged on the server, and the access token it returns is encrypted with AES-256-CBC before it is stored and decrypted only for the call that uses it. The session is split the same way: a short-lived access token the client holds and a long refresh token in an httpOnly cookie, so a leaked token expires on its own.",
      diagram: (
        <FlowDiagram
          label="FinanceFlow architecture: banks, cards and investment accounts are linked securely through Plaid, an Express API categorises the transactions and tracks budgets, the data is stored in MongoDB, and a React dashboard draws spending and net worth."
          nodes={[
            { label: "Banks & cards", sub: "+ investments", tone: "source" },
            { label: "Plaid", sub: "secure linking", tone: "ai" },
            { label: "Express API", sub: "categorise · budget", tone: "api" },
            { label: "MongoDB", sub: "accounts · spending", tone: "store" },
            { label: "React dashboard", sub: "net worth · charts", tone: "ui" },
          ]}
        />
      ),
    },
  },
  {
    title: "Coffee Barista",
    tagline:
      "Ask for coffee the way you would ask a barista — \u201ca cold vegan one under \u20b9400\u201d — and a chain of agents reads the request, searches a real menu by meaning and recommends from it.",
    tech: ["Python", "FastAPI", "Google ADK", "Gemini 2.5", "RAG", "Firestore", "Streamlit"],
    github: "https://github.com/tejas-sangale04/Coffee-Barista",
    detail: {
      problem:
        "A recommendation only helps if it is real. Ask a plain chatbot for a cold vegan coffee under \u20b9400 and it will happily invent a drink, a price and a calorie count that the shop has never sold.",
      hard: "Nothing the model says is trusted on its own. A guardrail agent first decides whether the question is even about coffee, a preference agent turns it into a structured set of constraints, and Firestore vector search pulls semantically similar menu items. Those candidates then go through deterministic Python filtering on price, diet, calories and availability, and the recommendation the model writes is validated back against the retrieved items before it reaches the user, so a wrong name or price cannot get through.",
      diagram: (
        <FlowDiagram
          label="Coffee Barista architecture: a guardrail agent checks the question is about coffee, a preference agent extracts structured constraints, Firestore vector search retrieves similar menu items, deterministic Python filtering applies the hard constraints, and the recommendation agent's answer is validated against the retrieved items."
          nodes={[
            { label: "Question", sub: "natural language", tone: "source" },
            { label: "Guardrail", sub: "+ preferences", tone: "ai" },
            { label: "Vector search", sub: "Firestore · cosine", tone: "store" },
            { label: "Hard filter", sub: "code, not LLM", tone: "api" },
            { label: "Recommend", sub: "then validate", tone: "ai" },
          ]}
        />
      ),
    },
  },
  {
    title: "Interview AI",
    tagline:
      "Upload a resume and a target role, and get back a match score, technical and behavioural questions with model answers, your skill gaps and a day-by-day preparation plan.",
    tech: ["React", "Node.js", "Express", "OpenAI", "MongoDB", "Puppeteer", "Zod"],
    github: "https://github.com/tejas-sangale04/Interview-AI",
    demo: "https://interview-ai-five-gamma.vercel.app",
    detail: {
      problem:
        "Interview prep is generic: question lists that ignore your resume and the role you are actually applying for, with no sense of what you are weakest at or what to study first.",
      hard: "The report is a deep, nested object — questions with their intent and a model answer, skill gaps with a severity, a numbered plan — and a language model will not return the same shape twice. It answers in snake_case one time and camelCase the next, sends a bare string where an array of objects belongs, or wraps JSON inside a JSON string. The schema is declared with Zod, and everything that comes back is unwrapped, renamed and rebuilt into that schema before it touches the database, with a second model wired in as a fallback. A shared budget on the API key is counted in MongoDB so a public demo cannot run up the bill.",
      diagram: (
        <FlowDiagram
          label="Interview AI architecture: a resume PDF and a target role are uploaded, the PDF text is extracted, a language model returns a structured report, the response is normalised and validated against a Zod schema, and the report is stored in MongoDB and shown in the React app."
          nodes={[
            { label: "Resume + role", sub: "PDF upload", tone: "source" },
            { label: "Extract text", sub: "pdf-parse", tone: "api" },
            { label: "LLM report", sub: "schema-guided", tone: "ai" },
            { label: "Normalise", sub: "Zod validate", tone: "api" },
            { label: "MongoDB", sub: "report · history", tone: "store" },
          ]}
        />
      ),
    },
  },
  {
    title: "Intrusion Detection System",
    tagline:
      "An explainable hybrid network intrusion detector on the CIC-IDS2017 flow dataset: a supervised Random Forest, an unsupervised Isolation Forest for the unknown, SHAP explanations, and a dashboard that replays real traffic.",
    tech: ["Python", "scikit-learn", "SHAP", "FastAPI", "React", "pandas"],
    github: "https://github.com/tejas-sangale04/Intrusion-Detection-System-using-Random-Forest",
    metric: { value: "99.6%", label: "recall on known attacks, at a 0.09% false-positive rate" },
    detail: {
      problem:
        "Intrusion detectors are reported by their accuracy on the attacks they were trained on, which says almost nothing about the attack nobody has seen yet. The question this project set out to answer is what happens on the second kind.",
      hard: "Measuring the gap honestly, and then trying to close it. Holding an entire attack family out of training drops recall on it to near zero \u2014 0% on Bot, 0.07% on brute force \u2014 so a benign-only Isolation Forest was added to flag what simply looks unusual; at a 5% false-positive budget the hybrid recovers 82% of unseen DDoS and 54% of unseen DoS, and almost nothing on the rest. SHAP then showed why: for web attacks the classifier leans on a timing feature that looks like an artefact of how the dataset was recorded. Every number is reproduced by the code in the repo, and the deployed API replays all 378,355 test flows to the same results.",
      diagram: (
        <FlowDiagram
          label="Intrusion detection architecture: CIC-IDS2017 flow records are cleaned, de-duplicated and split, a Random Forest and a benign-only Isolation Forest score each flow, SHAP explains the decision, and a FastAPI service feeds a React dashboard replaying the traffic."
          nodes={[
            { label: "Flow records", sub: "CIC-IDS2017", tone: "source" },
            { label: "Clean & split", sub: "leakage-safe", tone: "api" },
            { label: "RF + anomaly", sub: "known · unknown", tone: "ai" },
            { label: "SHAP", sub: "why it flagged", tone: "store" },
            { label: "Dashboard", sub: "FastAPI · React", tone: "ui" },
          ]}
        />
      ),
    },
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
