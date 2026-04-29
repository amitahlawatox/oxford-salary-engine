import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/layout/Shell";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, DEFAULT_TAX_YEAR, type CalcInput, type Region, type StudentLoanPlan, type PensionMode, type TaxYear } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { downloadPayslipPdf } from "@/lib/pdf";
import { BandBreakdown } from "@/components/charts/BandBreakdown";
import { MarginalCurve } from "@/components/charts/MarginalCurve";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { YearToggle } from "@/components/tools/YearToggle";
import { YoYDelta } from "@/components/tools/YoYDelta";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { SacrificeItems, annualiseSacrifice, type SacrificeItem } from "@/components/tools/SacrificeItems";

const SL_LABELS: Record<StudentLoanPlan, string> = {
  none: "None",
  plan1: "Plan 1 (pre-2012)",
  plan2: "Plan 2 (2012–Aug 2023)",
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

  const r = useMemo(() => calculate(input), [salaryNum, s.region, s.pensionPct, s.pensionMode, s.studentLoan, s.bonus, s.overtime, s.taxCode, s.year, extraSacrifice]);

  const otherYear: TaxYear = s.year === "2026/27" ? "2025/26" : "2026/27";
  const rOther = useMemo(() => calculate({ ...input, taxYear: otherYear }), [salaryNum, s.region, s.pensionPct, s.pensionMode, s.studentLoan, s.bonus, s.overtime, s.taxCode, otherYear, extraSacrifice]);

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
        <p className="mt-2 text-muted-foreground">{s.year} — Income Tax, NI, Student Loan, pension, bonus, overtime.</p>
        <div className="mt-5">
          <YearToggle
            year={s.year}
            compare={s.compare}
            onYearChange={(y) => set({ year: y })}
            onCompareChange={(v) => set({ compare: v })}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <aside className="lg:col-span-2 border border-border rounded-lg p-6 bg-card h-fit">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Inputs</div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="salary" className="text-sm">Annual gross salary</Label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                  <Input id="salary" type="number" inputMode="numeric" placeholder="e.g. 45000" value={s.salary === "" ? "" : s.salary} onChange={(e) => { const v = e.target.value; set({ salary: v === "" ? "" : Number(v) }); }} className="pl-7 font-mono-num text-lg h-11" />
                </div>
                <Slider className="mt-4" min={0} max={200000} step={500} value={[salaryNum]} onValueChange={(v) => set({ salary: v[0] })} />
              </div>

              <div>
                <Label className="text-sm">Region</Label>
                <Tabs value={s.region} onValueChange={(v) => set({ region: v as Region })} className="mt-2">
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
                    <Input id="bonus" type="number" value={s.bonus === 0 ? "" : s.bonus} onChange={(e) => set({ bonus: Number(e.target.value) || 0 })} className="pl-7 font-mono-num" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="overtime" className="text-sm">Overtime / yr</Label>
                  <div className="mt-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                    <Input id="overtime" type="number" value={s.overtime === 0 ? "" : s.overtime} onChange={(e) => set({ overtime: Number(e.target.value) || 0 })} className="pl-7 font-mono-num" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Pension contribution</Label>
                  <span className="font-mono-num text-sm">{s.pensionPct.toFixed(1)}%</span>
                </div>
                <Slider className="mt-3" min={0} max={40} step={0.5} value={[s.pensionPct]} onValueChange={(v) => set({ pensionPct: v[0] })} />
                <Tabs value={s.pensionMode} onValueChange={(v) => set({ pensionMode: v as PensionMode })} className="mt-3">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="salary-sacrifice">Salary sacrifice</TabsTrigger>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <Label className="text-sm">Student loan plan</Label>
                <Select value={s.studentLoan} onValueChange={(v) => set({ studentLoan: v as StudentLoanPlan })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(SL_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taxCode" className="text-sm">Tax code</Label>
                <Input id="taxCode" value={s.taxCode} onChange={(e) => set({ taxCode: e.target.value.toUpperCase() })} className="mt-2 font-mono-num" placeholder="1257L" />
              </div>

              <SacrificeItems items={sacrifices} onChange={setSacrifices} />

              <div className="pt-2 space-y-2">
                <ShareSummary summary={shareSummary} title={`UK Take-Home ${s.year} — ${fmt(salaryNum)} gross`} />
                <button onClick={() => downloadPayslipPdf(r, { region: s.region, pensionPct: s.pensionPct, studentLoan: SL_LABELS[s.studentLoan] })} className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition">
                  <Download className="h-3.5 w-3.5" /> Download PDF payslip
                </button>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {s.compare && (
              <YoYDelta current={r} previous={rOther} previousLabel={otherYear} />
            )}
            {/* Headline */}
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

            {/* Charts */}
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

            {/* Breakdown */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual breakdown</div>
                <div className="text-xs text-muted-foreground tabular">2026/27</div>
              </div>
              <Row label="Gross salary" value={salaryNum} />
              {s.bonus > 0 && <Row label="Bonus" value={s.bonus} />}
              {s.overtime > 0 && <Row label="Overtime" value={s.overtime} />}
              <Row label={`Pension (${s.pensionMode === "salary-sacrifice" ? "sacrifice" : "personal"})`} value={r.pension} sub={`${s.pensionPct.toFixed(1)}% of total gross`} negative />
              <Row label="Taxable gross" value={r.taxableGross} />
              <Row label="Personal allowance" value={r.personalAllowance} sub={r.taxableGross > 100000 ? "Tapered above £100,000" : `Tax code ${s.taxCode}`} />
              <Row label="Taxable income" value={r.taxableIncome} />
              <Row label="Income Tax" value={r.incomeTax} sub={s.region === "scotland" ? "Scottish bands" : "rUK bands"} negative />
              <Row label="National Insurance" value={r.ni} sub="Class 1 — 8% / 2%" negative />
              {r.studentLoan > 0 && <Row label={`Student Loan (${SL_LABELS[s.studentLoan]})`} value={r.studentLoan} negative />}
              <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-border">
                <div className="text-sm font-medium">Net take-home</div>
                <div className="font-mono-num text-lg font-semibold">{fmt2(r.net)}</div>
              </div>
            </div>
          </div>
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