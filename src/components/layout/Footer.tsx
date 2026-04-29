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
      { to: "/", label: "Methodology" },
      { to: "/", label: "Privacy" },
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
              <div className="size-8 rounded-lg bg-aurora shadow-glow" />
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

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} UK Net Pay · For information only · Not financial advice</span>
          <div className="flex items-center gap-2 font-mono uppercase tracking-widest">
            <span>Engine v4.2</span>
            <div className="size-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
