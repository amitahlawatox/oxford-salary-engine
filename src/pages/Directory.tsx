import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ALL_SITEMAP_SALARIES } from "@/lib/salaryConstants";

const SITE = "https://www.uknetpay.co.uk";

const salaryPath = (gross: number) => `/salary/${gross}-after-tax`;
const salaryLabel = (gross: number) => `£${gross.toLocaleString("en-GB")}`;

const BANDS: { label: string; min: number; max: number }[] = [
  { label: "£15,000 – £25,000", min: 15_000, max: 25_000 },
  { label: "£26,000 – £35,000", min: 26_000, max: 35_000 },
  { label: "£36,000 – £50,000", min: 36_000, max: 50_000 },
  { label: "£51,000 – £75,000", min: 51_000, max: 75_000 },
  { label: "£76,000 – £100,000", min: 76_000, max: 100_000 },
  { label: "£100,000+", min: 100_001, max: Infinity },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/directory`,
    url: `${SITE}/directory`,
    name: "UK Salary After Tax Directory 2026/27",
    description:
      "Browse 100+ UK salary after-tax pages for the 2026/27 tax year, from £15,000 to £200,000. Find your exact salary and see your take-home pay instantly.",
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
      title="UK Salary After Tax Directory 2026/27 — Every Salary from £15k to £200k"
      description="Browse 100+ salary after-tax pages for the 2026/27 UK tax year. See your exact take-home pay on any salary from £15,000 to £200,000 — free, instant, and private."
      path="/directory"
      jsonLd={jsonLd}
    />

    <section className="mx-auto max-w-6xl px-5 sm:px-6 pt-14 pb-10">
      <div className="max-w-3xl">
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
          Salary directory · 2026/27
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          UK salary after tax — every amount from £15k to £200k
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Find your exact gross salary below and see the 2026/27 take-home pay instantly. Every page
          shows a full breakdown of Income Tax, National Insurance, and a side-by-side England vs
          Scotland comparison. All calculations run in your browser — nothing is sent to a server.
        </p>
      </div>
    </section>

    {BANDS.map((band) => {
      const salaries = ALL_SITEMAP_SALARIES.filter(
        (s) => s >= band.min && s <= band.max,
      );
      if (salaries.length === 0) return null;
      return (
        <section
          key={band.label}
          className="mx-auto max-w-6xl px-5 sm:px-6 pb-10"
        >
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            {band.label}
          </h2>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {salaries.map((gross) => (
              <Link
                key={gross}
                to={salaryPath(gross)}
                className="rounded-xl border border-border px-4 py-3 hover:border-accent/40 hover:bg-secondary/60 transition-colors"
              >
                <div className="text-sm font-semibold tracking-tight">
                  {salaryLabel(gross)} after tax
                </div>
              </Link>
            ))}
          </div>
        </section>
      );
    })}

    <section className="mx-auto max-w-6xl px-5 sm:px-6 pb-16">
      <div className="border border-border rounded-2xl p-6 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold tracking-tight">
            Don't see your salary?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            The full calculator supports any salary amount with pension, bonus,
            and student loan options.
          </p>
        </div>
        <Link
          to="/take-home"
          className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
        >
          Use the live calculator
        </Link>
      </div>
    </section>
  </Shell>
);

export default Directory;
