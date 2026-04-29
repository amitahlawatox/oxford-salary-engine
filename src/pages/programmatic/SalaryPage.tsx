import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { LeadCTA } from "@/components/article/LeadCTA";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";

const SUPPORTED = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 120, 150];
const SITE = "https://uknetpay.co.uk";

const SalaryPage = () => {
  const { amount } = useParams<{ amount: string }>();
  const k = parseInt(amount ?? "0", 10);
  if (!k || !SUPPORTED.includes(k)) return <Navigate to="/take-home" replace />;
  const gross = k * 1000;

  const rUk = useMemo(() => calculate({ gross, region: "england", pensionPct: 0, pensionMode: "personal", studentLoan: "none", bonus: 0, overtime: 0 }), [gross]);
  const sct = useMemo(() => calculate({ gross, region: "scotland", pensionPct: 0, pensionMode: "personal", studentLoan: "none", bonus: 0, overtime: 0 }), [gross]);
  const diff = rUk.net - sct.net;

  const title = `£${k}k Salary After Tax UK 2026/27 — Take-Home Pay`;
  const description = `What's the take-home on a £${gross.toLocaleString()} salary in 2026/27? Monthly, weekly and Scottish vs English net pay compared.`;
  const url = `${SITE}/salary/${k}`;

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
          { "@type": "ListItem", position: 2, name: "Salary guides", item: `${SITE}/take-home` },
          { "@type": "ListItem", position: 3, name: `£${k}k`, item: url },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: `What is the take-home pay on £${gross.toLocaleString()} in 2026/27?`,
          acceptedAnswer: { "@type": "Answer", text: `In England, Wales and Northern Ireland a £${gross.toLocaleString()} gross salary nets approximately £${Math.round(rUk.net).toLocaleString()} per year, or £${Math.round(rUk.net / 12).toLocaleString()} per month. In Scotland it's about £${Math.round(sct.net).toLocaleString()} per year.` } },
        { "@type": "Question", name: `How much tax do I pay on £${gross.toLocaleString()}?`,
          acceptedAnswer: { "@type": "Answer", text: `Income Tax of £${Math.round(rUk.incomeTax).toLocaleString()} and National Insurance of £${Math.round(rUk.ni).toLocaleString()} in England — total deductions of about £${Math.round(rUk.incomeTax + rUk.ni).toLocaleString()}.` } },
      ],
    },
  ];

  return (
    <Shell>
      <Seo title={title} description={description} path={`/salary/${k}`} jsonLd={jsonLd} />

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-12 pb-6">
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">Salary guide · 2026/27</div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">£{k}k Salary After Tax — UK Take-Home Pay</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          A £{gross.toLocaleString()} gross salary in the 2026/27 tax year leaves you with the figures below after Income Tax and National Insurance.
          Pension contributions and Student Loan can change the result — use the calculator at the bottom to model yours.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 grid sm:grid-cols-2 gap-5 pb-10">
        <RegionCard title="England · Wales · NI" r={rUk} gross={gross} primary />
        <RegionCard title="Scotland" r={sct} gross={gross} />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-6">
        <div className="border border-border rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-semibold tracking-tight mb-4">England vs Scotland on £{gross.toLocaleString()}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {diff > 0
              ? `You would keep approximately £${Math.round(diff).toLocaleString()} more per year in England, Wales or Northern Ireland than in Scotland.`
              : diff < 0
              ? `You would keep approximately £${Math.round(Math.abs(diff)).toLocaleString()} more per year in Scotland than in the rest of the UK.`
              : `The take-home is essentially the same in both regions at this salary level.`}
          </p>
          <div className="text-xs text-muted-foreground font-mono">
            Difference per month: £{Math.round(Math.abs(diff) / 12).toLocaleString()}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-10">
        <AdSlot size="leaderboard" />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Detailed breakdown — England</h2>
        <div className="border border-border rounded-2xl p-6 bg-card">
          <Row label="Gross salary" value={fmt2(gross)} />
          <Row label="Personal Allowance" value={fmt2(rUk.personalAllowance)} muted />
          <Row label="Income Tax" value={`−${fmt2(rUk.incomeTax)}`} negative />
          <Row label="National Insurance" value={`−${fmt2(rUk.ni)}`} negative />
          <Row label="Net take-home" value={fmt2(rUk.net)} bold />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-12">
        <LeadCTA variant="mortgage" />
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-16">
        <div className="border border-border rounded-2xl p-6 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold tracking-tight">Want pension, bonus and Student Loan factored in?</h3>
            <p className="text-sm text-muted-foreground mt-1">Use the full calculator — fully customisable, no sign-up.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShareSummary summary={`£${k}k UK take-home (2026/27) — England: ${fmt(rUk.net)}/yr · Scotland: ${fmt(sct.net)}/yr`} title={title} compact />
            <Link to={`/take-home?salary=${gross}`} className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition">
              Open calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Other salary guides</h2>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED.filter((x) => x !== k).map((x) => (
            <Link
              key={x}
              to={`/salary/${x}`}
              className="px-3 h-8 inline-flex items-center rounded-full border border-border text-xs font-mono hover:bg-secondary transition-colors"
            >
              £{x}k
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
};

const RegionCard = ({ title, r, gross, primary }: { title: string; r: ReturnType<typeof calculate>; gross: number; primary?: boolean }) => (
  <div className={`rounded-2xl p-6 border ${primary ? "border-accent/40 bg-card shadow-card" : "border-border bg-card"}`}>
    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{title}</div>
    <div className="font-mono text-3xl font-semibold mt-2 tabular-nums">{fmt(r.net)}<span className="text-base text-muted-foreground font-normal">/yr</span></div>
    <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
      <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Per month</div><div className="font-mono mt-1 tabular-nums">{fmt(r.net / 12)}</div></div>
      <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Per week</div><div className="font-mono mt-1 tabular-nums">{fmt(r.net / 52)}</div></div>
      <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Effective</div><div className="font-mono mt-1 tabular-nums">{r.effectiveRate.toFixed(1)}%</div></div>
    </div>
    <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-mono">
      Gross {fmt(gross)} · Tax {fmt(r.incomeTax)} · NI {fmt(r.ni)}
    </div>
  </div>
);

const Row = ({ label, value, negative, bold, muted }: { label: string; value: string; negative?: boolean; bold?: boolean; muted?: boolean }) => (
  <div className={`flex items-baseline justify-between py-2.5 border-b border-border last:border-0 ${bold ? "pt-4 mt-2 border-t" : ""}`}>
    <span className={`text-sm ${bold ? "font-semibold" : muted ? "text-muted-foreground" : ""}`}>{label}</span>
    <span className={`font-mono tabular-nums ${bold ? "text-lg font-semibold" : negative ? "text-destructive" : ""}`}>{value}</span>
  </div>
);

export default SalaryPage;
