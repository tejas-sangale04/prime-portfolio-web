import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Achievements, Experience } from "@/components/site/timelines";
import { Certifications } from "@/components/site/certifications";
import { Blog, Testimonials } from "@/components/site/blog";
import { Contact, SiteFooter } from "@/components/site/contact";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen } from "@/components/site/loading-screen";
import {
  BackToTop,
  BackgroundOrbs,
  CursorGlow,
  ScrollProgress,
} from "@/components/site/site-chrome";
import { SparkCursor } from "@/components/site/sparkles";

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
      <LoadingScreen />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <BackgroundOrbs />
      <CursorGlow />
      <SparkCursor />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
      <Toaster position="bottom-center" />
    </div>
  );
}
