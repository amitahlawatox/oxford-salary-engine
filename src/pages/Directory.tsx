import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const SITE = "https://www.uknetpay.co.uk";

const SALARY_LEVELS = [
  20_000, 22_000, 24_000, 25_000, 26_000, 27_000, 28_000, 29_000, 30_000,
  32_000, 33_000, 34_000, 35_000, 36_000, 37_000, 38_000, 39_000, 40_000,
  42_000, 43_000, 45_000, 47_000, 48_000, 50_000, 52_000, 55_000, 57_000,
  58_000, 60_000, 62_000, 65_000, 67_000, 68_000, 70_000, 72_000, 75_000,
  78_000, 80_000, 85_000, 90_000, 95_000, 100_000, 110_000, 120_000, 130_000,
  140_000, 150_000, 175_000, 200_000,
];

const salaryPath = (gross: number) => `/salary/${gross}-after-tax`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/directory`,
    url: `${SITE}/directory`,
    name: "Salary Directory 2026/27",
    description:
      "Browse popular UK salary after-tax pages for the 2026/27 tax year, from £20,000 to £200,000.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UK Net Pay", item: SITE },
      { "@type": "ListItem", position: 2, name: "Salary Directory", item: `${SITE}/directory` },
    ],
  },
];

const Directory = () => (
  <Shell>
    <Seo
      title="Salary Directory 2026/27 | Browse After-Tax Salary Pages"
      description="Browse Oxford-verified UK salary after-tax pages for the 2026/27 tax year. Jump straight to £30k, £50k, £100k and more."
      path="/directory"
      jsonLd={jsonLd}
    />

    <section className="mx-auto max-w-6xl px-5 sm:px-6 pt-14 pb-16">
      <div className="max-w-3xl">
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">Internal linking hub</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Browse salary pages for 2026/27
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          This directory gives users and search engines a direct route into the most useful salary
          scenarios on UK Net Pay. Every page shows an illustrative after-tax projection using the
          2026/27 public model.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Popular salary calculations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with the salary closest to your offer, current package, or negotiation target.
            </p>
          </div>
          <Link
            to="/take-home"
            className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Use the live calculator
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SALARY_LEVELS.map((gross) => (
            <Link
              key={gross}
              to={salaryPath(gross)}
              className="rounded-2xl border border-border bg-surface px-4 py-4 hover:border-accent/40 hover:bg-secondary/60 transition-colors"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Salary page
              </div>
              <div className="text-lg font-semibold tracking-tight">£{gross.toLocaleString("en-GB")} after tax</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Instant 2026/27 salary simulation and breakdown.
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Shell>
);

export default Directory;
