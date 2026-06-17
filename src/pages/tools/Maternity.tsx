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
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

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
              <ResultDisclaimer />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Annual salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary === 0 ? "" : s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
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
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tax by band</div>
            <BandBreakdown result={result.r} />
          </div>
          <div className="mt-4">
            <button
              onClick={() => downloadToolPdf({
                title: "Maternity / SMP Calculator",
                subtitle: `Tax year 2026/27 | Salary: GBP ${s.salary.toLocaleString()} | ${s.weeksFullPay} full-pay wks | ${s.weeksHalfPay} half-pay wks`,
                rows: [
                  { label: "Normal annual salary", value: s.salary },
                  { label: "Maternity-year gross", value: result.totalGrossYear },
                  { label: "Income Tax", value: result.r.incomeTax, negative: true },
                  { label: "NI", value: result.r.ni, negative: true },
                  { label: "---", value: "" },
                  { label: "Maternity net", value: result.r.net, bold: true },
                  { label: "Normal-year net", value: result.normal.net },
                  { label: "Difference", value: result.normal.net - result.r.net, negative: true, bold: true },
                ],
                filename: `uknetpay-maternity-${s.salary}.pdf`,
              })}
              className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </section>


      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Statutory Maternity Pay (SMP) — 2026/27 Rates and Rules</h2>
          <p>Statutory Maternity Pay is the minimum your employer must pay during maternity leave. It runs for up to 39 weeks and is split into two phases: a higher earnings-related phase and a flat-rate phase. Many employers pay enhanced maternity pay above the statutory minimum — check your contract before planning your finances.</p>
          <h2>SMP Rates 2026/27</h2>
          <table>
            <thead><tr><th>Period</th><th>Rate</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>Weeks 1–6</td><td>90% of average weekly earnings</td><td>No upper cap — earnings-linked</td></tr>
              <tr><td>Weeks 7–39</td><td>£187.18/week flat rate</td><td>Or 90% of earnings if lower</td></tr>
              <tr><td>Weeks 40–52</td><td>£0 (unpaid)</td><td>Remaining maternity leave is unpaid</td></tr>
            </tbody>
          </table>
          <h2>SMP Eligibility</h2>
          <p>To qualify for SMP, you must have worked for your employer continuously for at least 26 weeks into the 15th week before your baby's due date, and earned at least £125/week (the Lower Earnings Limit) on average in the eight weeks before the qualifying week. If you don't qualify for SMP, you may be eligible for Maternity Allowance (£187.18/week or 90% of earnings, whichever is lower) paid directly by HMRC.</p>
          <h2>Tax on Maternity Pay</h2>
          <p>SMP is treated as employment income and subject to Income Tax and National Insurance in the same way as your regular salary. In the weeks 1–6 higher-rate phase, your higher gross SMP may push you into a higher tax bracket. In the flat-rate phase, £187.18/week (£9,733 annually) is below the Personal Allowance if it's your only income for that period, meaning no Income Tax is due on the SMP itself — though HMRC adjusts your code to reflect your full-year position.</p>
          <p><strong>Pension during maternity leave:</strong> Your employer must continue making pension contributions during paid maternity leave. Contributions are based on your normal salary, not your reduced SMP — so your pension doesn't fall during paid leave. During unpaid leave (weeks 40–52), employer contributions can stop unless your scheme rules say otherwise.</p>
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