import { useMemo, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { TOOL_META } from "@/lib/seoMeta";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculate, type Region, type StudentLoanPlan } from "@/lib/tax/engine";

const fmt = (n: number) => "£" + Math.round(Math.abs(n)).toLocaleString("en-GB");

export const Overtime = () => {
  const meta = TOOL_META["/overtime"];
  const [grossSalary, setGrossSalary] = useState(32000);
  const [hoursPerWeek, setHoursPerWeek] = useState(37.5);
  const [overtimeHours, setOvertimeHours] = useState(5);
  const [overtimeRate, setOvertimeRate] = useState<"1x" | "1.25x" | "1.5x" | "2x">("1.5x");
  const [weeksWorked, setWeeksWorked] = useState(48);
  const [region, setRegion] = useState<Region>("england");
  const [loan, setLoan] = useState<StudentLoanPlan>("none");

  const rateMultiplier = { "1x": 1, "1.25x": 1.25, "1.5x": 1.5, "2x": 2 }[overtimeRate];
  const hourlyBase = grossSalary / (hoursPerWeek * 52);
  const overtimeHourlyRate = hourlyBase * rateMultiplier;
  const annualOvertime = overtimeHourlyRate * overtimeHours * weeksWorked;

  const withoutOvertime = useMemo(() => calculate({
    gross: grossSalary, region, pensionPct: 0, pensionMode: "personal",
    studentLoan: loan, bonus: 0, overtime: 0,
  }), [grossSalary, region, loan]);

  const withOvertime = useMemo(() => calculate({
    gross: grossSalary, region, pensionPct: 0, pensionMode: "personal",
    studentLoan: loan, bonus: 0, overtime: annualOvertime,
  }), [grossSalary, region, loan, annualOvertime]);

  const overtimeNet = withOvertime.net - withoutOvertime.net;
  const taxOnOvertime = annualOvertime - overtimeNet;
  const effectiveRateOnOvertime = annualOvertime > 0 ? (taxOnOvertime / annualOvertime) * 100 : 0;

  return (
    <Shell>
      <ToolSeo path="/overtime" />

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{meta.h1}</h1>
        <p className="text-muted-foreground text-sm">
          See your true overtime take-home pay after income tax and NI in 2026/27
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-5">
          <div className="space-y-2">
            <Label>Annual base salary</Label>
            <Input type="number" min={0} max={500000} value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="rounded-xl font-mono-num" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Normal hours/week</Label>
              <Input type="number" min={1} max={60} step={0.5} value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="rounded-xl font-mono-num" />
            </div>
            <div className="space-y-2">
              <Label>Overtime hours/week</Label>
              <Input type="number" min={1} max={30} step={0.5} value={overtimeHours}
                onChange={(e) => setOvertimeHours(Number(e.target.value))}
                className="rounded-xl font-mono-num" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Overtime rate</Label>
              <Select value={overtimeRate} onValueChange={(v) => setOvertimeRate(v as typeof overtimeRate)}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1x">1× (basic rate)</SelectItem>
                  <SelectItem value="1.25x">1.25× (time and a quarter)</SelectItem>
                  <SelectItem value="1.5x">1.5× (time and a half)</SelectItem>
                  <SelectItem value="2x">2× (double time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Weeks of overtime/year</Label>
              <Input type="number" min={1} max={52} value={weeksWorked}
                onChange={(e) => setWeeksWorked(Number(e.target.value))}
                className="rounded-xl font-mono-num" />
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

          <div className="rounded-xl bg-secondary/30 p-3 text-xs text-muted-foreground space-y-1">
            <p>Base hourly rate: {fmt(hourlyBase * 100) === "£0" ? "—" : "£" + hourlyBase.toFixed(2)}</p>
            <p>Overtime hourly rate ({overtimeRate}): £{overtimeHourlyRate.toFixed(2)}</p>
            <p>Annual overtime gross: {fmt(annualOvertime)}</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-neutral-100/60 dark:border-neutral-800/60 backdrop-blur-md bg-surface/60 p-6 space-y-3">
          <div className="text-center pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Annual overtime take-home</p>
            <p className="text-5xl font-bold tracking-tight text-aurora">{fmt(overtimeNet)}</p>
            <p className="text-sm text-muted-foreground mt-1">from {fmt(annualOvertime)} gross overtime</p>
          </div>

          {[
            { label: "Gross overtime pay", value: fmt(annualOvertime), bold: true },
            { label: "Tax lost on overtime", value: `−${fmt(taxOnOvertime)}` },
            { label: "Effective rate on overtime", value: `${effectiveRateOnOvertime.toFixed(1)}%` },
            { label: "Monthly overtime take-home", value: fmt(overtimeNet / weeksWorked * 52 / 12) },
            { label: "Total annual take-home (inc. overtime)", value: fmt(withOvertime.net), bold: true },
          ].map((row, i) => (
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
          <h2>How Is Overtime Taxed in the UK? (2026/27)</h2>
          <p>Overtime pay is taxed in exactly the same way as your regular salary — HMRC does not have a separate rate for overtime. Your employer adds your overtime to your gross pay for the period and applies PAYE income tax and National Insurance to the combined total. If overtime pushes your earnings into a higher tax band, the excess is taxed at the higher rate (40%).</p>

          <h2>Overtime Pay Examples (2026/27, England)</h2>
          <table>
            <thead><tr><th>Base salary</th><th>Overtime gross</th><th>Rate on overtime</th><th>Overtime take-home</th></tr></thead>
            <tbody>
              <tr><td>£25,000</td><td>£4,000 (1.5×)</td><td>28% (basic rate)</td><td>£2,880</td></tr>
              <tr><td>£35,000</td><td>£5,000 (1.5×)</td><td>28% (basic rate)</td><td>£3,600</td></tr>
              <tr><td>£46,000</td><td>£6,000 (1.5×, crosses threshold)</td><td>33% blended</td><td>£4,020</td></tr>
              <tr><td>£55,000</td><td>£8,000 (1.5×)</td><td>42% (higher rate)</td><td>£4,640</td></tr>
            </tbody>
          </table>

          <h2>Overtime vs Salary Sacrifice</h2>
          <p>If you're in the higher rate band, overtime is taxed at 42% combined (40% IT + 2% NI) per pound. Alternatively, some employees arrange with their employer to route overtime earnings into their pension through salary sacrifice, effectively receiving the full gross value as pension savings rather than 58p in the pound as take-home pay. This is especially valuable for those approaching the £100,000 taper zone.</p>

          <h2>Can My Employer Change My Overtime Rate?</h2>
          <p>Overtime rates are set by your employment contract. The legal minimum is the National Living Wage (£12.21/hour in 2026/27 for those aged 21+) — there is no statutory requirement to pay a premium for overtime hours, but many employment contracts specify time-and-a-quarter (1.25×), time-and-a-half (1.5×), or double time (2×) for hours beyond contracted hours.</p>
        </div>
      </section>
    </Shell>
  );
};

export default Overtime;
