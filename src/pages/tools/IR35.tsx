import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, calculateDividend } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";

const IR35 = () => {
  const [s, set] = useUrlState({ dayRate: 500, daysPerYear: 220, expenses: 3000 });

  const grossYear = s.dayRate * s.daysPerYear;

  // OUTSIDE IR35: Ltd co. — Corp tax then dividends
  const outside = useMemo(() => {
    const turnover = grossYear;
    const salary = 12570; // tax-efficient director salary
    const profit = Math.max(0, turnover - salary - s.expenses);
    // Corp tax 2026/27: 19% up to £50k, 26.5% marginal £50k–£250k, 25% above
    let corpTax = 0;
    if (profit <= 50_000) corpTax = profit * 0.19;
    else if (profit <= 250_000) corpTax = 50_000 * 0.19 + (profit - 50_000) * 0.265;
    else corpTax = 50_000 * 0.19 + 200_000 * 0.265 + (profit - 250_000) * 0.25;
    const distributable = profit - corpTax;
    const div = calculateDividend(salary, distributable);
    return { turnover, salary, expenses: s.expenses, profit, corpTax, distributable, net: div.net, divTax: div.dividendTax + div.salaryTax + div.ni };
  }, [grossYear, s.expenses]);

  // INSIDE IR35: deemed PAYE — taxed as employment, no expenses relief
  const inside = useMemo(
    () => calculate({ gross: grossYear, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }),
    [grossYear]
  );

  const diff = outside.net - inside.net;

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">IR35 Contractor</h1>
        <p className="mt-2 text-muted-foreground">Inside vs outside IR35 take-home at your day rate.</p>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 space-y-6">
        <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm">Day rate</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.dayRate} onChange={(e) => set({ dayRate: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Billable days / year</Label>
            <Input type="number" value={s.daysPerYear} onChange={(e) => set({ daysPerYear: Number(e.target.value) || 0 })} className="mt-2 font-mono-num h-11" />
          </div>
          <div>
            <Label className="text-sm">Annual expenses (Ltd)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.expenses} onChange={(e) => set({ expenses: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Outside IR35 (Ltd co.)</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent uppercase">Optimal</span>
            </div>
            <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(outside.net)}</div>
            <div className="mt-6 space-y-2">
              <Row label="Turnover" v={fmt2(outside.turnover)} />
              <Row label="Director salary" v={fmt2(outside.salary)} />
              <Row label="Expenses" v={fmt2(outside.expenses)} />
              <Row label="Profit" v={fmt2(outside.profit)} />
              <Row label="Corp tax" v={fmt2(outside.corpTax)} />
              <Row label="Dividends" v={fmt2(outside.distributable)} />
              <Row label="Personal tax + NI" v={fmt2(outside.divTax)} />
            </div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Inside IR35 (deemed PAYE)</div>
            <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(inside.net)}</div>
            <div className="mt-6 space-y-2">
              <Row label="Gross" v={fmt2(grossYear)} />
              <Row label="Income tax" v={fmt2(inside.incomeTax)} />
              <Row label="NI" v={fmt2(inside.ni)} />
              <Row label="Effective rate" v={`${inside.effectiveRate.toFixed(1)}%`} />
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Outside vs Inside difference</div>
          <div className={`mt-2 font-mono-num text-3xl font-semibold ${diff >= 0 ? "text-foreground" : "text-destructive"}`}>
            {diff >= 0 ? "+" : "−"}{fmt(Math.abs(diff))} <span className="text-sm text-muted-foreground">/ year outside</span>
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

export default IR35;