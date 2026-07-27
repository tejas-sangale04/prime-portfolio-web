import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Achievements, Experience } from "@/components/site/timelines";
import {
  BackToTop,
  BackgroundOrbs,
  CursorGlow,
  ScrollProgress,
} from "@/components/site/site-chrome";

const title = "Aarav Deshmukh — Full Stack Developer & AI Enthusiast";
const description =
  "Portfolio of Aarav Deshmukh: full stack web and mobile developer building AI-powered products with React, Node.js and Python.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aarav Deshmukh",
          jobTitle: "Full Stack Developer",
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <ScrollProgress />
      <BackgroundOrbs />
      <CursorGlow />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
      </main>
      <BackToTop />
    </div>
  );
}
