import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";

interface ToolLink {
  path: string;
  label: string;
}

interface SalaryLink {
  amount: number;
}

interface Props {
  tools?: ToolLink[];
  salaries?: SalaryLink[];
  cities?: string[];
}

/**
 * Deep internal links injected at the bottom of insight articles.
 * Passes PageRank from high-ranking articles to tool pages and salary pages.
 * Uses contextual in-body links (not a sidebar) per tech lead decision.
 */
export function RelatedTools({ tools, salaries, cities }: Props) {
  return (
    <div className="not-prose my-8 rounded-xl border border-border/60 bg-secondary/20 p-5">
      <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Related calculators and salary breakdowns
      </p>

      {tools && tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tools.map((t) => (
            <Link
              key={t.path}
              to={t.path}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent/50 hover:bg-secondary/40 transition"
            >
              {t.label} <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      )}

      {salaries && salaries.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {salaries.map((s) => (
            <Link
              key={s.amount}
              to={`/salary/${s.amount}-after-tax`}
              className="rounded-md border border-border/50 bg-background px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-accent/40 transition"
            >
              £{s.amount.toLocaleString()}
            </Link>
          ))}
        </div>
      )}

      {cities && cities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city}
              to={`/insights/average-salary-${city.toLowerCase()}-2026`}
              className="text-xs text-accent hover:underline"
            >
              {city} salary →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
