import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/reveal";
import { VisitorCount } from "@/components/site/visitor-count";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Where the contact form sends to. Taken from the commit history of this repo;
 * change this one line to use a different address.
 */
const CONTACT_EMAIL = "tejassangale90@gmail.com";

/**
 * Social links shown in the contact section and footer. Swap these hrefs for
 * your own.
 */
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/tejas-sangale04", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/tejas-sangale07", Icon: Linkedin },
];

const field =
  "border-border bg-background/60 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/25";

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
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-x-clip px-5 py-24 sm:px-8"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="text-center">
          <h2
            className="bg-linear-to-b from-zinc-500 to-slate-300 bg-clip-text pb-[0.08em] font-hero text-[clamp(2.75rem,9vw,8rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent heading-shadow light:from-zinc-700 light:to-slate-900"
            style={{ fontStretch: "125%" }}
          >
            Contact
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Open to internships and interesting problems
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="mx-auto mt-14 w-full max-w-2xl rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] sm:rounded-[2rem] sm:p-9"
        >
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label
                  htmlFor="contact-name"
                  className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
                >
                  Name
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="contact-email"
                  className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
                >
                  Email
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={field}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="contact-message"
                className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
              >
                Message
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell me a bit about your project or role…"
                className={field}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-6 py-3 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/25 disabled:opacity-60 light:text-emerald-800"
            >
              <Send className="size-4" aria-hidden="true" /> Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-col items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-emerald-200 light:hover:text-emerald-700"
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
                  className="flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-emerald-200 light:hover:text-emerald-700"
                >
                  <s.Icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
      <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tejas Sangale
        </p>
        <VisitorCount />
      </div>
    </footer>
  );
}
