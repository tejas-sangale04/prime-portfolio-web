import { Award, Code2, Cpu, GitBranch, Rocket, Sparkles } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { Counter } from "@/components/site/counter";

const focus = [
  { Icon: Code2, label: "Full stack development", copy: "React, Next.js, Node.js, REST APIs" },
  { Icon: Cpu, label: "AI & machine learning", copy: "Model integration, LLM apps, data pipelines" },
  { Icon: Rocket, label: "Mobile apps", copy: "React Native + Expo, offline-first UX" },
  { Icon: Sparkles, label: "Problem solving", copy: "Data structures, algorithms, contests" },
];

const stats = [
  { Icon: Rocket, value: 15, suffix: "+", label: "Projects completed" },
  { Icon: Code2, value: 25, suffix: "+", label: "Technologies learned" },
  { Icon: Award, value: 8, suffix: "+", label: "Certifications" },
  { Icon: GitBranch, value: 700, suffix: "+", label: "GitHub contributions" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About me"
        title="Building software that solves real problems"
        description="Computer engineering student with a deep passion for software development, competitive programming and shipping products people actually use."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="glass rounded-3xl p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            I fell in love with programming through competitive coding, and stayed for the craft of
            building complete products. Today I work across the stack — designing interfaces,
            modelling data, writing APIs, and wiring in AI where it genuinely helps.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            My focus areas are full stack development, AI & machine learning, and mobile app
            development. I care about clean architecture, measurable performance and accessible
            interfaces — and I learn fastest by building real-world projects end to end.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {focus.map(({ Icon, label, copy }) => (
              <div key={label} className="rounded-2xl bg-secondary/50 p-4">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="glass flex flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <s.Icon className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-6 text-3xl font-bold text-foreground">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}