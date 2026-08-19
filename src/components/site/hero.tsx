import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SparkCard, SparkleField, SparkleText } from "@/components/site/sparkles";

const ROLES = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Competitive Programmer",
  "Mobile App Developer",
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1600 : cleared ? 250 : deleting ? 40 : 85;

    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-24 items-center px-5 pt-28 pb-20 sm:px-8"
    >
      <SparkleField count={30} seed={5} className="z-0" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <motion.span
              className="size-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            Available for internships & freelance work
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Hi, I'm{" "}
            <SparkleText>
              <span className="glow-text text-glow">Aarav Deshmukh</span>
            </SparkleText>
          </h1>

          <p
            className="mt-4 min-h-9 text-xl font-medium text-primary sm:text-2xl"
            aria-live="polite"
          >
            {typed}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block"
              style={{ animation: "blink-caret 1s step-end infinite" }}
            >
              |
            </span>
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            I design and build fast, reliable web and mobile products — from AI-powered health
            apps to real-time collaboration tools. Computer engineering student, relentless
            problem solver, and open source contributor.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href="#projects">
                View my work <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="/resume.pdf" download>
                <Download className="size-4" /> Download résumé
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex items-center gap-3">
            {[
              { label: "GitHub", href: "https://github.com", Icon: Github },
              { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
              { label: "Email", href: "mailto:hello@example.com", Icon: Mail },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="glass flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <SparkCard className="glass rounded-3xl p-6">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-destructive/80" />
              <span className="size-3 rounded-full bg-chart-5/80" />
              <span className="size-3 rounded-full bg-chart-3/80" />
              <span className="ml-2 text-xs text-muted-foreground">developer.ts</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-xs leading-6 text-muted-foreground">
              <code>{`const dev = {
  name: "Aarav Deshmukh",
  role: "Full Stack Developer",
  stack: ["React", "Node", "Python"],
  focus: "AI · Web · Mobile",
  solve: (problem) => ship(problem),
};`}</code>
            </pre>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { k: "15+", v: "Projects" },
                { k: "500+", v: "DSA solved" },
                { k: "8+", v: "Certificates" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-lg font-bold text-primary">{s.k}</p>
                  <p className="text-[11px] text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </SparkCard>
        </motion.div>
      </div>
    </section>
  );
}