import { useMemo, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { TOOL_META } from "@/lib/seoMeta";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { calculate, type Region, type StudentLoanPlan } from "@/lib/tax/engine";
import { MiniCalculator } from "@/components/tools/MiniCalculator";

type Region4 = "rest" | "fringe" | "outer" | "inner";

// STPCD 2026/27 pay scale points for England
const SCALES: Record<string, { label: string; points: Record<Region4, number> }[]> = {
  main: [
    { label: "M1 — NQT", points: { rest: 31650, fringe: 33075, outer: 38765, inner: 42637 } },
    { label: "M2", points: { rest: 33483, fringe: 34502, outer: 40568, inner: 44305 } },
    { label: "M3", points: { rest: 35674, fringe: 36360, outer: 42842, inner: 46235 } },
    { label: "M4", points: { rest: 37935, fringe: 38513, outer: 45201, inner: 48235 } },
    { label: "M5", points: { rest: 40625, fringe: 41065, outer: 48062, inner: 50471 } },
    { label: "M6", points: { rest: 43685, fringe: 44103, outer: 51179, inner: 53482 } },
  ],
  upper: [
    { label: "U1", points: { rest: 46525, fringe: 47153, outer: 54455, inner: 57959 } },
    { label: "U2", points: { rest: 48389, fringe: 48981, outer: 56561, inner: 59965 } },
    { label: "U3", points: { rest: 50500, fringe: 51004, outer: 58833, inner: 62138 } },
  ],
  leadership: [
    { label: "L1 — Assistant Head (min)", points: { rest: 52156, fringe: 52156, outer: 57072, inner: 62562 } },
    { label: "L5", points: { rest: 57593, fringe: 57593, outer: 62830, inner: 68562 } },
    { label: "L10", points: { rest: 63508, fringe: 63508, outer: 69003, inner: 75090 } },
    { label: "L15", points: { rest: 70366, fringe: 70366, outer: 76192, inner: 83167 } },
    { label: "L20 — Head (medium)", points: { rest: 78235, fringe: 78235, outer: 84539, inner: 92101 } },
    { label: "L25", points: { rest: 87000, fringe: 87000, outer: 93769, inner: 101892 } },
    { label: "L43 — Head (max)", points: { rest: 135000, fringe: 135000, outer: 145000, inner: 150000 } },
  ],
};

// TPS contribution tiers 2026/27
function tpsRate(gross: number): number {
  if (gross <= 32135) return 0.083;
  if (gross <= 43259) return 0.097;
  if (gross <= 51292) return 0.102;
  if (gross <= 67431) return 0.113;
  if (gross <= 100000) return 0.117;
  return 0.117;
}

const REGION_LABELS: Record<Region4, string> = {
  rest: "Rest of England / Wales",
  fringe: "London Fringe",
  outer: "Outer London",
  inner: "Inner London",
};

const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

export const TeacherPay = () => {
  const meta = TOOL_META["/teacher"];
  const [range, setRange] = useState<"main" | "upper" | "leadership">("main");
  const [pointIdx, setPointIdx] = useState(0);
  const [region4, setRegion4] = useState<Region4>("rest");
  const [loan, setLoan] = useState<StudentLoanPlan>("none");
  const [includePension, setIncludePension] = useState(true);
  const [fte, setFte] = useState(100); // 100% = full time
  const [tlr, setTlr] = useState(0);   // TLR payment

  const scalePoints = SCALES[range];
  const point = scalePoints[Math.min(pointIdx, scalePoints.length - 1)];
  const baseGross = point.points[region4];
  const grossWithTlr = Math.round(baseGross * (fte / 100) + tlr);
  const pensionRate = tpsRate(grossWithTlr);

  const region: Region = region4 === "rest" || region4 === "fringe" ? "england" : "england";

  const result = useMemo(() => calculate({
    gross: grossWithTlr,
    region,
    pensionPct: includePension ? pensionRate * 100 : 0,
    pensionMode: "personal",
    studentLoan: loan,
    bonus: 0,
    overtime: 0,
  }), [grossWithTlr, region, loan, includePension, pensionRate]);

  const pensionMonthly = grossWithTlr * pensionRate / 12;

  return (
    <Shell>
      <ToolSeo path="/teacher" />

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{meta.h1}</h1>
        <p className="text-muted-foreground text-sm">
          STPCD 2026/27 · Main Pay Range M1–M6 · Upper Pay Range U1–U3 · Leadership · TPS pension auto-applied
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10 grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-5">

          <div className="space-y-2">
            <Label>Pay range</Label>
            <Tabs value={range} onValueChange={(v) => { setRange(v as typeof range); setPointIdx(0); }}>
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="main">Main (M1–M6)</TabsTrigger>
                <TabsTrigger className="flex-1" value="upper">Upper (U1–U3)</TabsTrigger>
                <TabsTrigger className="flex-1" value="leadership">Leadership</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>Pay scale point — {point.label} ({fmt(point.points[region4])} base)</Label>
            <Select value={String(pointIdx)} onValueChange={(v) => setPointIdx(Number(v))}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {scalePoints.map((p, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {p.label} — {fmt(p.points[region4])}/year
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Select value={region4} onValueChange={(v) => setRegion4(v as Region4)}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.entries(REGION_LABELS) as [Region4, string][]).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>FTE — {fte}% {fte < 100 ? `(${fmt(Math.round(baseGross * fte / 100))} pro-rata)` : "(full time)"}</Label>
            <Slider min={20} max={100} step={5} value={[fte]} onValueChange={([v]) => setFte(v)} className="py-2" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>20%</span><span>100%</span></div>
          </div>

          <div className="space-y-2">
            <Label>TLR / SEN allowance — {fmt(tlr)}/year</Label>
            <Slider min={0} max={15000} step={500} value={[tlr]} onValueChange={([v]) => setTlr(v)} className="py-2" />
          </div>

          <div className="space-y-2">
            <Label>Student Loan</Label>
            <Select value={loan} onValueChange={(v) => setLoan(v as StudentLoanPlan)}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="plan1">Plan 1</SelectItem>
                <SelectItem value="plan2">Plan 2</SelectItem>
                <SelectItem value="plan5">Plan 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="tps" checked={includePension}
              onChange={(e) => setIncludePension(e.target.checked)} className="h-4 w-4 rounded" />
            <Label htmlFor="tps">Include TPS pension ({(pensionRate * 100).toFixed(1)}%)</Label>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-3">
          <div className="text-center pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Monthly take-home</p>
            <p className="text-5xl font-bold tracking-tight text-aurora">{fmt(Math.round(result.net / 12))}</p>
            <p className="text-sm text-muted-foreground mt-1">{fmt(result.net)}/year</p>
          </div>

          {[
            { label: "Gross salary" + (tlr > 0 ? " (inc. TLR)" : ""), value: fmt(grossWithTlr), bold: true },
            { label: "Income Tax", value: `−${fmt(result.incomeTax)}` },
            { label: "National Insurance", value: `−${fmt(result.ni)}` },
            includePension && { label: `TPS pension (${(pensionRate * 100).toFixed(1)}%)`, value: `−${fmt(grossWithTlr * pensionRate)}` },
            result.studentLoan > 0 && { label: "Student Loan", value: `−${fmt(result.studentLoan)}` },
            { label: "Effective tax rate", value: `${result.effectiveRate.toFixed(1)}%` },
            { label: "Monthly pension saving", value: fmt(pensionMonthly) },
          ].filter(Boolean).map((row: { label: string; value: string; bold?: boolean }, i) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
              <span className={row.bold ? "font-semibold" : "text-muted-foreground"}>{row.label}</span>
              <span className="font-mono-num font-semibold">{row.value}</span>
            </div>
          ))}

          <div className="pt-2 bg-secondary/30 rounded-xl p-3 text-xs text-muted-foreground">
            {REGION_LABELS[region4]} · {fte}% FTE
            {includePension && ` · TPS 2015 CARE Scheme`}
          </div>
          <ResultDisclaimer />
        </div>
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Teacher Pay Scale 2026/27 — Full Take-Home by Region</h2>
          <p>Teacher pay in England is set by the School Teachers' Pay and Conditions Document (STPCD). The 2026/27 award delivered a further uplift following the landmark 2023 settlement. Here's every scale point with gross salary and monthly take-home after Income Tax, NI, and Teachers' Pension Scheme (TPS) contributions.</p>

          <h2>Main Pay Range — Monthly Take-Home at Every Point (Rest of England)</h2>
          <table>
            <thead><tr><th>Scale</th><th>Gross</th><th>Take-home (before pension)</th><th>Take-home (after 8.3% TPS)</th></tr></thead>
            <tbody>
              <tr><td>M1 (NQT)</td><td>£31,650</td><td>£2,212/month</td><td>~£1,993/month</td></tr>
              <tr><td>M2</td><td>£33,483</td><td>£2,330/month</td><td>~£2,093/month</td></tr>
              <tr><td>M3</td><td>£35,674</td><td>£2,473/month</td><td>~£2,211/month</td></tr>
              <tr><td>M4</td><td>£37,935</td><td>£2,630/month</td><td>~£2,329/month</td></tr>
              <tr><td>M5</td><td>£40,625</td><td>£2,804/month</td><td>~£2,466/month</td></tr>
              <tr><td>M6</td><td>£43,685</td><td>£2,987/month</td><td>~£2,613/month</td></tr>
            </tbody>
          </table>
          <p><small>After-pension figures use 8.3% TPS rate applicable to M1–M4 salaries and 9.7% for M5–M6. England, 2026/27 tax rates, no student loan.</small></p>

          <h2>Inner London Scale — Take-Home at Each Point</h2>
          <table>
            <thead><tr><th>Scale</th><th>Inner London gross</th><th>Take-home (before pension)</th></tr></thead>
            <tbody>
              <tr><td>M1</td><td>£42,637</td><td>~£2,864/month</td></tr>
              <tr><td>M3</td><td>£46,235</td><td>~£3,040/month</td></tr>
              <tr><td>M6</td><td>£53,482</td><td>~£3,354/month</td></tr>
              <tr><td>U3</td><td>£62,138</td><td>~£3,764/month</td></tr>
            </tbody>
          </table>

          <h2>Part-Time Teacher Pay (Pro-Rata)</h2>
          <p>Part-time teachers are paid on a pro-rata basis. A 0.6 FTE teacher on M1 earns £31,650 × 0.6 = £18,990 gross, taking home approximately £1,435/month before pension. Use the FTE slider above to model any contract fraction. TPS pension and student loan deductions both apply to the pro-rata salary, not the full-time equivalent.</p>

          <h2>TLR Payments — Extra Pay for Additional Responsibility</h2>
          <p>TLR (Teaching and Learning Responsibility) payments are awarded for significant additional responsibility beyond your substantive role — typically leading a department, year group, or whole-school initiative. TLR amounts are set by schools within nationally defined ranges: TLR1 (£8,706–£14,732), TLR2 (£3,017–£7,368), TLR3 (£531–£1,613). TLR payments are pensionable and taxed as employment income. Use the TLR slider above to see the net impact on your take-home.</p>

          <h2>Teachers' Pension Scheme (TPS)</h2>
          <p>TPS contributions are tiered by gross salary. Most Main Pay Range teachers contribute 8.3%–9.7%. These contributions buy a defined-benefit pension based on career average earnings — its actuarial value is substantially higher than an equivalent auto-enrolment contribution. Despite reducing monthly take-home, the TPS is one of the most valuable employment benefits in the UK.</p>
          <MiniCalculator />
        </div>
      </section>
    </Shell>
  );
};

export default TeacherPay;
