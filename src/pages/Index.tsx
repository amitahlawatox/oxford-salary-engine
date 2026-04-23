import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Region = "england" | "scotland";

const fmt = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const fmt2 = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });

// 2026/27 logic
function personalAllowance(adjustedNetIncome: number) {
  if (adjustedNetIncome <= 100_000) return 12_570;
  return Math.max(0, 12_570 - (adjustedNetIncome - 100_000) / 2);
}

function taxBandsEngland(taxable: number) {
  // basic 20% to 37,700; higher 40% to 125,140 (over PA); additional 45%
  let remaining = taxable;
  const basic = Math.min(remaining, 37_700);
  remaining -= basic;
  const higher = Math.min(remaining, 125_140 - 12_570 - 37_700);
  remaining -= Math.max(0, higher);
  const additional = Math.max(0, remaining);
  return basic * 0.2 + Math.max(0, higher) * 0.4 + additional * 0.45;
}

function taxBandsScotland(taxable: number) {
  const bands = [
    { upTo: 2_306, rate: 0.19 }, // Starter
    { upTo: 13_991, rate: 0.2 }, // Basic
    { upTo: 31_092, rate: 0.21 }, // Intermediate
    { upTo: 62_430, rate: 0.42 }, // Higher
    { upTo: 125_140 - 12_570, rate: 0.45 }, // Advanced
    { upTo: Infinity, rate: 0.48 }, // Top
  ];
  let prev = 0;
  let tax = 0;
  for (const b of bands) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, b.upTo) - prev;
    if (slice > 0) tax += slice * b.rate;
    prev = b.upTo;
  }
  return tax;
}

function employeeNI(gross: number) {
  // 2026/27 assumed: PT £12,570; UEL £50,270; 8% / 2%
  const pt = 12_570;
  const uel = 50_270;
  if (gross <= pt) return 0;
  const main = Math.min(gross, uel) - pt;
  const upper = Math.max(0, gross - uel);
  return main * 0.08 + upper * 0.02;
}

function studentLoanPlan5(gross: number) {
  const threshold = 25_000;
  return Math.max(0, gross - threshold) * 0.09;
}

const Index = () => {
  const [salary, setSalary] = useState<number>(45_000);
  const [region, setRegion] = useState<Region>("england");
  const [pensionPct, setPensionPct] = useState<number>(5);
  const [studentLoan, setStudentLoan] = useState<boolean>(false);

  const calc = useMemo(() => {
    const gross = Math.max(0, salary);
    const pension = (gross * pensionPct) / 100; // salary sacrifice
    const adjusted = gross - pension;
    const pa = personalAllowance(adjusted);
    const taxable = Math.max(0, adjusted - pa);
    const incomeTax = region === "scotland" ? taxBandsScotland(taxable) : taxBandsEngland(taxable);
    const ni = employeeNI(adjusted);
    const sl = studentLoan ? studentLoanPlan5(adjusted) : 0;
    const net = adjusted - incomeTax - ni - sl;
    const effective = gross > 0 ? ((incomeTax + ni + sl) / gross) * 100 : 0;
    return { gross, pension, adjusted, pa, taxable, incomeTax, ni, sl, net, effective };
  }, [salary, pensionPct, region, studentLoan]);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-primary" />
            <span className="font-semibold tracking-tight">UK Net Pay</span>
            <span className="ml-2 text-xs text-muted-foreground tabular">2026/27</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#calculator" className="hover:text-foreground">Calculator</a>
            <a href="#breakdown" className="hover:text-foreground">Breakdown</a>
            <a href="#methodology" className="hover:text-foreground">Methodology</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
          UK take-home pay, calculated to the penny.
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Precise 2026/27 simulation — Income Tax, National Insurance, Student Loan and pension.
          No data stored, no sign-up.
        </p>
      </section>

      {/* Calculator */}
      <section id="calculator" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-2 border border-border rounded-lg p-6 bg-card">
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
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value) || 0)}
                    className="pl-7 font-mono-num text-lg h-11"
                  />
                </div>
                <Slider
                  className="mt-4"
                  min={0}
                  max={200_000}
                  step={500}
                  value={[salary]}
                  onValueChange={(v) => setSalary(v[0])}
                />
              </div>

              <div>
                <Label className="text-sm">Region</Label>
                <Tabs value={region} onValueChange={(v) => setRegion(v as Region)} className="mt-2">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="england">England / Wales / NI</TabsTrigger>
                    <TabsTrigger value="scotland">Scotland</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Pension contribution</Label>
                  <span className="font-mono-num text-sm">{pensionPct.toFixed(1)}%</span>
                </div>
                <Slider
                  className="mt-3"
                  min={0}
                  max={40}
                  step={0.5}
                  value={[pensionPct]}
                  onValueChange={(v) => setPensionPct(v[0])}
                />
                <div className="text-xs text-muted-foreground mt-1">Salary sacrifice — reduces taxable income.</div>
              </div>

              <div>
                <Label className="text-sm">Student loan</Label>
                <Select value={studentLoan ? "plan5" : "none"} onValueChange={(v) => setStudentLoan(v === "plan5")}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="plan5">Plan 5 (post-Aug 2023, £25k threshold)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Headline */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Stat label="Take-home / year" value={fmt(calc.net)} emphasis />
                <Stat label="Per month" value={fmt(calc.net / 12)} />
                <Stat label="Per week" value={fmt(calc.net / 52)} />
                <Stat label="Effective rate" value={`${calc.effective.toFixed(1)}%`} />
              </div>
            </div>

            {/* Breakdown */}
            <div id="breakdown" className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual breakdown</div>
                <div className="text-xs text-muted-foreground tabular">2026/27</div>
              </div>
              <Row label="Gross salary" value={calc.gross} />
              <Row label="Pension (salary sacrifice)" value={calc.pension} sub={`${pensionPct.toFixed(1)}% of gross`} negative />
              <Row label="Adjusted income" value={calc.adjusted} />
              <Row label="Personal allowance" value={calc.pa} sub={salary > 100_000 ? "Tapered above £100,000" : undefined} />
              <Row label="Taxable income" value={calc.taxable} />
              <Row label="Income Tax" value={calc.incomeTax} sub={region === "scotland" ? "Scottish bands" : "rUK bands"} negative />
              <Row label="National Insurance" value={calc.ni} sub="Class 1 — 8% / 2%" negative />
              {studentLoan && <Row label="Student Loan (Plan 5)" value={calc.sl} sub="9% above £25,000" negative />}
              <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-border">
                <div className="text-sm font-medium">Net take-home</div>
                <div className="font-mono-num text-lg font-semibold">{fmt2(calc.net)}</div>
              </div>
            </div>

            {/* Monthly table */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly summary</div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-muted-foreground">
                  <tr>
                    <th className="text-left font-medium px-6 py-2.5">Item</th>
                    <th className="text-right font-medium px-6 py-2.5">Monthly</th>
                    <th className="text-right font-medium px-6 py-2.5">Annual</th>
                  </tr>
                </thead>
                <tbody className="font-mono-num">
                  <TR a="Gross" m={calc.gross / 12} y={calc.gross} />
                  <TR a="Income Tax" m={calc.incomeTax / 12} y={calc.incomeTax} dim />
                  <TR a="NI" m={calc.ni / 12} y={calc.ni} dim />
                  {studentLoan && <TR a="Student Loan" m={calc.sl / 12} y={calc.sl} dim />}
                  <TR a="Pension" m={calc.pension / 12} y={calc.pension} dim />
                  <tr className="border-t border-border">
                    <td className="px-6 py-3 font-sans font-medium">Net</td>
                    <td className="px-6 py-3 text-right font-semibold">{fmt2(calc.net / 12)}</td>
                    <td className="px-6 py-3 text-right font-semibold">{fmt2(calc.net)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted-foreground">
              For information only. Not financial advice. Figures are simulations based on published 2026/27 thresholds.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground flex justify-between">
          <span>© UK Net Pay</span>
          <span>2026/27 tax year</span>
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`font-mono-num mt-1 ${emphasis ? "text-2xl md:text-3xl font-semibold" : "text-xl"}`}>{value}</div>
  </div>
);

const TR = ({ a, m, y, dim }: { a: string; m: number; y: number; dim?: boolean }) => (
  <tr className="border-t border-border">
    <td className={`px-6 py-2.5 font-sans ${dim ? "text-muted-foreground" : ""}`}>{a}</td>
    <td className="px-6 py-2.5 text-right">{fmt2(m)}</td>
    <td className="px-6 py-2.5 text-right">{fmt2(y)}</td>
  </tr>
);

export default Index;
