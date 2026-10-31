import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send, Code2, Trophy, Terminal } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Section, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Where the contact form sends to. Taken from the commit history of this repo;
 * change this one line to use a different address.
 */
const CONTACT_EMAIL = "tejassangale90@gmail.com";

export const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/tejas-sangale04", Icon: Github },
  { label: "LeetCode", href: "https://leetcode.com", Icon: Code2 },
  { label: "Codeforces", href: "https://codeforces.com", Icon: Trophy },
  { label: "HackerRank", href: "https://hackerrank.com", Icon: Terminal },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(
      `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
    );
    setSending(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…", {
      description: `If nothing happens, write to ${CONTACT_EMAIL} directly.`,
    });
    form.reset();
    setSending(false);
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Open to internships, freelance projects and collaboration on interesting problems."
      />

      <div className="mx-auto mt-14 w-full max-w-2xl">
        <Reveal className="glass rounded-3xl p-7">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell me a bit about your project or role…"
              />
            </div>
            <Button type="submit" size="lg" disabled={sending} className="rounded-full">
              <Send className="size-4" /> Send message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={120} className="mt-8 flex flex-col items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-200"
          >
            <Mail className="size-4" aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
          <ul className="flex flex-wrap justify-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex size-11 items-center justify-center rounded-xl bg-secondary/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                >
                  <s.Icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tejas Sangale. Built with React & Tailwind CSS.
        </p>
        <ul className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-primary"
              >
                <s.Icon className="size-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
