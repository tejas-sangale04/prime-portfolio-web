import { Reveal } from "@/components/site/reveal";
import { Counter } from "@/components/site/counter";

const highlights = [
  { title: "Computer Engineering", copy: "B.E. student" },
  { title: "Competitive Programmer", copy: "500+ DSA problems" },
];

const stats = [
  { value: 15, suffix: "+", label: "Projects" },
  { value: 25, suffix: "+", label: "Technologies" },
  { value: 8, suffix: "+", label: "Certifications" },
  { value: 700, suffix: "+", label: "Contributions" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl text-center">
        <Reveal>
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            About Me
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-14 max-w-3xl font-hero text-xl leading-[1.6] font-semibold text-foreground/90 sm:text-3xl">
            Hi, I'm Tejas, an AI/ML enthusiast and software engineer. I'm a final-year student at K.
            K. Wagh, Nashik, and I enjoy working with data and building the apps around it.
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-14 flex flex-wrap justify-center gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 px-7 py-4"
            >
              <p
                className="font-hero text-sm font-extrabold tracking-[0.12em] text-foreground uppercase"
                style={{ fontStretch: "112%" }}
              >
                {h.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{h.copy}</p>
            </div>
          ))}
        </Reveal>

        <Reveal
          delay={260}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 border-t border-border pt-10 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-4 ${i > 0 ? "sm:border-l sm:border-border" : ""} ${i % 2 ? "border-l border-border sm:border-l" : ""}`}
            >
              <p
                className="font-hero text-5xl font-black text-foreground/90 tabular-nums"
                style={{ fontStretch: "112%" }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p
                className="mt-2 font-hero text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase"
                style={{ fontStretch: "112%" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
