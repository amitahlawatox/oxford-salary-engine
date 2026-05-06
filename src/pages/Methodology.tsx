import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const SITE = "https://www.uknetpay.co.uk";

const methodologyJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/methodology`,
    url: `${SITE}/methodology`,
    name: "Oxford Methodology: Standards for 2026/27 Tax Accuracy",
    description:
      "The public trust standard behind UK Net Pay, covering source discipline, verification logic, privacy-by-design, and region-specific 2026/27 tax accuracy.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Oxford Methodology: Standards for 2026/27 Tax Accuracy",
    description:
      "The public trust standard behind UK Net Pay, covering source discipline, verification logic, privacy-by-design, and region-specific 2026/27 tax accuracy.",
    author: {
      "@type": "Organization",
      name: "UK Net Pay",
    },
    publisher: {
      "@type": "Organization",
      name: "UK Net Pay",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/favicon.png`,
      },
    },
    datePublished: "2026-04-30",
    dateModified: "2026-04-30",
    mainEntityOfPage: {
      "@id": `${SITE}/methodology`,
    },
  },
];

const calculationLinks = [
  { to: "/salary/30000-after-tax", label: "£30,000 Salary Calculator" },
  { to: "/salary/50000-after-tax", label: "£50,000 Salary Calculator" },
  { to: "/salary/100000-after-tax", label: "£100,000 Salary Calculator" },
  { to: "/salary/120000-after-tax", label: "£120,000 Salary Calculator" },
];

const methodologyProofs = [
  "The calculator is mapped to named 2026/27 assumptions.",
  "Every public result reconciles back to gross pay.",
  "Scottish and rest-of-UK tax logic are treated separately.",
  "Privacy is part of the methodology, not an afterthought.",
];

const methodologyChecks = [
  "Minimum wage check: £12.71 x 37.5 hours = £476.63 gross a week.",
  "Employer NI check: a £30,000 salary should show employer NI above the £5,000 threshold.",
  "Plan 5 check: a £27,000 salary should trigger about £180 a year in repayments.",
];

const Methodology = () => (
  <Shell>
    <Seo
      title="Oxford Methodology: Standards for 2026/27 Tax Accuracy"
      description="Read the Oxford Methodology behind UK Net Pay: primary-source tax checks, verification logic, privacy-by-design, and region-specific 2026/27 salary accuracy."
      path="/methodology"
      jsonLd={methodologyJsonLd}
    />

    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-6">
      <div className="max-w-3xl">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
          Authority anchor
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Oxford Methodology: Standards for 2026/27 Tax Accuracy
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          This is the public trust standard behind UK Net Pay. It explains how we turn
          official UK tax assumptions into a readable calculator without storing salary data
          or asking users to trust a black box.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <article className="space-y-10">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Trust standard
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              This is not a marketing page. It is the public explanation behind how UK Net
              Pay checks 2026/27 tax assumptions, why the calculator stays stateless, and
              where our simplified public model intentionally stops.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Pillar 1: Primary-source synchronization
            </h2>
            <p className="leading-7 text-muted-foreground">
              Our logic is not copied from generic salary widgets or delayed third-party
              APIs. UK Net Pay is reviewed against primary UK sources and published fiscal
              references, including HMRC and GOV.UK guidance, the Autumn Budget 2025, and
              Spring Statement 2026 materials where they affect the 2026/27 public model.
            </p>
            <p className="leading-7 text-muted-foreground">
              We keep the live calculator aligned to the figures that matter to users:
              Personal Allowance, regional income tax bands, employee and employer National
              Insurance thresholds, student loan thresholds, and the National Living Wage.
              When official assumptions move, the methodology and the calculator should move
              with them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Pillar 2: The verification equation
            </h2>
            <p className="leading-7 text-muted-foreground">
              Every result shown on UK Net Pay must reconcile back to the gross amount
              entered. We use a standing verification equation so the site can explain its
              own arithmetic clearly rather than hiding everything behind one headline
              number.
            </p>
            <div className="rounded-2xl border border-border bg-secondary/40 p-5 font-mono text-sm sm:text-base">
              Net Pay = Gross Income - (Income Tax + Class 1 NIC + Student Loan + Pension
              Contribution)
            </div>
            <p className="leading-7 text-muted-foreground">
              In practice, that means each public estimate is decomposed into its parts:
              income tax, employee National Insurance, employer National Insurance, student
              loan deductions, postgraduate loan deductions, and salary sacrifice pension.
              The same discipline is what allows the calculator to surface the Personal
              Allowance taper between £100,000 and £125,140 rather than hiding the 60%
              marginal-rate effect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Pillar 3: Privacy-by-design
            </h2>
            <p className="leading-7 text-muted-foreground">
              Accuracy is not enough on a salary tool. The Oxford Methodology also requires
              a stateless, privacy-first architecture. The calculator works without user
              accounts, without persistent salary storage, and without writing figures to a
              backend database.
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              <li>
                <strong className="text-foreground">No persistent storage:</strong> salary
                inputs are not saved to a database or local storage.
              </li>
              <li>
                <strong className="text-foreground">Local processing:</strong> the main
                projection logic runs client-side so personal pay data does not need to
                leave the session.
              </li>
              <li>
                <strong className="text-foreground">Anonymized analytics:</strong> we care
                about tool usage patterns, not who a user is or what they earn.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Pillar 4: Regional divergence accuracy
            </h2>
            <p className="leading-7 text-muted-foreground">
              The UK is no longer a single-tax environment. Our methodology explicitly
              supports the Scottish six-band structure alongside the rest-of-UK model so
              users in Edinburgh are not shown the same answer as users in Birmingham.
            </p>
            <p className="leading-7 text-muted-foreground">
              That means the calculator recognises the Scottish Starter, Basic,
              Intermediate, Higher, Advanced, and Top bands, while also keeping the rest of
              the UK on the Westminster structure. Regional divergence is treated as a
              first-order accuracy issue, not a footnote.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Standing regression checks
            </h2>
            <p className="leading-7 text-muted-foreground">
              The methodology is backed by a small public test pack used to catch the most
              expensive year-rollover mistakes quickly.
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              {methodologyChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              What this methodology is, and what it is not
            </h2>
            <p className="leading-7 text-muted-foreground">
              The Oxford Methodology is designed for estimation, planning, and public
              transparency. It is not a substitute for payroll software, formal tax advice,
              or a bespoke accountant-led review. It is the page that explains how UK Net
              Pay arrives at its public numbers, what assumptions sit behind them, and
              where the limits of the simplified model begin.
            </p>
          </section>
        </article>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              What this proves
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {methodologyProofs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Calculations for you
            </p>
            <nav className="flex flex-col gap-3">
              {calculationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Read next
            </p>
            <nav className="flex flex-col gap-3">
              <Link
                to="/take-home"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Use the take-home calculator
              </Link>
              <Link
                to="/insights/student-loan-plan-5-calculator"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Plan 5 Student Loan Guide
              </Link>
              <Link
                to="/insights/personal-allowance-taper-100k-trap"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                60% Tax Trap Guide
              </Link>
              <Link
                to="/insights/national-insurance-2026-explained"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                National Insurance Guide
              </Link>
            </nav>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Performance principle
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              This page is static in practice, with no page-specific dependency on heavy
              scripts, so it remains fast, readable, and crawlable even when
              script-blockers are in play.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </Shell>
);

export default Methodology;
