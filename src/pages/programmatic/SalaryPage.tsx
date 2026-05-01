import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { LeadCTA } from "@/components/article/LeadCTA";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { POPULAR_SALARIES, MIN_SALARY, MAX_SALARY } from "@/lib/salaryConstants";

const SITE = "https://www.uknetpay.co.uk";

function canonicalSalaryPath(gross: number) {
  return `/salary/${gross}-after-tax`;
}

function salaryLabel(gross: number) {
  return `£${gross.toLocaleString("en-GB")}`;
}

function parseSalaryParam(value?: string) {
  if (!value) return null;

  const directSlug = value.match(/^(\d{4,6})-after-tax$/);
  if (directSlug) return Number.parseInt(directSlug[1], 10);

  if (/^\d+$/.test(value)) {
    const raw = Number.parseInt(value, 10);
    return raw < 1000 ? raw * 1000 : raw;
  }

  const kStyle = value.match(/^(\d{2,3})k$/i);
  if (kStyle) return Number.parseInt(kStyle[1], 10) * 1000;

  return null;
}

function adjacentSalary(gross: number, step: number): number | null {
  const next = gross + step;
  if (next < MIN_SALARY || next > MAX_SALARY) return null;
  return next;
}

function nearbyPopularSalaries(gross: number): number[] {
  return POPULAR_SALARIES.filter((s) => s !== gross)
    .sort((a, b) => Math.abs(a - gross) - Math.abs(b - gross))
    .slice(0, 12);
}

const SalaryPage = () => {
  const { amount } = useParams<{ amount: string }>();
  const gross = parseSalaryParam(amount ?? "");
  const isValid = gross !== null && gross >= MIN_SALARY && gross <= MAX_SALARY;

  const englandResult = useMemo(
    () =>
      calculate({
        gross: isValid ? gross : 0,
        region: "england",
        pensionPct: 0,
        pensionMode: "personal",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [isValid, gross],
  );

  const scotlandResult = useMemo(
    () =>
      calculate({
        gross: isValid ? gross : 0,
        region: "scotland",
        pensionPct: 0,
        pensionMode: "personal",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [isValid, gross],
  );

  if (!isValid) {
    return <Navigate to="/take-home" replace />;
  }

  const canonicalPath = canonicalSalaryPath(gross);
  if (amount !== `${gross}-after-tax`) {
    return <Navigate to={canonicalPath} replace />;
  }

  const annualDifference = englandResult.net - scotlandResult.net;
  const netRounded = Math.round(englandResult.net);
  const monthlyRounded = Math.round(englandResult.net / 12);
  const weeklyRounded = Math.round(englandResult.net / 52);
  const effectiveRate = englandResult.effectiveRate.toFixed(1);
  const title = `${salaryLabel(gross)} After Tax UK 2026/27 — Take Home ${fmt(netRounded)}/yr`;
  const description = `On a ${salaryLabel(gross)} salary in 2026/27, you take home ${fmt(netRounded)} per year (${fmt(monthlyRounded)}/mo). Full breakdown: Income Tax ${fmt(Math.round(englandResult.incomeTax))}, NI ${fmt(Math.round(englandResult.ni))}. Compare England vs Scotland instantly.`;
  const url = `${SITE}${canonicalPath}`;
  const totalDeductions = Math.round(
    englandResult.incomeTax + englandResult.ni + englandResult.studentLoan,
  );

  const prevSalary = adjacentSalary(gross, gross > 100_000 ? -5_000 : -1_000);
  const nextSalary = adjacentSalary(gross, gross >= 100_000 ? 5_000 : 1_000);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url,
      description,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "UK Net Pay", item: SITE },
          { "@type": "ListItem", position: 2, name: "Salary directory", item: `${SITE}/directory` },
          { "@type": "ListItem", position: 3, name: `${salaryLabel(gross)} after tax`, item: url },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "UK Net Pay Salary Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the take-home pay on a ${salaryLabel(gross)} salary in 2026/27?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `On a gross salary of ${salaryLabel(gross)} in the 2026/27 tax year, you take home approximately ${fmt2(englandResult.net)} per year in England, Wales and Northern Ireland. That works out to about ${fmt2(englandResult.net / 12)} per month or ${fmt2(englandResult.net / 52)} per week, before any pension contributions or student loan repayments.`,
          },
        },
        {
          "@type": "Question",
          name: `How much Income Tax and National Insurance do I pay on ${salaryLabel(gross)}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `On ${salaryLabel(gross)} in 2026/27 (England, Wales & NI), you pay approximately ${fmt2(englandResult.incomeTax)} in Income Tax and ${fmt2(englandResult.ni)} in employee National Insurance contributions. Your total deductions are ${fmt2(totalDeductions)}, giving an effective tax rate of ${effectiveRate}%.`,
          },
        },
        {
          "@type": "Question",
          name: `What is ${salaryLabel(gross)} per month after tax?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `A ${salaryLabel(gross)} salary gives you approximately ${fmt2(englandResult.net / 12)} per month after tax and National Insurance in England, Wales and Northern Ireland for the 2026/27 tax year. In Scotland, the monthly take-home is approximately ${fmt2(scotlandResult.net / 12)} due to different tax bands.`,
          },
        },
        {
          "@type": "Question",
          name: `Is ${salaryLabel(gross)} a good salary in the UK?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The UK median full-time salary is approximately £35,000. A ${salaryLabel(gross)} salary is ${gross >= 35_000 ? `above the national median, putting you in the ${gross >= 50_000 ? "top 25%" : "upper half"} of UK earners` : `below the national median`}. Your actual spending power depends on your location, housing costs, and personal circumstances. Use our full calculator to factor in pension, student loans, and bonuses.`,
          },
        },
        {
          "@type": "Question",
          name: `How does a ${salaryLabel(gross)} salary compare between England and Scotland?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: annualDifference > 0
              ? `On ${salaryLabel(gross)}, you take home approximately ${fmt2(Math.abs(annualDifference))} more per year in England, Wales and Northern Ireland compared to Scotland. That is a monthly difference of about ${fmt2(Math.abs(annualDifference) / 12)}. Scotland uses a six-band income tax system with rates ranging from 19% to 48%.`
              : annualDifference < 0
                ? `On ${salaryLabel(gross)}, you take home approximately ${fmt2(Math.abs(annualDifference))} more per year in Scotland compared to England, Wales and Northern Ireland due to the Scottish starter rate being lower.`
                : `At ${salaryLabel(gross)}, the take-home pay is almost identical in both England and Scotland.`,
          },
        },
      ],
    },
  ];

  return (
    <Shell>
      <Seo title={title} description={description} path={canonicalPath} jsonLd={jsonLd} />

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-12 pb-6">
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">
          Salary landing page · 2026/27
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {salaryLabel(gross)} Salary After Tax in 2026/27
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">
          On a {salaryLabel(gross)} gross salary, you take home approximately{" "}
          <strong className="text-foreground">{fmt(netRounded)}</strong> per year ({fmt(monthlyRounded)}/month)
          in England, Wales and Northern Ireland with the standard 1257L tax code, no pension, and no
          student loan. Open the full calculator below to adjust for your circumstances.
        </p>
      </section>

      {(prevSalary || nextSalary) && (
        <nav className="mx-auto max-w-5xl px-5 sm:px-6 pb-6 flex items-center gap-3" aria-label="Adjacent salaries">
          {prevSalary && (
            <Link
              to={canonicalSalaryPath(prevSalary)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>See {salaryLabel(prevSalary)} after tax</span>
            </Link>
          )}
          <span className="flex-1" />
          {nextSalary && (
            <Link
              to={canonicalSalaryPath(nextSalary)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>See {salaryLabel(nextSalary)} after tax</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </nav>
      )}

      <section className="mx-auto max-w-5xl px-5 sm:px-6 grid sm:grid-cols-2 gap-5 pb-10">
        <RegionCard title="England, Wales & NI" result={englandResult} gross={gross} primary />
        <RegionCard title="Scotland" result={scotlandResult} gross={gross} />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-6">
        <div className="border border-border rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Quick answer</h2>
          <p className="text-sm text-muted-foreground leading-7">
            On {salaryLabel(gross)}, the standard England, Wales and Northern Ireland model keeps about{" "}
            <strong className="text-foreground">{fmt2(englandResult.net)}</strong> a year, or{" "}
            <strong className="text-foreground">{fmt2(englandResult.net / 12)}</strong> a month.
            Total Income Tax and National Insurance come to about{" "}
            <strong className="text-foreground">{fmt2(totalDeductions)}</strong>.
            Your effective tax rate is <strong className="text-foreground">{effectiveRate}%</strong>,
            meaning you keep about {(100 - englandResult.effectiveRate).toFixed(0)}p of every pound earned.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-6">
        <div className="border border-border rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            England versus Scotland on {salaryLabel(gross)}
          </h2>
          <p className="text-sm text-muted-foreground leading-7">
            {annualDifference > 0
              ? `At this salary, the standard model leaves roughly ${fmt2(Math.abs(annualDifference))} more per year in England, Wales and Northern Ireland than in Scotland.`
              : annualDifference < 0
                ? `At this salary, the standard model leaves roughly ${fmt2(Math.abs(annualDifference))} more per year in Scotland than in England, Wales and Northern Ireland.`
                : "At this salary, the standard model produces almost the same annual result in both tax regions."}
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-3">
            Difference per month: {fmt2(Math.abs(annualDifference) / 12)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-10">
        <AdSlot size="leaderboard" />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="border border-border rounded-2xl p-6 bg-card">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Detailed breakdown</h2>
            <Row label="Gross salary" value={fmt2(gross)} />
            <Row label="Personal Allowance" value={fmt2(englandResult.personalAllowance)} muted />
            <Row label="Income Tax" value={`-${fmt2(englandResult.incomeTax)}`} negative />
            <Row label="Employee NI" value={`-${fmt2(englandResult.ni)}`} negative />
            <Row label="Net take-home" value={fmt2(englandResult.net)} bold />
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <div>Per month: <span className="font-mono">{fmt(monthlyRounded)}</span></div>
              <div>Per week: <span className="font-mono">{fmt(weeklyRounded)}</span></div>
              <div>Effective rate: <span className="font-mono">{effectiveRate}%</span></div>
            </div>
          </div>

          <div className="border border-border rounded-2xl p-6 bg-card">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Methodology
            </div>
            <h3 className="font-semibold tracking-tight mb-3">How we calculate this</h3>
            <p className="text-sm text-muted-foreground leading-7 mb-4">
              This illustration uses the 2026/27 standard tax code, current National Insurance
              thresholds, and no stored user data. All calculations run in your browser — nothing
              is sent to a server.
            </p>
            <Link
              to="/oxford-methodology"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Read the full methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-12">
        <div className="border border-amber-300/60 bg-amber-50/40 rounded-2xl p-5 text-sm text-muted-foreground leading-7">
          <strong className="text-foreground">Disclaimer:</strong> This tool provides an illustrative
          simulation based on 2026/27 HMRC standard rates. It does not constitute financial or tax
          advice. Always consult a certified accountant for decisions that depend on your exact
          circumstances.
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-12">
        <LeadCTA variant="mortgage" />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-16">
        <div className="border border-border rounded-2xl p-6 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold tracking-tight">Want pension, bonus, and student loan included?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Open the full calculator to turn this quick illustration into your own scenario.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShareSummary
              summary={`${salaryLabel(gross)} after tax (2026/27) · Net/month ${fmt(englandResult.net / 12)} · ${SITE}${canonicalPath}`}
              title={title}
              compact
            />
            <Link
              to={`/take-home?salary=${gross}`}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
            >
              Open calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Other salary pages</h2>
        <div className="flex flex-wrap gap-2">
          {nearbyPopularSalaries(gross).map((value) => (
            <Link
              key={value}
              to={canonicalSalaryPath(value)}
              className="px-3 h-8 inline-flex items-center rounded-full border border-border text-xs font-mono hover:bg-secondary transition-colors"
            >
              {salaryLabel(value)} after tax
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            to="/directory"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all salary pages
          </Link>
        </div>
      </section>
    </Shell>
  );
};

const RegionCard = ({
  title,
  result,
  gross,
  primary,
}: {
  title: string;
  result: ReturnType<typeof calculate>;
  gross: number;
  primary?: boolean;
}) => (
  <div className={`rounded-2xl p-6 border ${primary ? "border-accent/40 bg-card shadow-card" : "border-border bg-card"}`}>
    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{title}</div>
    <div className="font-mono text-3xl font-semibold mt-2 tabular-nums">
      {fmt(result.net)}
      <span className="text-base text-muted-foreground font-normal">/yr</span>
    </div>
    <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Per month</div>
        <div className="font-mono mt-1 tabular-nums">{fmt(result.net / 12)}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Per week</div>
        <div className="font-mono mt-1 tabular-nums">{fmt(result.net / 52)}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Effective</div>
        <div className="font-mono mt-1 tabular-nums">{result.effectiveRate.toFixed(1)}%</div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-mono">
      Gross {fmt(gross)} · Tax {fmt(result.incomeTax)} · NI {fmt(result.ni)}
    </div>
  </div>
);

const Row = ({
  label,
  value,
  negative,
  bold,
  muted,
}: {
  label: string;
  value: string;
  negative?: boolean;
  bold?: boolean;
  muted?: boolean;
}) => (
  <div className={`flex items-baseline justify-between py-2.5 border-b border-border last:border-0 ${bold ? "pt-4 mt-2 border-t" : ""}`}>
    <span className={`text-sm ${bold ? "font-semibold" : muted ? "text-muted-foreground" : ""}`}>{label}</span>
    <span className={`font-mono tabular-nums ${bold ? "text-lg font-semibold" : negative ? "text-destructive" : ""}`}>{value}</span>
  </div>
);

export default SalaryPage;
