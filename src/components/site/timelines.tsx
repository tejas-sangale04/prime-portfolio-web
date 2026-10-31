import { motion } from "motion/react";
import {
  Award,
  Briefcase,
  Code2,
  GitPullRequest,
  GraduationCap,
  Medal,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";

type Entry = {
  title: string;
  meta: string;
  period: string;
  copy: string;
  Icon: LucideIcon;
};

const EXPERIENCE: Entry[] = [
  {
    title: "Software Development Intern",
    meta: "Product startup · Remote",
    period: "2025",
    copy: "Built and shipped React + Node features, improved API response times and wrote integration tests for core flows.",
    Icon: Briefcase,
  },
  {
    title: "Hackathon Participant & Finalist",
    meta: "National & campus hackathons",
    period: "2024 — 2025",
    copy: "Prototyped AI-powered products under 36-hour deadlines, leading frontend and integration work for the team.",
    Icon: Trophy,
  },
  {
    title: "Open Source Contributor",
    meta: "JavaScript & Python ecosystems",
    period: "2024 — present",
    copy: "Merged bug fixes, documentation and accessibility improvements across community maintained repositories.",
    Icon: GitPullRequest,
  },
  {
    title: "Freelance Web Developer",
    meta: "Small businesses & creators",
    period: "2023 — present",
    copy: "Delivered responsive marketing sites and dashboards, handling design, development and deployment end to end.",
    Icon: Code2,
  },
];

type Achievement = {
  title: string;
  meta: string;
  Icon: LucideIcon;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "500+ DSA problems solved",
    meta: "LeetCode \u00b7 HackerRank \u00b7 CodeChef",
    Icon: Code2,
  },
  {
    title: "State-Level Karate Champion",
    meta: "Martial arts",
    Icon: Medal,
  },
  {
    title: "2nd Rank in HSC",
    meta: "D.D. Bytco Boys High School & Jr. College",
    Icon: GraduationCap,
  },
  {
    title: "3rd Rank, Data Science & Big Data Competition",
    meta: "KKWIEER",
    Icon: Trophy,
  },
  {
    title: "95+ percentile, MHT CET",
    meta: "State engineering entrance exam",
    Icon: Award,
  },
];

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative mt-10 space-y-5 border-l border-border pl-6 sm:pl-8">
      {entries.map((e, i) => (
        <Reveal as="li" key={e.title} delay={i * 80} className="relative">
          <span className="absolute -left-[31px] top-5 flex size-6 items-center justify-center rounded-full bg-primary/20 ring-4 ring-background sm:-left-[39px]">
            <e.Icon className="size-3 text-primary" aria-hidden="true" />
          </span>
          <div className="glass rounded-2xl p-5 transition-transform hover:translate-x-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground">{e.title}</h3>
              <span className="text-xs font-medium text-primary">{e.period}</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{e.meta}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.copy}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been building"
        description="Internships, hackathons, open source and freelance work that shaped how I ship software."
      />
      <div className="mx-auto max-w-3xl">
        <Timeline entries={EXPERIENCE} />
      </div>
    </Section>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(2.25rem,7.5vw,6.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            Achievements
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Wins inside and outside the terminal
          </p>
        </Reveal>

        <ol className="relative mx-auto mt-16 max-w-3xl pl-10 sm:pl-14">
          {/* The rail, drawn behind the markers. */}
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-linear-to-b from-slate-200/70 via-slate-300/45 to-slate-300/15 sm:left-[19px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease }}
          />

          {ACHIEVEMENTS.map((a, i) => (
            <motion.li
              key={a.title}
              className="group relative pb-12 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease }}
            >
              {/* Marker: small on the rail, swelling and lighting up on hover. */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-10 flex size-6 items-center justify-center sm:-left-14 sm:size-8"
              >
                <span className="size-2.5 rounded-full bg-slate-300 shadow-[0_0_0_4px] shadow-background transition-all duration-300 group-hover:size-5 group-hover:bg-slate-100 group-hover:shadow-[0_0_0_6px_var(--background),0_0_22px_6px_rgba(226,232,240,0.45)]" />
              </span>

              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 transition-colors group-hover:bg-emerald-500/20">
                  <a.Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3
                    className="font-hero text-lg font-black tracking-[-0.01em] text-foreground sm:text-xl"
                    style={{ fontStretch: "112%" }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {a.meta}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
