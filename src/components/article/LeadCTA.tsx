import { ArrowRight, Sparkles } from "lucide-react";

type Props = { variant?: "mortgage" | "accountant" | "pension" };

const COPY = {
  mortgage: {
    eyebrow: "Sponsored - UK FCA-regulated brokers",
    title: "See the borrowing range your salary may support",
    body: "No-impact-on-credit-score check from FCA-regulated brokers. Takes about 60 seconds.",
    cta: "View mortgage scenario",
    href: "#lead-mortgage",
  },
  accountant: {
    eyebrow: "Sponsored - accountant matching service",
    title: "Explore a chartered accountant match",
    body: "Vetted UK accountants for sole traders, contractors and limited companies. Intro call available.",
    cta: "View accountant options",
    href: "#lead-accountant",
  },
  pension: {
    eyebrow: "Sponsored - UK FCA-regulated advisers",
    title: "Review a pension planning scenario",
    body: "See how pension contributions may affect tax relief and long-term projections.",
    cta: "View pension scenario",
    href: "#lead-pension",
  },
} as const;

export function LeadCTA({ variant = "mortgage" }: Props) {
  const c = COPY[variant];

  return (
    <aside
      className="my-10 rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/50 p-6 sm:p-7"
      aria-label="Sponsored offer"
    >
      <div className="mb-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-accent">
        <Sparkles className="h-3 w-3" /> {c.eyebrow}
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight sm:text-2xl">{c.title}</h3>
      <p className="mb-5 max-w-prose text-sm text-muted-foreground">{c.body}</p>
      <a
        href={c.href}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
      >
        {c.cta} <ArrowRight className="h-4 w-4" />
      </a>
    </aside>
  );
}
