import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/layout/Shell";
import { useUrlState } from "@/hooks/useUrlState";
import {
  calculate,
  DEFAULT_TAX_YEAR,
  type CalcInput,
  type Region,
  type StudentLoanPlan,
  type PensionMode,
  type TaxYear,
} from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { downloadPayslipPdf } from "@/lib/pdf";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { LazyMarginalCurve as MarginalCurve } from "@/components/charts/LazyMarginalCurve";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { YearToggle } from "@/components/tools/YearToggle";
import { YoYDelta } from "@/components/tools/YoYDelta";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { SacrificeItems, annualiseSacrifice, type SacrificeItem } from "@/components/tools/SacrificeItems";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

const SL_LABELS: Record<StudentLoanPlan, string> = {
  none: "None",
  plan1: "Plan 1 (pre-2012)",
  plan2: "Plan 2 (2012-Aug 2023)",
  plan4: "Plan 4 (Scotland)",
  plan5: "Plan 5 (post-Aug 2023)",
  postgrad: "Postgraduate Loan",
};

const TakeHome = () => {
  const [s, set] = useUrlState({
    salary: "" as number | "",
    region: "england" as Region,
    pensionPct: 5,
    pensionMode: "salary-sacrifice" as PensionMode,
    studentLoan: "none" as StudentLoanPlan,
    bonus: 0,
    overtime: 0,
    taxCode: "1257L",
    year: DEFAULT_TAX_YEAR as TaxYear,
    compare: false as boolean,
  });
  const [sacrifices, setSacrifices] = useState<SacrificeItem[]>([]);
  const extraSacrifice = useMemo(() => annualiseSacrifice(sacrifices), [sacrifices]);

  const salaryNum = typeof s.salary === "number" ? s.salary : Number(s.salary) || 0;
  const input: CalcInput = {
    gross: salaryNum,
    region: s.region,
    pensionPct: s.pensionPct,
    pensionMode: s.pensionMode,
    studentLoan: s.studentLoan,
    bonus: s.bonus,
    overtime: s.overtime,
    taxCode: s.taxCode,
    taxYear: s.year,
    extraSacrifice,
  };

  const r = useMemo(
    () => calculate(input),
    [salaryNum, s.region, s.pensionPct, s.pensionMode, s.studentLoan, s.bonus, s.overtime, s.taxCode, s.year, extraSacrifice],
  );

  const otherYear: TaxYear = s.year === "2026/27" ? "2025/26" : "2026/27";
  const rOther = useMemo(
    () => calculate({ ...input, taxYear: otherYear }),
    [salaryNum, s.region, s.pensionPct, s.pensionMode, s.studentLoan, s.bonus, s.overtime, s.taxCode, otherYear, extraSacrifice],
  );

  const shareSummary = `UK Take-Home (${s.year}) on ${fmt(salaryNum)} gross${s.region === "scotland" ? " · Scotland" : ""}: ${fmt(r.net)}/yr · ${fmt(r.net / 12)}/mo · effective ${r.effectiveRate.toFixed(1)}%`;

  const Row = ({ label, value, sub, negative }: { label: string; value: number; sub?: string; negative?: boolean }) => (
    <div className="flex items-baseline justify-between border-b border-border py-3 last:border-0">
      <div>
        <div className="text-sm text-foreground">{label}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
      <div className={`font-mono-num text-base ${negative ? "text-destructive" : "text-foreground"}`}>
        {negative ? "−" : ""}
        {fmt2(Math.abs(value))}
      </div>
    </div>
  );

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <ToolSeo path="/take-home" />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Take-Home Pay Calculator</h1>
        <p className="mt-2 text-muted-foreground">{s.year} - Income Tax, NI, Student Loan, pension, bonus and overtime.</p>
        <div className="mt-5">
          <YearToggle
            year={s.year}
            compare={s.compare}
            onYearChange={(year) => set({ year })}
            onCompareChange={(compare) => set({ compare })}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <aside className="lg:col-span-2 border border-border rounded-lg p-6 bg-card h-fit">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Inputs</div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="salary" className="text-sm">Annual gross salary</Label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                  <Input
                    id="salary"
                    type="number"
                    inputMode="numeric"
                    placeholder="e.g. 45000"
                    value={s.salary === "" ? "" : s.salary}
                    onChange={(event) => {
                      const value = event.target.value;
                      set({ salary: value === "" ? "" : Number(value) });
                    }}
                    className="pl-7 font-mono-num text-lg h-11"
                  />
                </div>
                <Slider className="mt-4" min={0} max={200000} step={500} value={[salaryNum]} onValueChange={(value) => set({ salary: value[0] })} />
              </div>

              <div>
                <Label className="text-sm">Region</Label>
                <Tabs value={s.region} onValueChange={(value) => set({ region: value as Region })} className="mt-2">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="england">England / Wales / NI</TabsTrigger>
                    <TabsTrigger value="scotland">Scotland</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="bonus" className="text-sm">Annual bonus</Label>
                  <div className="mt-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                    <Input id="bonus" type="number" value={s.bonus === 0 ? "" : s.bonus} onChange={(event) => set({ bonus: Number(event.target.value) || 0 })} className="pl-7 font-mono-num" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="overtime" className="text-sm">Overtime / year</Label>
                  <div className="mt-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                    <Input id="overtime" type="number" value={s.overtime === 0 ? "" : s.overtime} onChange={(event) => set({ overtime: Number(event.target.value) || 0 })} className="pl-7 font-mono-num" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Pension contribution</Label>
                  <span className="font-mono-num text-sm">{s.pensionPct.toFixed(1)}%</span>
                </div>
                <Slider className="mt-3" min={0} max={40} step={0.5} value={[s.pensionPct]} onValueChange={(value) => set({ pensionPct: value[0] })} />
                <Tabs value={s.pensionMode} onValueChange={(value) => set({ pensionMode: value as PensionMode })} className="mt-3">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="salary-sacrifice">Salary sacrifice</TabsTrigger>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <Label className="text-sm">Student loan plan</Label>
                <Select value={s.studentLoan} onValueChange={(value) => set({ studentLoan: value as StudentLoanPlan })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(SL_LABELS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taxCode" className="text-sm">Tax code</Label>
                <Input id="taxCode" value={s.taxCode} onChange={(event) => set({ taxCode: event.target.value.toUpperCase() })} className="mt-2 font-mono-num" placeholder="1257L" />
              </div>

              <SacrificeItems items={sacrifices} onChange={setSacrifices} />

              <div className="pt-2 space-y-2">
                <ShareSummary summary={shareSummary} title={`UK Take-Home ${s.year} - ${fmt(salaryNum)} gross`} />
              <ResultDisclaimer />
                <button onClick={() => downloadPayslipPdf(r, { region: s.region, pensionPct: s.pensionPct, studentLoan: SL_LABELS[s.studentLoan] })} className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition">
                  <Download className="h-3.5 w-3.5" /> Download PDF payslip
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            {s.compare && (
              <YoYDelta current={r} previous={rOther} previousLabel={otherYear} />
            )}

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Stat label="Take-home / year" value={fmt(r.net)} emphasis />
                <Stat label="Per month" value={fmt(r.net / 12)} />
                <Stat label="Per week" value={fmt(r.net / 52)} />
                <Stat label="Effective rate" value={`${r.effectiveRate.toFixed(1)}%`} />
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Marginal rate on next £1: <span className="font-mono-num text-foreground">{r.marginalRate.toFixed(0)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-5 bg-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Income tax by band</div>
                <BandBreakdown result={r} />
              </div>
              <div className="border border-border rounded-lg p-5 bg-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Take-home curve</div>
                <MarginalCurve input={input} />
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual breakdown</div>
                <div className="text-xs text-muted-foreground tabular">{s.year}</div>
              </div>
              <Row label="Gross salary" value={salaryNum} />
              {s.bonus > 0 && <Row label="Bonus" value={s.bonus} />}
              {s.overtime > 0 && <Row label="Overtime" value={s.overtime} />}
              <Row label={`Pension (${s.pensionMode === "salary-sacrifice" ? "sacrifice" : "personal"})`} value={r.pension} sub={`${s.pensionPct.toFixed(1)}% of total gross`} negative />
              {extraSacrifice > 0 && (
                <Row
                  label="Other salary sacrifice"
                  value={extraSacrifice}
                  sub={`${sacrifices.length} item${sacrifices.length > 1 ? "s" : ""} - pre-tax & pre-NI`}
                  negative
                />
              )}
              <Row label="Taxable gross" value={r.taxableGross} />
              <Row label="Personal allowance" value={r.personalAllowance} sub={r.taxableGross > 100000 ? "Tapered above £100,000" : `Tax code ${s.taxCode}`} />
              <Row label="Taxable income" value={r.taxableIncome} />
              <Row label="Income Tax" value={r.incomeTax} sub={s.region === "scotland" ? "Scottish bands" : "rUK bands"} negative />
              <Row label="National Insurance" value={r.ni} sub="Class 1 - 8% / 2%" negative />
              {r.studentLoan > 0 && <Row label={`Student Loan (${SL_LABELS[s.studentLoan]})`} value={r.studentLoan} negative />}
              <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-border">
                <div className="text-sm font-medium">Net take-home</div>
                <div className="font-mono-num text-lg font-semibold">{fmt2(r.net)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How UK Take-Home Pay Is Calculated (2026/27)</h2>
          <p>Your take-home pay — or net pay — is what remains after your employer deducts Income Tax, National Insurance, pension contributions, and any Student Loan repayments from your gross salary. For most employees in England, Wales and Northern Ireland on the standard 1257L tax code, the calculation follows four steps.</p>
          <p><strong>Step 1 — Personal Allowance:</strong> The first £12,570 of earnings is tax-free. This is your Personal Allowance for 2026/27. It is gradually withdrawn for incomes over £100,000, disappearing entirely at £125,140.</p>
          <p><strong>Step 2 — Income Tax:</strong> The taxable portion of your salary (gross minus Personal Allowance) is taxed at 20% up to £37,700 above the allowance (the basic rate band ending at £50,270 total), then 40% on earnings from £50,271 to £125,140, then 45% above that.</p>
          <p><strong>Step 3 — National Insurance:</strong> Class 1 employee NI is charged at 8% on earnings between £12,570 and £50,270, and 2% on everything above £50,270.</p>
          <p><strong>Step 4 — Student Loan and pension:</strong> If applicable, student loan repayments are deducted at 9% above your plan's threshold. Pension contributions reduce your gross pay before income tax is calculated, delivering tax relief on every pound contributed.</p>
          <h2>2026/27 Income Tax and NI Quick Reference</h2>
          <table>
            <thead><tr><th>Component</th><th>Rate</th><th>Income band</th></tr></thead>
            <tbody>
              <tr><td>Personal Allowance</td><td>0%</td><td>£0–£12,570</td></tr>
              <tr><td>Basic rate Income Tax</td><td>20%</td><td>£12,571–£50,270</td></tr>
              <tr><td>Higher rate Income Tax</td><td>40%</td><td>£50,271–£125,140</td></tr>
              <tr><td>Additional rate Income Tax</td><td>45%</td><td>Over £125,140</td></tr>
              <tr><td>Employee NI (primary)</td><td>8%</td><td>£12,571–£50,270</td></tr>
              <tr><td>Employee NI (upper)</td><td>2%</td><td>Over £50,270</td></tr>
            </tbody>
          </table>
          <h2>Take-Home Pay at Common Salary Levels (2026/27, England)</h2>
          <table>
            <thead><tr><th>Gross salary</th><th>Monthly take-home</th><th>Effective rate</th><th>Marginal rate</th></tr></thead>
            <tbody>
              <tr><td>£20,000</td><td>~£1,568/month</td><td>6.0%</td><td>28%</td></tr>
              <tr><td>£30,000</td><td>~£2,106/month</td><td>15.8%</td><td>28%</td></tr>
              <tr><td>£40,000</td><td>~£2,636/month</td><td>20.9%</td><td>28%</td></tr>
              <tr><td>£50,000</td><td>~£3,129/month</td><td>24.9%</td><td>28%</td></tr>
              <tr><td>£60,000</td><td>~£3,583/month</td><td>28.3%</td><td>42%</td></tr>
              <tr><td>£75,000</td><td>~£4,200/month</td><td>32.8%</td><td>42%</td></tr>
              <tr><td>£100,000</td><td>~£5,246/month</td><td>37.1%</td><td>42%</td></tr>
            </tbody>
          </table>
          <p><small>No student loan, no pension, standard 1257L tax code. Scottish taxpayers pay different rates — select Scotland in the calculator above.</small></p>
          <h2>Scotland: Different Tax Rates</h2>
          <p>Scottish taxpayers pay income tax at six rates rather than three. The Scottish Intermediate Rate of 21% applies on earnings of £25,297–£43,662, and the Higher Rate is 42% (vs 40% in England). On a £50,000 salary, a Scottish worker takes home approximately £1,300 less per year than an English colleague. Select "Scotland" in the region setting above to calculate your exact Scottish take-home.</p>
          <h2>Frequently Asked Questions</h2>
          <p><strong>Does pension salary sacrifice affect my take-home?</strong> Yes — a salary sacrifice pension contribution reduces your gross pay before both Income Tax and National Insurance are calculated. A basic rate taxpayer saves 28p of every £1 contributed (20% IT + 8% NI). A higher rate taxpayer saves 42p per £1.</p>
          <p><strong>What is the 1257L tax code?</strong> 1257L is the standard tax code for 2026/27, indicating a Personal Allowance of £12,570. An emergency code (W1, M1, or X) taxes you at a flat rate with no allowance. If you see an emergency code on your payslip, contact HMRC to have it corrected.</p>
          <p><strong>Why is my take-home lower than the calculator shows?</strong> The calculator models standard deductions. You may have a different tax code (e.g. if you have underpaid tax from a previous year), a different NI category (e.g. category C for over-state-pension-age workers), or your employer may deduct other items such as employer benefits or season ticket loans.</p>
        </div>
      </section>
    </Shell>
  );
};

const Stat = ({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`font-mono-num mt-1 ${emphasis ? "text-2xl md:text-3xl font-semibold" : "text-xl"}`}>{value}</div>
  </div>
);

export default TakeHome;
