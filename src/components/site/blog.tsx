import { ArrowUpRight, Clock, Quote } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";

const POSTS = [
  {
    title: "Building an offline-first React Native app with Expo",
    excerpt:
      "How I structured local caching, background sync and Bluetooth device pairing for a therapy app.",
    tag: "Mobile",
    date: "Coming soon",
    read: "8 min read",
  },
  {
    title: "RAG in practice: what actually improves answer quality",
    excerpt:
      "Chunking strategies, embedding choices and evaluation loops that moved the needle on retrieval.",
    tag: "AI / ML",
    date: "Coming soon",
    read: "10 min read",
  },
  {
    title: "From 900ms to 90ms: profiling a Node.js API",
    excerpt:
      "A walkthrough of indexes, N+1 queries and caching layers that cut response times by 10x.",
    tag: "Backend",
    date: "Coming soon",
    read: "6 min read",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Delivered far beyond the brief — thoughtful architecture, clear communication and a polished final product.",
    name: "Recommendation placeholder",
    role: "Project mentor",
  },
  {
    quote:
      "One of the quickest learners on the team. Picked up an unfamiliar stack and shipped features in days.",
    name: "Recommendation placeholder",
    role: "Internship supervisor",
  },
  {
    quote:
      "Great debugging instincts and a genuinely collaborative teammate during our hackathon sprint.",
    name: "Recommendation placeholder",
    role: "Hackathon teammate",
  },
];

export function Blog() {
  return (
    <Section id="blog">
      <SectionHeading
        eyebrow="Blog"
        title="Latest technical writing"
        description="Notes on what I'm building, breaking and learning. Full posts publishing soon."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <Reveal
            key={p.title}
            as="article"
            delay={i * 90}
            className="glass group flex h-full flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1.5"
          >
            <Badge variant="secondary" className="w-fit rounded-full text-[11px] font-normal">
              {p.tag}
            </Badge>
            <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" /> {p.read}
              </span>
              <span className="inline-flex items-center gap-1 text-primary">
                {p.date} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        description="Recommendations from mentors, teammates and clients (placeholders for now)."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal
            key={t.quote}
            as="article"
            delay={i * 90}
            className="glass flex h-full flex-col rounded-3xl p-6"
          >
            <Quote className="size-6 text-primary/70" aria-hidden="true" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              “{t.quote}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}