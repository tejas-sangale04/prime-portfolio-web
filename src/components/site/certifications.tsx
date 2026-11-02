import { motion } from "motion/react";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SkillIcon, type SkillIconSource } from "@/components/site/skill-icon";
import { Reveal } from "@/components/site/reveal";

/**
 * Drive folder holding the certificate PDFs. Paste the share link here and
 * the "View all certificates" button appears at the bottom of the section.
 */
const ALL_CERTIFICATES_URL = "https://drive.google.com/drive/folders/1XHhX6jApPmAHy1OYMf-Q8ddE8kbZqF_b?usp=drive_link";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  Icon: SkillIconSource;
};

const CERTS: Cert[] = [
  { title: "Programming in Java", issuer: "NPTEL", year: "2024", Icon: "java" },
  { title: "Modern C++", issuer: "NPTEL", year: "2024", Icon: "cpp" },
  {
    title: "AWS Clouds Foundations",
    issuer: "Online certification",
    year: "2025",
    Icon: "aws",
  },
  { title: "Agentic AI Associate", issuer: "Oracle", year: "2026", Icon: "oracle" },
];

const ACCENTS = [
  {
    bar: "from-emerald-400 via-emerald-500 to-emerald-400",
    glow: "shadow-[0_0_16px_2px_rgba(16,185,129,0.55)]",
    icon: "bg-emerald-500/10 text-emerald-300 group-hover:bg-emerald-500/20 light:text-emerald-700",
  },
  {
    bar: "from-violet-400 via-violet-500 to-violet-400",
    glow: "shadow-[0_0_16px_2px_rgba(167,139,250,0.55)]",
    icon: "bg-violet-500/10 text-violet-300 group-hover:bg-violet-500/20 light:text-violet-700",
  },
  {
    bar: "from-sky-400 via-sky-500 to-sky-400",
    glow: "shadow-[0_0_16px_2px_rgba(56,189,248,0.55)]",
    icon: "bg-sky-500/10 text-sky-300 group-hover:bg-sky-500/20 light:text-sky-700",
  },
  {
    bar: "from-amber-400 via-amber-500 to-amber-400",
    glow: "shadow-[0_0_16px_2px_rgba(251,191,36,0.55)]",
    icon: "bg-amber-500/10 text-amber-300 group-hover:bg-amber-500/20 light:text-amber-700",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(2.25rem,7.5vw,6.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent heading-shadow light:from-zinc-700 light:to-slate-900"
            style={{ fontStretch: "125%" }}
          >
            Certifications
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Courses completed and certified
          </p>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {CERTS.map((c, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
            <motion.li
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background/50 p-6 transition-colors hover:border-emerald-500/35"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r ${accent.bar} ${accent.glow}`}
              />
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex size-11 items-center justify-center rounded-2xl transition-colors ${accent.icon}`}
                >
                  <SkillIcon icon={c.Icon} className="size-5" />
                </span>
                <BadgeCheck className="size-5 text-emerald-400/60" aria-hidden="true" />
              </div>

              <h3
                className="mt-6 font-hero text-lg font-black tracking-[-0.01em] text-foreground"
                style={{ fontStretch: "112%" }}
              >
                {c.title}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {c.issuer} · {c.year}
              </p>
            </motion.li>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-12 text-center">
          {ALL_CERTIFICATES_URL ? (
            <a
              href={ALL_CERTIFICATES_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20 light:text-emerald-800"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> View all certificates
            </a>
          ) : (
            // No folder link yet: show the button, but don't let it go nowhere.
            <span
              aria-disabled="true"
              title="Drive folder link not added yet"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> View all certificates
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
