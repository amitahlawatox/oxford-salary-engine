import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Baby,
  Briefcase,
  Building2,
  Calculator,
  Clock,
  FileSignature,
  Hammer,
  Lock,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { ARTICLES } from "@/content/articles";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { calculate } from "@/lib/tax/engine";
import { fmt as fmtGBP } from "@/lib/format";

type Tool = {
  to: string;
  title: string;
  desc: string;
  icon: typeof Calculator;
  unique?: boolean;
};

const TOOLS: Tool[] = [
  { to: "/take-home", title: "Take-Home Pay", desc: "Annual gross to net. Tax code, all student loan plans, bonus, overtime and pension.", icon: Calculator },
  { to: "/hourly", title: "Hourly Wage", desc: "Hourly rate plus hours per week into annual take-home.", icon: Clock },
  { to: "/reverse", title: "Reverse Salary", desc: "Target net income into required gross salary.", icon: RotateCcw },
  { to: "/pay-rise", title: "Pay Rise Simulator", desc: "How much of that raise actually reaches your bank?", icon: TrendingUp, unique: true },
  { to: "/compare", title: "Two-Salary Compare", desc: "Side-by-side current role versus new offer.", icon: Users },
  { to: "/pro-rata", title: "Pro-Rata", desc: "Part-time hours into adjusted salary and tax.", icon: Briefcase },
  { to: "/two-jobs", title: "Two Jobs", desc: "Combined tax across two employments.", icon: Briefcase },
  { to: "/maternity", title: "Maternity / SMP", desc: "Reduced-pay periods across the year.", icon: Baby },
  { to: "/self-employed", title: "Self-Employed", desc: "Class 2 and 4 NI with payments on account.", icon: Hammer, unique: true },
  { to: "/dividend", title: "Dividend Optimiser", desc: "Director salary plus dividends, optimal mix.", icon: Building2, unique: true },
  { to: "/ir35", title: "IR35 Contractor", desc: "Inside versus outside take-home.", icon: FileSignature, unique: true },
  { to: "/cost-of-living", title: "Cost of Living", desc: "Does your net cover London, Manchester or Edinburgh?", icon: MapPin, unique: true },
];

const FAQ = [
  {
    q: "How is UK take-home pay calculated for 2026/27?",
    a: "We deduct Income Tax, Class 1 National Insurance, any Student Loan repayment, and pension contributions. Personal allowance tapers between £100,000 and £125,140.",
  },
  {
    q: "Is the calculator updated for the 2026/27 tax year?",
    a: "Yes. The public model uses the current 2026/27 tax bands, NI thresholds, Student Loan plans 1, 2, 4, 5 and Postgrad, plus the current dividend rates.",
  },
  {
    q: "Does my data leave the browser?",
    a: "No. Every calculation runs locally in your browser. Nothing is logged, stored or sent to a server for salary processing.",
  },
  {
    q: "How does this compare to other UK salary calculators?",
    a: "We cover salary, reverse salary, hourly, self-employed, IR35, dividend and cost-of-living scenarios in one privacy-first engine rather than splitting them across separate products.",
  },
];

const POPULAR_SALARIES = [30_000, 35_000, 40_000, 50_000, 60_000, 75_000, 100_000, 120_000];

const salaryPath = (gross: number) => `/salary/${gross}-after-tax`;

const Index = () => {
  const [gross, setGross] = useState("");
  const grossAmount = Number(gross) || 0;

  const result = useMemo(
    () =>
      calculate({
        gross: grossAmount,
        taxCode: "1257L",
        studentLoan: "none",
        pensionPct: 0,
        pensionMode: "personal",
        bonus: 0,
        overtime: 0,
        region: "england",
      }),
    [grossAmount],
  );

  const handleGrossChange = (value: string) => {
    setGross(value.replace(/[^0-9.]/g, ""));
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "UK Net Pay Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
    },
  ];

  return (
    <Shell>
      <Seo
        title="UK Salary Calculator 2026/27 - Take-Home Pay After Tax"
        description="Free UK salary and tax calculator for 2026/27. See take-home pay after Income Tax, NI, Student Loan and pension with privacy-first in-browser calculations."
        path="/"
        jsonLd={jsonLd}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-orb size-[500px] bg-aurora-1 -top-40 -left-40" />
        <div className="aurora-orb size-[400px] bg-aurora-3 top-20 -right-32" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-12 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/60 backdrop-blur text-xs font-medium mb-6">
              <Sparkles className="h-3 w-3 text-accent" />
              <span>Updated for the 2026/27 tax year</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-5">
              The <span className="text-aurora font-semibold">Algorithm</span>
              <br />
              of UK Net Income.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-[58ch] mb-7 leading-relaxed">
              Twelve precision calculators for UK salary, tax, dividends and contracting. Calculated
              to the penny against HMRC 2026/27 rates. No sign-up. Privacy-first.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/take-home"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-glow"
              >
                Open calculator <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dividend"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition"
              >
                Dividend optimiser
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <Stat icon={ShieldCheck} label="Accuracy" value="±0.01p" />
              <Stat icon={Zap} label="Tools" value="12 live" />
              <Stat icon={Lock} label="Privacy" value="In-browser" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-px rounded-2xl bg-gradient-to-b from-border to-transparent">
              <div className="bg-card rounded-2xl p-6 sm:p-7 shadow-card relative">
                <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-accent/70">
                  2026/27
                </div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2">Annual salary</label>
                <div className="relative mb-5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                    £
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={gross}
                    onChange={(event) => handleGrossChange(event.target.value)}
                    placeholder="Enter salary"
                    aria-label="Annual salary"
                    className="w-full bg-surface border border-border rounded-xl pl-8 pr-3 py-3 text-foreground text-2xl font-semibold tabular-nums focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <MiniStat label="Net / month" value={fmtGBP(result.net / 12)} accent />
                  <MiniStat label="Tax + NI / month" value={fmtGBP((result.incomeTax + result.ni) / 12)} />
                  <MiniStat label="Tax rate" value={`${result.effectiveRate.toFixed(1)}%`} />
                  <MiniStat label="Net / year" value={fmtGBP(result.net)} />
                </div>
                <Link
                  to={`/take-home?salary=${grossAmount}`}
                  className="block w-full text-center bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Open full calculator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                Popular calculations
              </div>
              <h2 className="text-2xl font-light tracking-tight">Browse popular salary pages</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              These salary pages give users and search engines a direct route into the most useful
              take-home scenarios.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {POPULAR_SALARIES.map((grossValue) => (
              <Link
                key={grossValue}
                to={salaryPath(grossValue)}
                className="px-3 h-9 inline-flex items-center rounded-full border border-border text-sm font-mono hover:bg-secondary transition-colors"
              >
                £{grossValue.toLocaleString("en-GB")} after tax
              </Link>
            ))}
          </div>
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Open the full salary directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <AdSlot size="leaderboard" />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Intelligence Modules</h2>
            <p className="text-sm text-muted-foreground mt-1">Twelve calculators. One precise tax engine.</p>
          </div>
          <span className="text-xs font-mono uppercase text-muted-foreground tabular hidden sm:inline">
            12 live
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.title} to={tool.to} className="group bg-card hover:bg-surface transition-colors p-5 sm:p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:shadow-glow transition-all">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  {tool.unique && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-aurora-soft text-accent uppercase tracking-widest">
                      Unique
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  MOD.{String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 tracking-tight">{tool.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                <ArrowRight className="absolute bottom-5 right-5 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 border-t border-border">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
              Insights · {ARTICLES.length} guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Latest UK tax and salary guides</h2>
          </div>
          <Link to="/insights" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition">
            All insights <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARTICLES.slice(0, 6).map((article) => (
            <Link
              key={article.slug}
              to={`/insights/${article.slug}`}
              className="group flex flex-col border border-border rounded-2xl p-5 bg-card hover:border-accent/50 hover:shadow-card transition-all"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">{article.category}</div>
              <h3 className="text-base font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
              <div className="mt-auto pt-4 text-[11px] font-mono text-muted-foreground">
                {article.readMinutes} min read
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">UK Salary Calculator - How it Works</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Working out your UK take-home pay involves more than subtracting a single tax rate. Our
                2026/27 engine layers <strong className="text-foreground">Income Tax</strong> (20% / 40% / 45%),
                <strong className="text-foreground"> Class 1 National Insurance</strong> (8% main / 2% upper),
                Student Loan repayments across all five plans, and your chosen pension scheme - including the
                <strong className="text-foreground"> £100k-£125,140 personal-allowance taper</strong> that
                creates a hidden 60% marginal rate.
              </p>
              <p>
                For company directors and contractors we go further: the Dividend Optimiser explores the
                salary and dividend mix for the 2026/27 dividend rates, while the IR35 tool compares inside
                versus outside take-home.
              </p>
              <p>
                Self-employed users get Class 2 and Class 4 NI calculations plus payments-on-account
                forecasts. The cost-of-living overlay helps show whether your net pay actually covers a
                chosen UK city.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light tracking-tight mb-6">Frequently asked</h2>
            <div className="divide-y divide-border border-y border-border">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium text-foreground pr-4">{item.q}</span>
                    <span className="text-accent group-open:rotate-45 transition-transform text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <AdSlot size="mpu" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">2026/27 quick rates</h4>
            <ul className="space-y-3 text-sm">
              <RateRow label="Personal Allowance" value="£12,570" />
              <RateRow label="Basic Rate (20%)" value="up to £50,270" />
              <RateRow label="Higher Rate (40%)" value="£50,271+" />
              <RateRow label="Additional (45%)" value="£125,140+" />
              <RateRow label="NI Primary" value="8% / 2%" />
              <RateRow label="Dividend Allowance" value="£500" />
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-aurora-soft p-6">
            <p className="text-sm text-foreground font-medium mb-2">Privacy by design</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All calculations run inside your browser. Nothing is sent, logged or stored.
            </p>
          </div>
        </aside>
      </section>
    </Shell>
  );
};

function Stat({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] uppercase tracking-widest font-medium">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground tabular">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-3">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className={`text-base font-mono tabular font-semibold ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between items-center pb-2 border-b border-border last:border-0 last:pb-0">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-mono tabular text-foreground text-xs font-semibold">{value}</span>
    </li>
  );
}

export default Index;
