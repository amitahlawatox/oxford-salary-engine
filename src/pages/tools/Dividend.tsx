import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculateDividend, optimiseDirectorSplit } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";

const Dividend = () => {
  const [s, set] = useUrlState({ salary: 12570, dividends: 37430 });
  const r = useMemo(() => calculateDividend(s.salary, s.dividends), [s.salary, s.dividends]);
  const total = s.salary + s.dividends;
  const splits = useMemo(() => optimiseDirectorSplit(total), [total]);
  const best = splits.reduce((a, b) => (b.result.net > a.result.net ? b : a), splits[0]);

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dividend Optimiser</h1>
        <p className="mt-2 text-muted-foreground">Director salary + dividends. 2026/27 dividend rates: 8.75% / 33.75% / 39.35%. Allowance £500.</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Director salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Dividends drawn</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.dividends} onChange={(e) => set({ dividends: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div className="border border-border rounded-md p-4 bg-secondary/40">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Optimal split for {fmt(total)} total</div>
            <div className="space-y-2">
              {splits.map((opt) => {
                const isBest = opt === best;
                return (
                  <button
                    key={opt.salary}
                    onClick={() => set({ salary: opt.salary, dividends: opt.dividends })}
                    className={`w-full text-left flex justify-between items-center text-sm py-1.5 px-2 rounded ${isBest ? "bg-foreground/5 font-medium" : "hover:bg-foreground/5"}`}
                  >
                    <span className="font-mono-num">{fmt(opt.salary)} sal + {fmt(opt.dividends)} div</span>
                    <span className="font-mono-num">{fmt(opt.result.net)} {isBest && <span className="ml-1 text-xs text-accent">★</span>}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Net take-home</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(r.net)}</div>
          <div className="text-sm text-muted-foreground">Effective rate {r.effectiveRate.toFixed(1)}%</div>
          <div className="mt-6 space-y-2">
            <Row label="Total extracted" v={fmt2(r.total)} />
            <Row label="Personal allowance" v={fmt2(r.personalAllowance)} />
            <Row label="Salary income tax" v={fmt2(r.salaryTax)} />
            <Row label="NI on salary" v={fmt2(r.ni)} />
            <Row label="Dividend allowance used" v={fmt2(r.dividendAllowance)} />
            <Row label="Dividend tax" v={fmt2(r.dividendTax)} />
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

export default Dividend;