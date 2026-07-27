import {
  Activity,
  Bot,
  ExternalLink,
  Github,
  GraduationCap,
  LineChart,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  Icon: LucideIcon;
  github: string;
  demo: string;
};

const PROJECTS: Project[] = [
  {
    title: "Smart Heal",
    description:
      "AI-powered physiotherapy mobile app that detects body parts with computer vision and recommends therapy through wearable Bluetooth devices.",
    tech: ["React Native", "Expo", "Firebase", "TensorFlow", "AI", "Computer Vision"],
    features: [
      "Real-time body part detection",
      "Personalised therapy plans",
      "Bluetooth wearable control",
    ],
    Icon: Activity,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "Full-stack finance dashboard with bank sync, budgeting, analytics and rich transaction insights.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Plaid API"],
    features: ["Plaid bank integration", "Budgets & analytics charts", "Secure auth sessions"],
    Icon: LineChart,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "AI Interview Platform",
    description:
      "AI-powered interview preparation with resume analysis, mock interviews and detailed performance reports.",
    tech: ["React", "Node.js", "Gemini API", "MongoDB"],
    features: ["Resume analysis", "AI interview reports", "Progress analytics"],
    Icon: Bot,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Restaurant Booking System",
    description:
      "Table reservation platform with live availability, seat maps and automated confirmation emails.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    features: ["Live table availability", "Reservation management", "Email confirmations"],
    Icon: UtensilsCrossed,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Learning Management System",
    description:
      "Course platform with role-based dashboards, video lessons, quizzes and progress tracking.",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    features: ["Role-based dashboards", "Quizzes & grading", "Progress tracking"],
    Icon: GraduationCap,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description:
      "This site — a fast, accessible, animated portfolio built with a custom dark glassmorphism design system.",
    tech: ["TanStack Start", "React", "TypeScript", "Tailwind CSS"],
    features: ["Server-rendered & SEO ready", "Scroll-driven animations", "Lighthouse 95+ target"],
    Icon: User,
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've designed and shipped"
        description="A selection of full stack, mobile and AI projects — each built end to end, from data model to interface."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 80}
            as="article"
            className="glass group flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1.5"
          >
            <div className="relative flex aspect-video items-center justify-center bg-linear-to-br from-primary/25 via-primary/10 to-transparent">
              <p.Icon className="size-10 text-primary" aria-hidden="true" />
              <span className="absolute bottom-3 right-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Preview coming soon
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li key={t}>
                    <Badge variant="secondary" className="rounded-full text-[11px] font-normal">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 grid gap-1.5 text-xs text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2 pt-2">
                <Button asChild size="sm" variant="outline" className="flex-1 rounded-full">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <Github className="size-4" /> GitHub
                  </a>
                </Button>
                <Button asChild size="sm" className="flex-1 rounded-full">
                  <a href={p.demo} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" /> Live demo
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}