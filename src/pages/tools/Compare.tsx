import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";

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

  const Col = ({ title, salary, pension, onSal, onPen, r }: any) => (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">{title}</div>
      <Label className="text-sm">Gross salary</Label>
      <div className="mt-2 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
        <Input type="number" value={salary} onChange={(e) => onSal(Number(e.target.value) || 0)} className="pl-7 font-mono-num text-lg h-11" />
      </div>
      <Label className="text-sm mt-4 block">Pension %</Label>
      <Input type="number" value={pension} onChange={(e) => onPen(Number(e.target.value) || 0)} className="mt-2 font-mono-num" />
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
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Col title="Job A" salary={s.a} pension={s.pensionA} onSal={(v: number) => set({ a: v })} onPen={(v: number) => set({ pensionA: v })} r={ra} />
          <Col title="Job B" salary={s.b} pension={s.pensionB} onSal={(v: number) => set({ b: v })} onPen={(v: number) => set({ pensionB: v })} r={rb} />
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