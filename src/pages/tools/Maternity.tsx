import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";

// 2026/27 SMP: 6 weeks @ 90% AWE, then 33 weeks @ £187.18 or 90% (lower), then 13 weeks unpaid.
const SMP_FLAT = 187.18;

const Maternity = () => {
  const [s, set] = useUrlState({ salary: 45000, weeksFullPay: 0, weeksHalfPay: 0 });

  const result = useMemo(() => {
    const weeklyGross = s.salary / 52;
    const w1 = 6;
    const smpRate1 = weeklyGross * 0.9;
    const w2 = 33;
    const smpRate2 = Math.min(SMP_FLAT, weeklyGross * 0.9);
    const w3 = 13;

    // Employer enhanced pay periods overlay first weeks
    const fullWeeks = Math.min(s.weeksFullPay, 52);
    const halfWeeks = Math.min(s.weeksHalfPay, 52 - fullWeeks);

    let total = 0;
    for (let week = 1; week <= 52; week++) {
      let pay = 0;
      // Determine SMP component
      if (week <= w1) pay = smpRate1;
      else if (week <= w1 + w2) pay = smpRate2;
      else pay = 0;
      // Override with employer top-up
      if (week <= fullWeeks) pay = Math.max(pay, weeklyGross);
      else if (week <= fullWeeks + halfWeeks) pay = Math.max(pay, weeklyGross / 2);
      total += pay;
    }

    const r = calculate({ gross: total, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 });
    const normal = calculate({ gross: s.salary, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 });
    return { totalGrossYear: total, r, normal };
  }, [s.salary, s.weeksFullPay, s.weeksHalfPay]);

  return (
    <Shell>
      
      <ToolSeo path="/maternity" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Maternity / SMP Calculator</h1>
        <p className="mt-2 text-muted-foreground">2026/27 statutory: 6 weeks @ 90% pay, 33 weeks @ £{SMP_FLAT}/wk, then 13 weeks unpaid.</p>
        <div className="mt-4">
          <ShareSummary summary={`Maternity / SMP Calculator — see my UK calculation for the 2026/27 tax year`} title="Maternity / SMP Calculator | UK Net Pay" compact />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Annual salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Employer top-up: full pay weeks</Label><span className="font-mono-num text-sm">{s.weeksFullPay}</span></div>
            <Slider className="mt-3" min={0} max={26} step={1} value={[s.weeksFullPay]} onValueChange={(v) => set({ weeksFullPay: v[0] })} />
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Employer top-up: half pay weeks</Label><span className="font-mono-num text-sm">{s.weeksHalfPay}</span></div>
            <Slider className="mt-3" min={0} max={26} step={1} value={[s.weeksHalfPay]} onValueChange={(v) => set({ weeksHalfPay: v[0] })} />
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Maternity year take-home</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(result.r.net)}</div>
          <div className="mt-6 space-y-2">
            <Row label="Maternity-year gross" v={fmt2(result.totalGrossYear)} />
            <Row label="Income tax" v={fmt2(result.r.incomeTax)} />
            <Row label="NI" v={fmt2(result.r.ni)} />
            <Row label="Net" v={fmt2(result.r.net)} />
            <Row label="Vs normal-year net" v={`−${fmt2(result.normal.net - result.r.net)}`} />
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

export default Maternity;