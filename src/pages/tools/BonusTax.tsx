import { useMemo, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { TOOL_META } from "@/lib/seoMeta";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculate, type Region, type StudentLoanPlan } from "@/lib/tax/engine";

const fmt = (n: number) => "£" + Math.round(Math.abs(n)).toLocaleString("en-GB");
const pct = (n: number) => n.toFixed(1) + "%";

export const BonusTax = () => {
  const meta = TOOL_META["/bonus"];
  const [gross, setGross] = useState(45000);
  const [bonus, setBonus] = useState(5000);
  const [region, setRegion] = useState<Region>("england");
  const [loan, setLoan] = useState<StudentLoanPlan>("none");
  const [pension, setPension] = useState(0);

  const withoutBonus = useMemo(() => calculate({
    gross, region, pensionPct: pension, pensionMode: "personal",
    studentLoan: loan, bonus: 0, overtime: 0,
  }), [gross, region, loan, pension]);

  const withBonus = useMemo(() => calculate({
    gross, region, pensionPct: pension, pensionMode: "personal",
    studentLoan: loan, bonus, overtime: 0,
  }), [gross, region, loan, pension, bonus]);

  const bonusNet = withBonus.net - withoutBonus.net;
  const taxOnBonus = bonus - bonusNet;
  const effectiveOnBonus = bonus > 0 ? (taxOnBonus / bonus) * 100 : 0;

  return (
    <Shell>
      <ToolSeo path="/bonus" />

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{meta.h1}</h1>
        <p className="text-muted-foreground text-sm">
          See exactly how much of your bonus reaches your bank account after tax and NI
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10 grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-5">
          <div className="space-y-2">
            <Label>Annual gross salary (before bonus)</Label>
            <Input
              type="number" min={0} max={500000}
              value={gross}
              onChange={(e) => setGross(Number(e.target.value))}
              className="rounded-xl font-mono-num"
            />
          </div>

          <div className="space-y-2">
            <Label>Bonus amount — {fmt(bonus)}</Label>
            <Slider
              min={500} max={100000} step={500}
              value={[bonus]}
              onValueChange={([v]) => setBonus(v)}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>£500</span><span>£100,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Tabs value={region} onValueChange={(v) => setRegion(v as Region)}>
              <TabsList className="w-full">
                <TabsTrigger className="flex-1" value="england">England / Wales / NI</TabsTrigger>
                <TabsTrigger className="flex-1" value="scotland">Scotland</TabsTrigger>
              </TabsList>
            </Tabs>
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

          <div className="space-y-2">
            <Label>Pension contribution — {pension}%</Label>
            <Slider min={0} max={20} step={1} value={[pension]} onValueChange={([v]) => setPension(v)} className="py-2" />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-3">
          <div className="text-center pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">You keep from your {fmt(bonus)} bonus</p>
            <p className="text-5xl font-bold tracking-tight text-aurora">{fmt(bonusNet)}</p>
            <p className="text-sm text-muted-foreground mt-1">{pct(100 - effectiveOnBonus)} of gross bonus</p>
          </div>

          {[
            { label: "Gross bonus", value: fmt(bonus), bold: true },
            { label: "Tax lost on bonus", value: `−${fmt(taxOnBonus)}` },
            { label: "Effective rate on bonus", value: pct(effectiveOnBonus) },
            { label: "—", value: "" },
            { label: "Base salary take-home (annual)", value: fmt(withoutBonus.net) },
            { label: "Base + bonus take-home (annual)", value: fmt(withBonus.net) },
            { label: "Monthly take-home with bonus month", value: fmt(withBonus.net / 12) },
          ].filter(row => row.label !== "—").map((row, i) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
              <span className={row.bold ? "font-semibold" : "text-muted-foreground"}>{row.label}</span>
              <span className="font-mono-num font-semibold">{row.value}</span>
            </div>
          ))}
          <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How Is a Bonus Taxed in the UK? (2026/27)</h2>
          <p>Your bonus is treated as employment income and taxed in the same way as your salary — at your marginal Income Tax rate and 8% or 2% National Insurance depending on your total earnings. If your bonus pushes your total income above a tax band threshold, part of the bonus is taxed at the higher rate.</p>

          <h2>Bonus Tax Examples (2026/27, England)</h2>
          <table>
            <thead><tr><th>Base salary</th><th>Bonus</th><th>Tax on bonus</th><th>You keep</th><th>Effective rate</th></tr></thead>
            <tbody>
              <tr><td>£30,000</td><td>£3,000</td><td>£840</td><td>£2,160</td><td>28%</td></tr>
              <tr><td>£45,000</td><td>£5,000</td><td>£1,400</td><td>£3,600</td><td>28%</td></tr>
              <tr><td>£48,000</td><td>£5,000 (crosses threshold)</td><td>£1,760</td><td>£3,240</td><td>35%</td></tr>
              <tr><td>£60,000</td><td>£10,000</td><td>£4,200</td><td>£5,800</td><td>42%</td></tr>
              <tr><td>£95,000</td><td>£10,000 (crosses £100K)</td><td>£6,200</td><td>£3,800</td><td>62%</td></tr>
            </tbody>
          </table>

          <h2>Can I Reduce Tax on My Bonus?</h2>
          <p>The most effective way to reduce tax on a bonus is to <strong>salary sacrifice it into your pension</strong>. Ask your employer whether they can pay the bonus as an employer pension contribution — this avoids both Income Tax and National Insurance entirely. On a £10,000 bonus in the higher rate band, salary sacrifice saves approximately £4,200 in tax and NI. The full £10,000 goes into your pension rather than £5,800 after tax.</p>
          <p>If salary sacrifice isn't available, you can make a personal pension contribution of the same amount after receiving the bonus and claim higher/additional rate tax relief through Self Assessment.</p>
        </div>
      </section>
    </Shell>
  );
};

export default BonusTax;
