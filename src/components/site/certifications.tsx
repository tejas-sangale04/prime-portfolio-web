import { useState } from "react";
import { BadgeCheck, Cloud, Code2, Cpu, Coffee, Globe, type LucideIcon } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  Icon: LucideIcon;
  detail: string;
};

const CERTS: Cert[] = [
  {
    title: "NPTEL Java",
    issuer: "NPTEL",
    year: "2024",
    Icon: Coffee,
    detail: "Core Java, OOP design, collections, exception handling and concurrency fundamentals.",
  },
  {
    title: "NPTEL Modern C++",
    issuer: "NPTEL",
    year: "2024",
    Icon: Code2,
    detail: "Modern C++ features: smart pointers, move semantics, templates and the STL.",
  },
  {
    title: "Web Development",
    issuer: "Online certification",
    year: "2024",
    Icon: Globe,
    detail: "Full stack web development covering React, Node.js, REST APIs and deployment.",
  },
  {
    title: "AI & Machine Learning",
    issuer: "Online certification",
    year: "2025",
    Icon: Cpu,
    detail: "Supervised learning, neural networks, model evaluation and applied LLM workflows.",
  },
  {
    title: "Cloud Certification",
    issuer: "Cloud provider",
    year: "2025",
    Icon: Cloud,
    detail: "Cloud fundamentals: compute, storage, networking, IAM and cost-aware deployment.",
  },
];

export function Certifications() {
  const [open, setOpen] = useState<string | null>(CERTS[0].title);

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified learning, applied in practice"
        description="Select a certificate to see what it covered."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CERTS.map((c, i) => {
          const isOpen = open === c.title;
          return (
            <Reveal key={c.title} delay={i * 80}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : c.title)}
                aria-expanded={isOpen}
                className={cn(
                  "glass w-full rounded-3xl p-6 text-left transition-all hover:-translate-y-1",
                  isOpen && "ring-1 ring-primary/60",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <c.Icon className="size-5" aria-hidden="true" />
                  </span>
                  <BadgeCheck className="size-5 text-primary/70" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {c.issuer} · {c.year}
                </p>
                <div
                  className={cn(
                    "grid transition-all duration-500",
                    isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                    {c.detail}
                  </p>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}