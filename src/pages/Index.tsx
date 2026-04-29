import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ArrowRight, Calculator, Clock, RotateCcw, TrendingUp, Users,
  Briefcase, Baby, Hammer, Building2, FileSignature, MapPin, Sparkles,
  ShieldCheck, Zap, Lock,
} from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { calculateTakeHome } from "@/lib/tax/engine";
import { fmtGBP } from "@/lib/format";

type Tool = {
  to: string; title: string; desc: string; icon: typeof Calculator;
  unique?: boolean;
};

const TOOLS: Tool[] = [
  { to: "/take-home", title: "Take-Home Pay", desc: "Annual gross → net. Tax code, all SL plans, bonus, overtime, pension.", icon: Calculator },
  { to: "/hourly", title: "Hourly Wage", desc: "Hourly rate + hours/week → annual take-home.", icon: Clock },
  { to: "/reverse", title: "Reverse Salary", desc: "Target net income → required gross salary.", icon: RotateCcw },
  { to: "/pay-rise", title: "Pay Rise Simulator", desc: "How much of that raise actually reaches your bank?", icon: TrendingUp, unique: true },
  { to: "/compare", title: "Two-Salary Compare", desc: "Side-by-side: current job vs new offer.", icon: Users },
  { to: "/pro-rata", title: "Pro-Rata", desc: "Part-time hours → adjusted salary + tax.", icon: Briefcase },
  { to: "/two-jobs", title: "Two Jobs", desc: "Combined tax across two employments.", icon: Briefcase },
  { to: "/maternity", title: "Maternity / SMP", desc: "Reduced-pay periods impact across the year.", icon: Baby },
  { to: "/self-employed", title: "Self-Employed", desc: "Class 2 + 4 NI, payments on account.", icon: Hammer, unique: true },
  { to: "/dividend", title: "Dividend Optimiser", desc: "Director salary + dividends, optimal mix.", icon: Building2, unique: true },
  { to: "/ir35", title: "IR35 Contractor", desc: "Inside vs outside IR35 take-home.", icon: FileSignature, unique: true },
  { to: "/cost-of-living", title: "Cost-of-Living", desc: "Does your net cover London? Manchester?", icon: MapPin, unique: true },
];

const FAQ = [
  { q: "How is UK take-home pay calculated for 2026/27?", a: "We deduct Income Tax (20% / 40% / 45% bands above the £12,570 personal allowance), Class 1 National Insurance (8% / 2%), any Student Loan repayment, and pension contributions. Personal allowance tapers between £100k–£125,140." },
  { q: "Is the calculator updated for the 2026/27 tax year?", a: "Yes — all tax bands, NI thresholds, Student Loan plans (1, 2, 4, 5, Postgrad) and dividend rates reflect the April 2026 Budget." },
  { q: "Does my data leave the browser?", a: "No. Every calculation runs locally in your browser. Nothing is logged, stored, or sent to a server." },
  { q: "How does this compare to other UK salary calculators?", a: "We cover 12 distinct scenarios — including IR35, dividend optimisation, and cost-of-living overlays — that single-purpose calculators do not." },
];

const Index = () => {
  const [gross, setGross] = useState(54250);
  const result = useMemo(
    () => calculateTakeHome({ gross, taxCode: "1257L", studentLoan: "none", pensionPct: 0, region: "england-wales-ni" }),
    [gross]
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Shell>
      <Seo
        title="UK Salary Calculator 2026/27 — Take-Home Pay After Tax"
        description="Free UK salary & tax calculator for 2026/27. See take-home pay after Income Tax, NI, Student Loan, pension. 12 calculators including dividend, IR35 & self-employed."
        path="/"
        jsonLd={jsonLd}
      />

      {/* HERO */}
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
              The <span className="text-aurora font-semibold">Algorithm</span><br />of UK Net Income.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-[58ch] mb-7 leading-relaxed">
              Twelve precision calculators for UK salary, tax, dividends and contracting.
              Calculated to the penny against HMRC 2026/27 rates. No sign-up. Privacy-first.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/take-home" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-glow">
                Open calculator <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dividend" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary transition">
                Dividend optimiser
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <Stat icon={ShieldCheck} label="Accuracy" value="±0.01p" />
              <Stat icon={Zap} label="Tools" value="12 live" />
              <Stat icon={Lock} label="Privacy" value="In-browser" />
            </div>
          </div>

          {/* Live mini calculator */}
          <div className="lg:col-span-5">
            <div className="p-px rounded-2xl bg-gradient-to-b from-border to-transparent">
              <div className="bg-card rounded-2xl p-6 sm:p-7 shadow-card relative">
                <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-accent/70">Live · v4.2</div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Gross Annual Income</label>
                <div className="relative mb-5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                  <input
                    type="number"
                    value={gross}
                    onChange={(e) => setGross(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-surface border border-border rounded-xl pl-8 pr-3 py-3 text-foreground font-mono text-2xl tabular focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <MiniStat label="Net / month" value={fmtGBP(result.netMonthly)} accent />
                  <MiniStat label="Tax + NI / mo" value={fmtGBP((result.incomeTaxAnnual + result.niAnnual) / 12)} />
                  <MiniStat label="Effective rate" value={`${((1 - result.netAnnual / Math.max(gross, 1)) * 100).toFixed(1)}%`} />
                  <MiniStat label="Net / year" value={fmtGBP(result.netAnnual)} />
                </div>
                <Link to={`/take-home?gross=${gross}`} className="block w-full text-center bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-semibold py-3 rounded-xl transition-all text-sm">
                  Open full calculator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense leaderboard */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <AdSlot size="leaderboard" />
      </section>

      {/* TOOLS GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Intelligence Modules</h2>
            <p className="text-sm text-muted-foreground mt-1">Twelve calculators. One precise tax engine.</p>
          </div>
          <span className="text-xs font-mono uppercase text-muted-foreground tabular hidden sm:inline">12 live</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {TOOLS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Link key={t.title} to={t.to} className="group bg-card hover:bg-surface transition-colors p-5 sm:p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:shadow-glow transition-all">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  {t.unique && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-aurora-soft text-accent uppercase tracking-widest">Unique</span>
                  )}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">MOD.{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-semibold text-foreground mb-1.5 tracking-tight">{t.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                <ArrowRight className="absolute bottom-5 right-5 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO CONTENT + SIDEBAR AD */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-light tracking-tight mb-4">UK Salary Calculator — How it Works</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Working out your UK take-home pay involves more than subtracting a single tax rate.
                Our 2026/27 engine layers <strong className="text-foreground">Income Tax</strong> (20% / 40% / 45%),
                <strong className="text-foreground"> Class 1 National Insurance</strong> (8% main / 2% upper),
                Student Loan repayments across all five plans, and your chosen pension scheme — including
                the <strong className="text-foreground">£100k–£125,140 personal-allowance taper</strong> that
                creates a hidden 60% marginal rate.
              </p>
              <p>
                For company directors and contractors we go further: the Dividend Optimiser finds the most
                tax-efficient salary/dividend split for the 2026/27 dividend rates (8.75% / 33.75% / 39.35%),
                while the IR35 tool compares Inside vs Outside take-home including 19–25% Corporation Tax.
              </p>
              <p>
                Self-employed users get accurate Class 2 + Class 4 NI calculations and payments-on-account forecasts.
                The Cost-of-Living overlay shows whether your net pay actually covers a chosen UK city.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-light tracking-tight mb-6">Frequently Asked</h2>
            <div className="divide-y divide-border border-y border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium text-foreground pr-4">{f.q}</span>
                    <span className="text-accent group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <AdSlot size="mpu" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">2026/27 Quick Rates</h4>
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
              All calculations run inside your browser. Nothing is sent, logged, or stored.
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
      <div className={`text-base font-mono tabular font-semibold ${accent ? "text-accent" : "text-foreground"}`}>{value}</div>
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
