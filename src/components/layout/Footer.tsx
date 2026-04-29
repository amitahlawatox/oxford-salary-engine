import { Link } from "react-router-dom";

const COLS = [
  {
    title: "Calculators",
    links: [
      { to: "/take-home", label: "Take-Home Pay" },
      { to: "/hourly", label: "Hourly Wage" },
      { to: "/reverse", label: "Reverse Salary" },
      { to: "/pay-rise", label: "Pay Rise" },
      { to: "/compare", label: "Compare Salaries" },
      { to: "/pro-rata", label: "Pro-Rata" },
    ],
  },
  {
    title: "Specialist",
    links: [
      { to: "/dividend", label: "Dividend Optimiser" },
      { to: "/self-employed", label: "Self-Employed" },
      { to: "/ir35", label: "IR35 Contractor" },
      { to: "/two-jobs", label: "Two Jobs" },
      { to: "/maternity", label: "Maternity / SMP" },
      { to: "/cost-of-living", label: "Cost of Living" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/", label: "Tax Bands 2026/27" },
      { to: "/", label: "NI Rates" },
      { to: "/", label: "Student Loan Plans" },
      { to: "/disclaimer", label: "Disclaimer" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/favicon.png" alt="UK Net Pay logo" width={32} height={32} className="size-8 rounded-lg shadow-glow" />
              <span className="font-bold tracking-tight">UK Net Pay</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Precise UK take-home pay & tax calculators for the 2026/27 tax year.
              Privacy-first. No sign-up.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FCA safe-harbor disclaimer — required on every page */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <p className="text-xs leading-relaxed text-muted-foreground max-w-4xl">
            <strong className="text-foreground">Important:</strong> This tool is for illustrative purposes only.
            All calculations are estimates and do not constitute financial advice.
            UK Net Pay is not regulated by the Financial Conduct Authority (FCA). For professional advice,
            consult a qualified accountant or independent financial adviser. Calculation data is processed
            client-side in your browser and is never stored on our servers.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} UK Net Pay · Information only · Not financial advice</span>
            <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
              <span>Engine v4.3 · 2026/27 verified</span>
              <div className="size-1.5 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
