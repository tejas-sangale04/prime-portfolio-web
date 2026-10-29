import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { IdCard } from "@/components/site/id-card";

const ROLES = ["AI / ML Engineer", "Full Stack Developer", "Competitive Programmer"];

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

const LINKS = [
  { label: "GitHub", href: "https://github.com/tejas-sangale04", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com", Icon: LeetCodeIcon },
];

const ease = [0.16, 1, 0.3, 1] as const;

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1800 : cleared ? 250 : deleting ? 40 : 85;

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

/** Local time in India, rendered only on the client so SSR and hydration agree. */
function useIndiaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Hero() {
  const typed = useTypewriter(ROLES);
  const time = useIndiaTime();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-dvh scroll-mt-24 flex-col overflow-hidden px-5 pt-24 pb-10 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />

      <motion.span
        className="inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-background/60 px-4 py-2 font-mono text-sm text-foreground/90"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <span className="size-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px] shadow-emerald-500/70" />
        Online
        <span aria-hidden="true">•</span>
        <span className="tabular-nums">{time ? `${time} in India` : "in India"}</span>
      </motion.span>

      <div className="relative flex flex-1 flex-col justify-center">
        <motion.h1
          className="mt-10 bg-linear-to-b from-zinc-500 via-slate-400 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(3rem,13vw,12rem)] leading-[0.86] font-black tracking-[-0.045em] text-transparent"
          style={{ fontStretch: "125%" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="block">Hi,</span>
          <span className="block whitespace-nowrap">I'm Tejas</span>
        </motion.h1>

        <motion.div
          className="relative mx-auto mt-10 w-full max-w-sm lg:absolute lg:top-0 lg:right-0 lg:z-10 lg:mt-0 lg:w-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <IdCard />
        </motion.div>
      </div>

      <motion.div
        className="mt-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
      >
        <p
          className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-background/60 px-6 py-2.5 font-hero text-base font-bold tracking-[0.12em] text-foreground uppercase"
          style={{ fontStretch: "112%" }}
          aria-live="polite"
        >
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="min-w-[1ch]">{typed}</span>
          <span
            aria-hidden="true"
            className="-ml-2 font-light"
            style={{ animation: "blink-caret 1s step-end infinite" }}
          >
            |
          </span>
        </p>

        <ul className="flex flex-wrap items-center gap-x-12 gap-y-4 pl-2">
          {LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 font-hero text-lg font-extrabold tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                style={{ fontStretch: "112%" }}
              >
                <Icon className="size-6 transition-transform group-hover:-translate-y-0.5" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
