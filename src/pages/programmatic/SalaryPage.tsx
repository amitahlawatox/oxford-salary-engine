import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { LeadCTA } from "@/components/article/LeadCTA";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";

const SITE = "https://www.uknetpay.co.uk";
const SUPPORTED_GROSS = [
  20_000, 25_000, 30_000, 35_000, 40_000, 45_000, 50_000, 55_000, 60_000,
  65_000, 70_000, 75_000, 80_000, 90_000, 100_000, 120_000, 150_000,
];

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

const SalaryPage = () => {
  const { amount } = useParams<{ amount: string }>();
  const gross = parseSalaryParam(amount ?? "");
  const validGross = gross && SUPPORTED_GROSS.includes(gross) ? gross : 0;

  const englandResult = useMemo(
    () =>
      calculate({
        gross: validGross,
        region: "england",
        pensionPct: 0,
        pensionMode: "personal",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [validGross],
  );

  const scotlandResult = useMemo(
    () =>
      calculate({
        gross: validGross,
        region: "scotland",
        pensionPct: 0,
        pensionMode: "personal",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [validGross],
  );

  if (!gross || !SUPPORTED_GROSS.includes(gross)) {
    return <Navigate to="/take-home" replace />;
  }

  const canonicalPath = canonicalSalaryPath(gross);
  if (amount !== `${gross}-after-tax`) {
    return <Navigate to={canonicalPath} replace />;
  }

  const annualDifference = englandResult.net - scotlandResult.net;
  const title = `${salaryLabel(gross)} Salary After Tax 2026/27 | Instant & Oxford Verified`;
  const description = `See the estimated 2026/27 take-home pay on ${salaryLabel(gross)} instantly. Compare England, Wales and NI with Scotland, then open the full Oxford salary calculator for pension, bonus and student loan scenarios.`;
  const url = `${SITE}${canonicalPath}`;
  const totalDeductions = Math.round(
    englandResult.incomeTax + englandResult.ni + englandResult.studentLoan,
  );

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
          name: `What is the take-home pay on ${salaryLabel(gross)} in 2026/27?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `A gross salary of ${salaryLabel(gross)} leaves approximately ${fmt2(englandResult.net)} a year in England, Wales and Northern Ireland, or about ${fmt2(englandResult.net / 12)} a month before any personal pension or student loan adjustments.`,
          },
        },
        {
          "@type": "Question",
          name: `How much tax and NI do I pay on ${salaryLabel(gross)}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `On ${salaryLabel(gross)}, the standard 2026/27 model shows about ${fmt2(englandResult.incomeTax)} in Income Tax and ${fmt2(englandResult.ni)} in employee National Insurance for England, Wales and Northern Ireland.`,
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
          This page shows the standard 2026/27 take-home pay on {salaryLabel(gross)} with no pension,
          no student loan, and the default 1257L tax code. It is a fast illustration first, then you
          can open the full calculator for your own pension, bonus, overtime, and region choices.
        </p>
      </section>

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
          </div>

          <div className="border border-border rounded-2xl p-6 bg-card">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Oxford methodology
            </div>
            <h3 className="font-semibold tracking-tight mb-3">How we calculate this</h3>
            <p className="text-sm text-muted-foreground leading-7 mb-4">
              This illustration uses the 2026/27 standard tax code, current National Insurance
              thresholds, and no stored user data. The full methodology explains the assumptions and
              the public-model limits.
            </p>
            <Link
              to="/oxford-methodology"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Read the Oxford Methodology
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
        <h2 className="text-xl font-semibold tracking-tight mb-4">Other popular salary pages</h2>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_GROSS.filter((value) => value !== gross).map((value) => (
            <Link
              key={value}
              to={canonicalSalaryPath(value)}
              className="px-3 h-8 inline-flex items-center rounded-full border border-border text-xs font-mono hover:bg-secondary transition-colors"
            >
              {salaryLabel(value)}
            </Link>
          ))}
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
