import { ArrowRight, Sparkles } from "lucide-react";

type Props = { variant?: "mortgage" | "accountant" | "pension" };

const COPY = {
  mortgage: {
    eyebrow: "Sponsored — UK FCA-regulated brokers",
    title: "See how much mortgage your salary actually supports",
    body: "Free, no-impact-on-credit-score check from FCA-regulated brokers. Takes 60 seconds.",
    cta: "Get my mortgage estimate",
    href: "#lead-mortgage",
  },
  accountant: {
    eyebrow: "Recommended for self-employed & limited company directors",
    title: "Match with a UK chartered accountant in minutes",
    body: "Vetted UK accountants for sole traders, contractors and Ltd companies. Free intro call.",
    cta: "Find an accountant",
    href: "#lead-accountant",
  },
  pension: {
    eyebrow: "Boost your take-home through smart pension planning",
    title: "Free pension review from UK FCA-regulated advisers",
    body: "See how much extra tax relief you could be claiming and what your pot is on track for.",
    cta: "Book a free review",
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
      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
        <Sparkles className="h-3 w-3" /> {c.eyebrow}
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">{c.title}</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-prose">{c.body}</p>
      <a
        href={c.href}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
      >
        {c.cta} <ArrowRight className="h-4 w-4" />
      </a>
    </aside>
  );
}
