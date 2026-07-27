import {
  Award,
  Briefcase,
  Code2,
  GitPullRequest,
  Medal,
  Star,
  Trophy,
  Users,
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

const ACHIEVEMENTS: Entry[] = [
  {
    title: "State Level Karate Champion",
    meta: "Martial arts",
    period: "Championship",
    copy: "Years of disciplined training turned into a state level title — the same discipline I bring to engineering.",
    Icon: Medal,
  },
  {
    title: "MHT CET 95+ Percentile",
    meta: "Engineering entrance exam",
    period: "Academics",
    copy: "Ranked in the top percentile among lakhs of candidates across the state.",
    Icon: Star,
  },
  {
    title: "Competitive Programming",
    meta: "LeetCode · Codeforces",
    period: "Ongoing",
    copy: "500+ problems solved, with regular participation in rated contests and weekly challenges.",
    Icon: Award,
  },
  {
    title: "Hackathon Participation",
    meta: "Team lead & developer",
    period: "Multiple events",
    copy: "Consistent participant, shipping working prototypes and presenting them to judging panels.",
    Icon: Trophy,
  },
  {
    title: "Technical Club Member",
    meta: "Campus developer community",
    period: "Ongoing",
    copy: "Organise workshops and mentor juniors on web development and data structures.",
    Icon: Users,
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
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              {e.meta}
            </p>
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

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title="Milestones worth marking"
        description="Wins inside and outside the terminal."
      />
      <div className="mx-auto max-w-3xl">
        <Timeline entries={ACHIEVEMENTS} />
      </div>
    </Section>
  );
}