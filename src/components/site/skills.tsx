import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  BrainCircuit,
  Cloud,
  Database,
  Layout,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";

type Skill = { name: string; level: number };
type Category = { title: string; Icon: LucideIcon; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    title: "Programming Languages",
    Icon: Boxes,
    skills: [
      { name: "C++", level: 92 },
      { name: "Java", level: 85 },
      { name: "Python", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 82 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Frontend",
    Icon: Layout,
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 84 },
      { name: "React Native", level: 80 },
      { name: "Expo", level: 78 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    Icon: Server,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Firebase", level: 78 },
      { name: "Authentication", level: 82 },
      { name: "JWT", level: 84 },
    ],
  },
  {
    title: "Database",
    Icon: Database,
    skills: [
      { name: "MongoDB", level: 87 },
      { name: "PostgreSQL", level: 82 },
      { name: "Firestore", level: 76 },
      { name: "Prisma", level: 74 },
    ],
  },
  {
    title: "AI / ML",
    Icon: BrainCircuit,
    skills: [
      { name: "TensorFlow", level: 72 },
      { name: "OpenCV", level: 78 },
      { name: "LangChain", level: 75 },
      { name: "RAG", level: 74 },
      { name: "Vector Databases", level: 70 },
      { name: "Hugging Face", level: 72 },
      { name: "Gemini API", level: 85 },
    ],
  },
  {
    title: "Cloud & Tools",
    Icon: Cloud,
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 92 },
      { name: "Docker", level: 72 },
      { name: "Vercel", level: 88 },
      { name: "Render", level: 80 },
      { name: "Postman", level: 86 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 78 },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-primary-glow transition-[width] duration-1000 ease-out"
          style={{ width: filled ? `${skill.level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I build with"
        description="Languages, frameworks and tools I use daily across web, mobile, data and AI projects."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.title}
            delay={i * 80}
            className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <cat.Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
            </div>
            <div className="mt-6 grid gap-4">
              {cat.skills.map((s, j) => (
                <SkillBar key={s.name} skill={s} delay={j * 70} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}