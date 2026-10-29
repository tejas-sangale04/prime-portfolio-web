import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SparkleField, SparkleText } from "@/components/site/sparkles";
import { IdCard } from "@/components/site/id-card";

const ROLES = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Competitive Programmer",
  "Mobile App Developer",
];

const STACK = ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB"];

const TOOLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Python",
  "TensorFlow",
  "LangChain",
  "React Native",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Docker",
  "Git",
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", Icon: Mail },
];

const ease = [0.16, 1, 0.3, 1] as const;

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

function ToolMarquee() {
  // The list is rendered twice so the -50% translate loops seamlessly.
  return (
    <div className="marquee-mask relative mt-16 overflow-hidden" aria-label="Tools I use">
      <ul
        className="flex w-max gap-3 hover:[animation-play-state:paused]"
        style={{ animation: "marquee 38s linear infinite" }}
      >
        {[...TOOLS, ...TOOLS].map((tool, i) => (
          <li
            key={`${tool}-${i}`}
            aria-hidden={i >= TOOLS.length}
            className="glass flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary-glow" />
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-24 flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <SparkleField count={30} seed={5} className="z-0" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            Online
            <span aria-hidden="true" className="text-foreground/25">
              •
            </span>
            <MapPin className="size-3" aria-hidden="true" /> India
          </span>

          <h1 className="mt-7 font-display font-bold tracking-[-0.035em] text-foreground">
            <span className="block text-2xl font-medium tracking-tight text-muted-foreground sm:text-3xl">
              Hi, I'm
            </span>
            <SparkleText>
              <span className="glow-text text-glow mt-1 block text-[clamp(3rem,9vw,6.25rem)] leading-[0.92]">
                Tejas Sangale
              </span>
            </SparkleText>
          </h1>

          <p
            className="mt-6 min-h-8 font-display text-xl font-medium text-primary sm:text-2xl"
            aria-live="polite"
          >
            {typed}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block font-light"
              style={{ animation: "blink-caret 1s step-end infinite" }}
            >
              |
            </span>
          </p>

          <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-muted-foreground">
            {STACK.join(" · ")}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            I design and build fast, reliable web and mobile products, from AI-powered health apps
            to real-time collaboration tools. Computer engineering student, problem solver and open
            source contributor.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href="#projects">
                View my work <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="/resume.pdf" download>
                <Download className="size-4" /> Résumé
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-4 transition-colors group-hover:text-primary" />
                  <span className="border-b border-transparent transition-colors group-hover:border-primary/60">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative w-full lg:-mt-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <IdCard />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
      >
        <ToolMarquee />
      </motion.div>
    </section>
  );
}
