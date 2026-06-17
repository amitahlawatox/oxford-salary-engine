import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, type CalcResult } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ArrowRight, Download } from "lucide-react";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

const Compare = () => {
  const [s, set] = useUrlState({ a: 45000, b: 55000, pensionA: 5, pensionB: 5 });

  const ra = useMemo(
    () => calculate({ gross: s.a, region: "england", pensionPct: s.pensionA, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }),
    [s.a, s.pensionA]
  );
  const rb = useMemo(
    () => calculate({ gross: s.b, region: "england", pensionPct: s.pensionB, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }),
    [s.b, s.pensionB]
  );

  const diff = rb.net - ra.net;

  const Col = ({ title, salary, pension, onSal, onPen, r }: { title: string; salary: number; pension: number; onSal: (v: number) => void; onPen: (v: number) => void; r: CalcResult }) => (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{title}</div>
      <Label className="text-sm">Gross salary</Label>
      <div className="mt-2 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
        <Input type="number" value={salary === 0 ? "" : salary} onChange={(e) => onSal(Number(e.target.value) || 0)} className="pl-7 font-mono-num text-lg h-11" />
      </div>
      <Label className="text-sm mt-4 block">Pension %</Label>
      <Input type="number" value={pension === 0 ? "" : pension} onChange={(e) => onPen(Number(e.target.value) || 0)} className="mt-2 font-mono-num" />
      <div className="mt-6 space-y-2">
        <Stat label="Net / year" value={fmt(r.net)} big />
        <Stat label="Net / month" value={fmt(r.net / 12)} />
        <Stat label="Income tax" value={fmt2(r.incomeTax)} />
        <Stat label="NI" value={fmt2(r.ni)} />
        <Stat label="Effective rate" value={`${r.effectiveRate.toFixed(1)}%`} />
      </div>
    </div>
  );

  return (
    <Shell>
      
      <ToolSeo path="/compare" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Two-Salary Compare</h1>
        <p className="mt-2 text-muted-foreground">Side-by-side: current job vs new offer.</p>
        <div className="mt-4">
          <ShareSummary summary={`Two-Salary Comparison — see my UK calculation for the 2026/27 tax year`} title="Two-Salary Comparison | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Col title="Job A" salary={s.a} pension={s.pensionA} onSal={(v: number) => set({ a: v })} onPen={(v: number) => set({ pensionA: v })} r={ra} />
          <Col title="Job B" salary={s.b} pension={s.pensionB} onSal={(v: number) => set({ b: v })} onPen={(v: number) => set({ pensionB: v })} r={rb} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-5 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Job A - Tax by band</div>
            <BandBreakdown result={ra} />
          </div>
          <div className="border border-border rounded-lg p-5 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Job B - Tax by band</div>
            <BandBreakdown result={rb} />
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Difference (B − A)</div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className={`mt-3 font-mono-num text-3xl font-semibold ${diff >= 0 ? "text-foreground" : "text-destructive"}`}>
            {diff >= 0 ? "+" : "−"}
            {fmt(Math.abs(diff))}
            <span className="text-sm text-muted-foreground ml-2">/ year</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {diff >= 0 ? "+" : "−"}
            {fmt(Math.abs(diff / 12))} per month · effective rate {(rb.effectiveRate - ra.effectiveRate).toFixed(1)}pp difference
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => downloadToolPdf({
              title: "Two-Salary Comparison",
              subtitle: `Tax year 2026/27 | Job A: GBP ${s.a.toLocaleString()} | Job B: GBP ${s.b.toLocaleString()}`,
              rows: [
                { label: "Job A - Gross", value: s.a },
                { label: "Job A - Net", value: ra.net },
                { label: "Job A - Income Tax", value: ra.incomeTax, negative: true },
                { label: "Job A - NI", value: ra.ni, negative: true },
                { label: "Job A - Effective rate", value: `${ra.effectiveRate.toFixed(1)}%` },
                { label: "---", value: "" },
                { label: "Job B - Gross", value: s.b },
                { label: "Job B - Net", value: rb.net },
                { label: "Job B - Income Tax", value: rb.incomeTax, negative: true },
                { label: "Job B - NI", value: rb.ni, negative: true },
                { label: "Job B - Effective rate", value: `${rb.effectiveRate.toFixed(1)}%` },
                { label: "---", value: "" },
                { label: "Difference (B - A)", value: Math.abs(diff), bold: true },
              ],
              filename: `uknetpay-compare-${s.a}-vs-${s.b}.pdf`,
            })}
            className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
        </div>
      </section>


      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How to Compare Two Salary Offers on a Like-for-Like Basis</h2>
          <p>Two salary offers with different gross figures, locations, pension arrangements, and benefits are almost impossible to compare fairly without calculating the net take-home for each. A £55,000 offer in London and a £45,000 offer in Manchester may produce similar net monthly income once London's higher tax, commuting costs, and pension differences are factored in.</p>
          <h2>What to Compare Beyond Gross Salary</h2>
          <p><strong>Employer pension contribution:</strong> A 10% employer pension match on a £45,000 salary is worth £4,500/year in additional pension wealth — equivalent to a £6,000–£7,000 gross pay rise (because pension contributions are made from pre-tax company profit, they're worth more than the headline cash). Always factor in the employer contribution when comparing total compensation.</p>
          <p><strong>Location and commuting:</strong> A £55,000 London role requiring a £5,000/year season ticket and a £1,800/month flat produces less disposable income than a £45,000 Manchester role with a £1,200/month flat and no commute costs. Model the after-rent, after-commute figure, not just the gross.</p>
          <p><strong>Benefits in kind:</strong> Private medical insurance (typically £500–£1,500/year employee cost if bought independently), life insurance, income protection, and company car all have real monetary value. They're taxable as benefits in kind, but often still add net value.</p>
          <h2>Real Take-Home Comparison: London vs Manchester</h2>
          <table>
            <thead><tr><th>Component</th><th>Job A — London £55,000</th><th>Job B — Manchester £45,000</th></tr></thead>
            <tbody>
              <tr><td>Monthly gross</td><td>£4,583</td><td>£3,750</td></tr>
              <tr><td>Monthly take-home</td><td>~£3,380</td><td>~£2,940</td></tr>
              <tr><td>Rent (1-bed city centre)</td><td>−£1,900</td><td>−£1,200</td></tr>
              <tr><td>Commute</td><td>−£400</td><td>−£80</td></tr>
              <tr><td><strong>Disposable</strong></td><td><strong>~£1,080</strong></td><td><strong>~£1,660</strong></td></tr>
            </tbody>
          </table>
          <p>In this example, Job B in Manchester produces £580/month more disposable income despite a £10,000 lower gross salary — because London's housing and commuting costs consume the apparent advantage. Use the comparison calculator above to model any two scenarios with your actual numbers.</p>
        </div>
      </section>
    </Shell>
  );
};

const Stat = ({ label, value, big }: { label: string; value: string; big?: boolean }) => (
  <div className="flex justify-between items-baseline border-b border-border py-2 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`font-mono-num ${big ? "text-xl font-semibold" : "text-sm"}`}>{value}</span>
  </div>
);

export default Compare;