/**
 * YMYL STATUTORY DISCLAIMER
 * Hard-coded into every calculation result card.
 * Must remain visible in all user screenshots shared on social media.
 * Do not remove or move to footer-only — YMYL compliance requirement.
 */
export function ResultDisclaimer() {
  return (
    <p
      aria-label="Legal disclaimer"
      className="mt-4 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground"
    >
      <span className="font-semibold text-foreground/80">Simulation only.</span>{" "}
      Illustrative estimate based on standard 2026/27 HMRC rates. Not tax or
      financial advice. Individual results vary — tax codes, employer arrangements,
      and personal circumstances are not fully modelled.{" "}
      <span className="font-semibold text-foreground/80">
        Consult a certified accountant or independent financial adviser before
        making financial decisions.
      </span>
    </p>
  );
}
