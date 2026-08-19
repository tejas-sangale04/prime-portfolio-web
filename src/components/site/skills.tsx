import { Reveal, Section, SectionHeading } from "@/components/site/reveal";

type Category = { title: string; skills: string[] };

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    skills: ["C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "Firebase", "Authentication", "JWT"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL", "Firestore", "Prisma"],
  },
  {
    title: "AI / ML",
    skills: ["TensorFlow", "OpenCV", "LangChain", "RAG", "Vector Databases", "Hugging Face", "Gemini API"],
  },
  {
    title: "Cloud & Tools",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Render", "Postman", "VS Code", "Linux"],
  },
];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools & technologies"
        description="The languages, frameworks and platforms I work with most often."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CATEGORIES.map((cat, i) => (
          <Reveal
            key={cat.title}
            delay={i * 80}
            className="glass magnetic-hover rounded-3xl p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {cat.title}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
