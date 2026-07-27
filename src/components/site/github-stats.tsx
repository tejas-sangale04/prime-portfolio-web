import { Folder, GitCommitHorizontal, Languages, Star } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { Counter } from "@/components/site/counter";

const STATS = [
  { Icon: Folder, value: 42, suffix: "+", label: "Total repositories" },
  { Icon: Star, value: 120, suffix: "+", label: "Stars earned" },
  { Icon: GitCommitHorizontal, value: 700, suffix: "+", label: "Contributions" },
  { Icon: Languages, value: 12, suffix: "", label: "Languages used" },
];

const LANGUAGES = [
  { name: "TypeScript", pct: 34 },
  { name: "JavaScript", pct: 26 },
  { name: "C++", pct: 18 },
  { name: "Python", pct: 14 },
  { name: "Other", pct: 8 },
];

// Placeholder contribution grid until the GitHub API is wired up.
const WEEKS = 26;
const DAYS = 7;
const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => (i * 37) % 5);

export function GithubDashboard() {
  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title="Activity dashboard"
        description="A snapshot of what my open source and personal repository activity looks like."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="glass rounded-3xl p-6">
            <s.Icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-6 text-3xl font-bold text-foreground">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <Reveal className="glass rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-foreground">Contribution activity</h3>
          <p className="mt-1 text-xs text-muted-foreground">Last 6 months (placeholder data)</p>
          <div
            role="img"
            aria-label="Placeholder GitHub contribution activity graph"
            className="mt-5 grid grid-flow-col gap-1 overflow-x-auto"
            style={{ gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))` }}
          >
            {cells.map((level, i) => (
              <span
                key={i}
                className="size-3 rounded-[3px]"
                style={{
                  backgroundColor:
                    level === 0
                      ? "color-mix(in oklab, var(--foreground) 8%, transparent)"
                      : `color-mix(in oklab, var(--primary) ${level * 22}%, transparent)`,
                }}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="glass rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-foreground">Languages used</h3>
          <ul className="mt-5 grid gap-4">
            {LANGUAGES.map((l) => (
              <li key={l.name}>
                <div className="flex justify-between text-xs">
                  <span className="text-foreground">{l.name}</span>
                  <span className="text-muted-foreground">{l.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-primary-glow"
                    style={{ width: `${l.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}