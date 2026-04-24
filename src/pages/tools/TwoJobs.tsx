import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, employeeNI } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";

const TwoJobs = () => {
  const [s, set] = useUrlState({ jobA: 30000, jobB: 15000 });

  // Combined: tax computed on total income; NI is per-job (separate employments)
  const combined = useMemo(() => calculate({
    gross: s.jobA + s.jobB, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice",
    studentLoan: "none", bonus: 0, overtime: 0,
  }), [s.jobA, s.jobB]);

  // NI is calculated per employer separately
  const niA = employeeNI(s.jobA);
  const niB = employeeNI(s.jobB);
  const niCombined = niA + niB;
  const niSavingsVsSingle = niCombined - combined.ni;

  const trueNet = combined.totalGross - combined.incomeTax - niCombined;

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Two Jobs Calculator</h1>
        <p className="mt-2 text-muted-foreground">Tax across two PAYE employments. Personal allowance applied to Job A; Job B taxed at BR (basic rate).</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Job A salary (primary, 1257L)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.jobA} onChange={(e) => set({ jobA: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Job B salary (secondary, BR)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.jobB} onChange={(e) => set({ jobB: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            Each employer calculates NI separately on its own pay — you may pay <em>more</em> NI than someone on a single equivalent salary.
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Combined position</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(trueNet)}</div>
          <div className="text-sm text-muted-foreground">net per year</div>
          <div className="mt-6 space-y-2">
            <Row label="Total gross" v={fmt2(s.jobA + s.jobB)} />
            <Row label="Income tax (combined)" v={fmt2(combined.incomeTax)} />
            <Row label="NI Job A" v={fmt2(niA)} />
            <Row label="NI Job B" v={fmt2(niB)} />
            <Row label="NI total" v={fmt2(niCombined)} />
            {niSavingsVsSingle > 0.5 && (
              <div className="mt-3 text-xs text-destructive">
                ⚠ You pay {fmt2(niSavingsVsSingle)} more NI than you would on one equivalent salary.
              </div>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
};

const Row = ({ label, v }: { label: string; v: string }) => (
  <div className="flex justify-between border-b border-border py-2 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-mono-num text-sm">{v}</span>
  </div>
);

export default TwoJobs;