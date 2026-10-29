import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/reveal";
import { SkillSphere, type SphereSkill } from "@/components/site/skill-sphere";

type Category = { title: string; skills: string[] };

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "Next.js",
      "React Native",
      "REST APIs",
      "LangChain",
    ],
  },
  {
    title: "AI / ML",
    skills: ["LLMs", "AI Agents", "RAG", "OpenAI SDK", "PyTorch", "Keras", "MCP", "AI Guardrails"],
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Firestore",
      "ChromaDB",
      "Qdrant",
      "FAISS",
    ],
  },
  {
    title: "Cloud & Platforms",
    skills: ["Google Cloud", "AWS", "Vercel", "Render"],
  },
  {
    title: "Developer Tools",
    skills: ["Git / GitHub", "Source Control", "Debugging", "Figma", "Postman"],
  },
];

const SPHERE: SphereSkill[] = CATEGORIES.flatMap((c) =>
  c.skills.map((label) => ({ label, category: c.title })),
);

const ease = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            Skills
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Drag the sphere · hover a category to light it up
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={80} className="mx-auto w-full max-w-[520px] px-6">
            <SkillSphere skills={SPHERE} active={active} />
          </Reveal>

          <ul className="divide-y divide-border border-y border-border">
            {CATEGORIES.map((cat, i) => (
              <motion.li
                key={cat.title}
                className="group grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline"
                onMouseEnter={() => setActive(cat.title)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(cat.title)}
                onBlur={() => setActive(null)}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
              >
                <h3
                  className="flex items-center gap-2.5 font-hero text-sm font-extrabold tracking-[0.14em] text-muted-foreground uppercase transition-colors group-hover:text-foreground"
                  style={{ fontStretch: "112%" }}
                >
                  <span className="size-1.5 rounded-full bg-emerald-500/50 transition-all group-hover:scale-150 group-hover:bg-emerald-400" />
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      tabIndex={0}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground/85 transition-colors outline-none group-hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-200 focus-visible:ring-2 focus-visible:ring-ring"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 + 0.15 + j * 0.035, ease }}
                      whileHover={{ y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
