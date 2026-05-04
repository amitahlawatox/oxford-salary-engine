import { Link } from "react-router-dom";
import { openConsent } from "@/components/consent/ConsentBanner";

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
      { to: "/directory", label: "Salary Directory" },
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
      { to: "/methodology", label: "Methodology" },
      { to: "/insights", label: "Insights & Guides" },
      { to: "/insights/salary-calculator-uk-2026", label: "2026/27 Tax Bands" },
      { to: "/insights/national-insurance-2026-explained", label: "NI Rates" },
      { to: "/insights/student-loan-plan-5-calculator", label: "Student Loan Plans" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/disclaimer", label: "Disclaimer" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <img
                src="/favicon.png"
                alt="UK Net Pay logo"
                width={32}
                height={32}
                className="size-8 rounded-lg shadow-glow"
              />
              <span className="font-bold tracking-tight">UK Net Pay</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Precise UK take-home pay and tax calculators for the 2026/27 tax year.
              Privacy-first. No sign-up.
            </p>
          </div>

          {COLS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4 border-t border-border pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Important:</strong> This tool provides an
            illustrative simulation based on 2026/27 HMRC standard rates. It does not
            constitute financial or tax advice. UK Net Pay is not regulated by the
            Financial Conduct Authority (FCA). For professional advice, consult a qualified
            accountant or independent financial adviser. Calculation data is processed
            client-side in your browser and is never stored on our servers.
          </p>
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground md:flex-row">
            <span>
              Copyright {new Date().getFullYear()} UK Net Pay · Information only · Not
              financial advice
            </span>
            <div className="flex items-center gap-3 font-mono uppercase tracking-widest">
              <button onClick={openConsent} className="transition-colors hover:text-foreground">
                Cookie settings
              </button>
              <span className="opacity-30">·</span>
              <span>Engine v4.3 · 2026/27 verified</span>
              <div className="size-1.5 animate-pulse rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
