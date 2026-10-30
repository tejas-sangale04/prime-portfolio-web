import { motion } from "motion/react";
import { BadgeCheck, Cloud, Code2, Coffee, Cpu, ExternalLink, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  Icon: LucideIcon;
  detail: string;
  /** What it actually covered, as short tags. */
  covers: string[];
  /** Public credential URL, if there is one. */
  link?: string;
};

const CERTS: Cert[] = [
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    year: "2024",
    Icon: Coffee,
    detail:
      "Core Java and object-oriented design, taken as a 12-week NPTEL course with a proctored exam.",
    covers: ["OOP design", "Collections", "Exceptions", "Concurrency"],
  },
  {
    title: "Modern C++",
    issuer: "NPTEL",
    year: "2024",
    Icon: Code2,
    detail: "The parts of modern C++ that change how you write it: ownership, moves and templates.",
    covers: ["Smart pointers", "Move semantics", "Templates", "STL"],
  },
  {
    title: "Full Stack Web Development",
    issuer: "Online certification",
    year: "2024",
    Icon: Globe,
    detail:
      "Building and shipping a full stack application end to end, from the API to deployment.",
    covers: ["React", "Node.js", "REST APIs", "Deployment"],
  },
  {
    title: "AI & Machine Learning",
    issuer: "Online certification",
    year: "2025",
    Icon: Cpu,
    detail: "Classical machine learning through to the LLM workflows used in the projects above.",
    covers: ["Supervised learning", "Neural networks", "Evaluation", "Applied LLMs"],
  },
  {
    title: "Cloud Fundamentals",
    issuer: "Cloud provider",
    year: "2025",
    Icon: Cloud,
    detail:
      "The groundwork behind deploying these projects on Cloud Run and keeping the bill small.",
    covers: ["Compute", "Storage", "Networking", "IAM"],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(2.25rem,7.5vw,6.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            Certifications
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            What I studied, and what it covered
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {CERTS.map((c, i) => (
            <motion.li
              key={c.title}
              className="group flex flex-col rounded-3xl border border-border bg-background/50 p-6 transition-colors hover:border-emerald-500/35 sm:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 transition-colors group-hover:bg-emerald-500/20">
                  <c.Icon className="size-5" aria-hidden="true" />
                </span>
                <BadgeCheck className="size-5 text-emerald-400/60" aria-hidden="true" />
              </div>

              <h3
                className="mt-5 font-hero text-xl font-black tracking-[-0.01em] text-foreground"
                style={{ fontStretch: "112%" }}
              >
                {c.title}
              </h3>
              <p className="mt-1.5 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {c.issuer} · {c.year}
              </p>

              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{c.detail}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {c.covers.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-200"
                >
                  <ExternalLink className="size-4" aria-hidden="true" /> View credential
                </a>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
