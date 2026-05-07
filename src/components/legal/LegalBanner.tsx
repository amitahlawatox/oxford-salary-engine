import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

/**
 * Persistent disclaimer shown at the bottom of every tool and article page.
 * Makes clear this is not financial advice and no personal data is collected.
 */
export function LegalBanner() {
  return (
    <aside
      aria-label="Legal disclaimer"
      className="mt-10 rounded-xl border border-border bg-secondary/40 px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">For information only — not financial or tax advice.</strong>{" "}
          UK Net Pay is not regulated by the Financial Conduct Authority (FCA). These calculators
          provide illustrative estimates based on standard HMRC rates for the 2026/27 tax year.
          Results may not reflect your personal tax code, employer arrangements, or individual
          circumstances.{" "}
          <strong className="text-foreground">
            Always consult a qualified accountant or independent financial adviser
            before making financial decisions.
          </strong>{" "}
          We collect <strong className="text-foreground">no personal data</strong> — all
          calculations run entirely in your browser and nothing you enter is ever transmitted
          to our servers.{" "}
          <Link to="/disclaimer" className="underline underline-offset-2 hover:text-foreground">
            Full disclaimer
          </Link>{" "}
          ·{" "}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy policy
          </Link>
        </p>
      </div>
    </aside>
  );
}
