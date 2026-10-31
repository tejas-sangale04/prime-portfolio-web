import { motion } from "motion/react";
import { BadgeCheck, Code2, Coffee, Cpu, Globe, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

/**
 * Drive folder holding the certificate PDFs. Paste the share link here and
 * the "View all certificates" button appears at the bottom of the section.
 */
const ALL_CERTIFICATES_URL = "";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  Icon: LucideIcon;
};

const CERTS: Cert[] = [
  { title: "Programming in Java", issuer: "NPTEL", year: "2024", Icon: Coffee },
  { title: "Modern C++", issuer: "NPTEL", year: "2024", Icon: Code2 },
  {
    title: "Full Stack Web Development",
    issuer: "Online certification",
    year: "2024",
    Icon: Globe,
  },
  { title: "AI & Machine Learning", issuer: "Online certification", year: "2025", Icon: Cpu },
];

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
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(2.25rem,7.5vw,6.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent"
            style={{ fontStretch: "125%" }}
          >
            Certifications
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Courses completed and certified
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CERTS.map((c, i) => (
            <motion.li
              key={c.title}
              className="group flex flex-col rounded-3xl border border-border bg-background/50 p-6 transition-colors hover:border-emerald-500/35"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 transition-colors group-hover:bg-emerald-500/20">
                  <c.Icon className="size-5" aria-hidden="true" />
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
          ))}
        </ul>

        {ALL_CERTIFICATES_URL ? (
          <Reveal delay={120} className="mt-12 text-center">
            <a
              href={ALL_CERTIFICATES_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> View all certificates
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
