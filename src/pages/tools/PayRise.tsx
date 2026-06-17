import { useMemo } from "react";
import { ArrowRight, Download, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/layout/Shell";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, type Region } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { LazyMarginalCurve as MarginalCurve } from "@/components/charts/LazyMarginalCurve";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

const base = (gross: number, region: Region) =>
  calculate({ gross, region, pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 });

const PayRise = () => {
  const [s, set] = useUrlState({
    salary: 45000,
    rise: 3000,
    region: "england" as Region,
  });

  const before = useMemo(() => base(s.salary, s.region), [s.salary, s.region]);
  const after = useMemo(() => base(s.salary + s.rise, s.region), [s.salary, s.rise, s.region]);

  const netGain = after.net - before.net;
  const keptPct = s.rise > 0 ? (netGain / s.rise) * 100 : 0;
  const lostToTax = s.rise - netGain;

  const calcInputAfter = { gross: s.salary + s.rise, region: s.region, pensionPct: 0 as number, pensionMode: "salary-sacrifice" as const, studentLoan: "none" as const, bonus: 0, overtime: 0 };

  return (
    <Shell>
      
      <ToolSeo path="/pay-rise" />
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <TrendingUp className="h-6 w-6" /> Pay Rise Simulator
        </h1>
        <p className="mt-2 text-muted-foreground">See exactly how much of your raise actually reaches your bank account.</p>
        <div className="mt-4">
          <ShareSummary summary={`Pay Rise Simulator — see my UK calculation for the 2026/27 tax year`} title="Pay Rise Simulator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 space-y-6">
        <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="text-sm">Current salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary === 0 ? "" : s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
            </div>
            <Slider className="mt-3" min={0} max={200000} step={500} value={[s.salary]} onValueChange={(v) => set({ salary: v[0] })} />
          </div>
          <div>
            <Label className="text-sm">Pay rise (£)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.rise === 0 ? "" : s.rise} onChange={(e) => set({ rise: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
            </div>
            <Slider className="mt-3" min={0} max={50000} step={250} value={[s.rise]} onValueChange={(v) => set({ rise: v[0] })} />
          </div>
          <div>
            <Label className="text-sm">Region</Label>
            <Tabs value={s.region} onValueChange={(v) => set({ region: v as Region })} className="mt-2">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="england">rUK</TabsTrigger>
                <TabsTrigger value="scotland">Scotland</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Headline delta */}
        <div className="border border-border rounded-lg p-8 bg-card text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Of your {fmt(s.rise)} raise, you actually keep</div>
          <div className="font-mono-num text-5xl md:text-6xl font-semibold mt-3 text-accent">{fmt(netGain)}</div>
          <div className="text-sm text-muted-foreground mt-2">
            That's <span className="font-mono-num text-foreground">{keptPct.toFixed(0)}%</span> of the gross —{" "}
            <span className="font-mono-num text-destructive">{fmt(lostToTax)}</span> goes to tax & NI.
          </div>
          <div className="text-xs text-muted-foreground mt-1">+{fmt(netGain / 12)} per month after deductions.</div>
        </div>

        {/* Side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Compare title="Before" gross={s.salary} net={before.net} tax={before.incomeTax + before.ni} />
          <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground justify-self-center" />
          <Compare title="After" gross={s.salary + s.rise} net={after.net} tax={after.incomeTax + after.ni} highlight />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-5 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">After raise - Tax by band</div>
            <BandBreakdown result={after} />
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Take-home curve</div>
            <MarginalCurve input={calcInputAfter} />
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Marginal rate</div>
          <div className="text-sm">
            On the next £1 you earn, you'll keep{" "}
            <span className="font-mono-num font-semibold text-foreground">{(100 - after.marginalRate).toFixed(0)}p</span> and pay{" "}
            <span className="font-mono-num text-destructive">{after.marginalRate.toFixed(0)}p</span> in tax/NI.
          </div>
          {s.salary + s.rise > 100000 && s.salary + s.rise < 125140 && (
            <div className="mt-3 text-sm border-l-2 border-destructive pl-3 text-muted-foreground">
              ⚠️ You're in the £100k–£125,140 personal-allowance taper — your marginal rate is effectively 60% in this band.
            </div>
          )}
        </div>

        <button
          onClick={() => downloadToolPdf({
            title: "Pay Rise Simulator",
            subtitle: `Tax year 2026/27 | Current: GBP ${s.salary.toLocaleString()} | Rise: GBP ${s.rise.toLocaleString()} | ${s.region}`,
            rows: [
              { label: "Current salary", value: s.salary },
              { label: "Pay rise", value: s.rise },
              { label: "New salary", value: s.salary + s.rise },
              { label: "---", value: "" },
              { label: "Before - Net", value: before.net },
              { label: "After - Net", value: after.net },
              { label: "---", value: "" },
              { label: "Extra take-home", value: netGain, bold: true },
              { label: "Kept %", value: `${keptPct.toFixed(0)}%`, bold: true },
              { label: "Lost to tax + NI", value: lostToTax, negative: true },
              { label: "Marginal rate", value: `${after.marginalRate.toFixed(0)}%` },
            ],
            filename: `uknetpay-payrise-${s.salary}-plus-${s.rise}.pdf`,
          })}
          className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
        >
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>What a Pay Rise Is Actually Worth After Tax (2026/27)</h2>
          <p>The amount you keep from a pay rise depends entirely on which tax band it falls in. In the basic rate band (up to £50,270), you keep 72p of every extra pound earned. In the higher rate band (£50,271–£100,000), you keep 58p. In the Personal Allowance taper zone (£100,001–£125,140), you keep just 38p — an effective 62% marginal rate.</p>
          <h2>What You Keep Per £1 Rise — By Band</h2>
          <table>
            <thead><tr><th>Your current salary</th><th>Rise falls in</th><th>You keep per £1</th><th>Monthly gain on £5,000 rise</th></tr></thead>
            <tbody>
              <tr><td>£25,000</td><td>Basic rate (28%)</td><td>72p</td><td>+£300/month</td></tr>
              <tr><td>£45,000</td><td>Basic rate (28%)</td><td>72p</td><td>+£300/month</td></tr>
              <tr><td>£52,000</td><td>Higher rate (42%)</td><td>58p</td><td>+£242/month</td></tr>
              <tr><td>£95,000</td><td>Higher rate (42%)</td><td>58p</td><td>+£242/month</td></tr>
              <tr><td>£105,000</td><td>Taper zone (62%)</td><td>38p</td><td>+£158/month</td></tr>
            </tbody>
          </table>
          <h2>Crossing the £50,270 Threshold</h2>
          <p>If a pay rise takes you from £47,000 to £55,000, the first £3,270 of the rise is in the basic rate band (you keep 72p/£1) and the remaining £4,730 is in the higher rate band (you keep 58p/£1). Your blended effective gain is approximately £5,600 net — not the £8,000 your employer is paying extra. Use the calculator above to model any scenario exactly.</p>
          <p><strong>Better than a cash rise in some cases:</strong> If you're in or near the higher rate band, an employer pension contribution or salary sacrifice arrangement can be more valuable than the same gross pay rise. A £5,000 employer pension contribution costs your employer the same as a £5,000 pay rise, but you receive the full £5,000 into your pension tax-free, versus keeping only £2,900–£3,600 of a cash rise after tax and NI.</p>
        </div>
      </section>
    </Shell>
  );
};

const Compare = ({ title, gross, net, tax, highlight }: { title: string; gross: number; net: number; tax: number; highlight?: boolean }) => (
  <div className={`border rounded-lg p-5 bg-card ${highlight ? "border-accent" : "border-border"}`}>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
    <div className="font-mono-num text-2xl font-semibold mt-2">{fmt(net)}</div>
    <div className="text-xs text-muted-foreground mt-1">net / year on {fmt(gross)} gross</div>
    <div className="text-xs font-mono-num text-muted-foreground mt-2">Tax+NI: {fmt2(tax)}</div>
  </div>
);

export default PayRise;