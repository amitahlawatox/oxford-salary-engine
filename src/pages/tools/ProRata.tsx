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

const ProRata = () => {
  const [s, set] = useUrlState({ ftSalary: 45000, ftHours: 37.5, actualHours: 22.5 });
  const ratio = s.ftHours > 0 ? s.actualHours / s.ftHours : 0;
  const proRata = Math.round(s.ftSalary * ratio);
  const rFull = useMemo(() => calculate({ gross: s.ftSalary, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }), [s.ftSalary]);
  const rPro = useMemo(() => calculate({ gross: proRata, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }), [proRata]);

  return (
    <Shell>
      
      <ToolSeo path="/pro-rata" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Pro-Rata Calculator</h1>
        <p className="mt-2 text-muted-foreground">Part-time hours scaled from a full-time salary.</p>
        <div className="mt-4">
          <ShareSummary summary={`Pro-Rata Calculator — see my UK calculation for the 2026/27 tax year`} title="Pro-Rata Calculator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Full-time equivalent salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.ftSalary === 0 ? "" : s.ftSalary} onChange={(e) => set({ ftSalary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Full-time hours / week</Label><span className="font-mono-num text-sm">{s.ftHours}</span></div>
            <Slider className="mt-3" min={20} max={48} step={0.5} value={[s.ftHours]} onValueChange={(v) => set({ ftHours: v[0] })} />
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Your hours / week</Label><span className="font-mono-num text-sm">{s.actualHours}</span></div>
            <Slider className="mt-3" min={1} max={s.ftHours} step={0.5} value={[s.actualHours]} onValueChange={(v) => set({ actualHours: v[0] })} />
          </div>
          <div className="text-sm text-muted-foreground">FTE ratio: <span className="font-mono-num text-foreground">{(ratio * 100).toFixed(1)}%</span></div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Your pro-rata salary</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(proRata)}</div>
          <div className="mt-6 space-y-2">
            <Row label="Take-home / year" v={fmt2(rPro.net)} />
            <Row label="Take-home / month" v={fmt2(rPro.net / 12)} />
            <Row label="Income tax" v={fmt2(rPro.incomeTax)} />
            <Row label="NI" v={fmt2(rPro.ni)} />
            <Row label="Effective rate" v={`${rPro.effectiveRate.toFixed(1)}%`} />
          </div>
          <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
            Vs full-time net of {fmt(rFull.net)} → keeping {((rPro.net / rFull.net) * 100).toFixed(1)}% of net for {(ratio * 100).toFixed(0)}% hours.
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tax by band</div>
            <BandBreakdown result={rPro} />
          </div>
          <div className="mt-4">
            <button
              onClick={() => downloadToolPdf({
                title: "Pro-Rata Calculator",
                subtitle: `Tax year 2026/27 | FTE: GBP ${s.ftSalary.toLocaleString()} | ${s.actualHours}/${s.ftHours} hrs`,
                rows: [
                  { label: "Full-time salary", value: s.ftSalary },
                  { label: "FTE ratio", value: `${(ratio * 100).toFixed(1)}%` },
                  { label: "Pro-rata salary", value: proRata },
                  { label: "Income Tax", value: rPro.incomeTax, negative: true },
                  { label: "NI", value: rPro.ni, negative: true },
                  { label: "---", value: "" },
                  { label: "Net per year", value: rPro.net, bold: true },
                  { label: "Net per month", value: rPro.net / 12, bold: true },
                  { label: "Effective rate", value: `${rPro.effectiveRate.toFixed(1)}%`, bold: true },
                ],
                filename: `uknetpay-prorata-${proRata}.pdf`,
              })}
              className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* SEO content — crawlable text that makes this page rankable */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How Pro-Rata Salary Works in the UK (2026/27)</h2>
          <p>A pro-rata salary is a full-time salary scaled proportionally to the hours you actually work. The formula is straightforward: <strong>Pro-Rata Salary = Full-Time Salary × (Your Hours ÷ Full-Time Hours)</strong>. So if the full-time equivalent role pays £45,000 for 37.5 hours per week and you work 22.5 hours, your pro-rata salary is £27,000.</p>
          <p>What matters for take-home pay is that your pro-rata salary is then taxed in exactly the same way as any other income — Personal Allowance (£12,570), Income Tax bands, and Class 1 National Insurance all apply based on your actual annual salary, not the full-time equivalent.</p>

          <h2>Worked Example: Part-Time at £45,000 FTE</h2>
          <table>
            <thead><tr><th>Component</th><th>Full-time (37.5 hrs)</th><th>Part-time (22.5 hrs)</th></tr></thead>
            <tbody>
              <tr><td>Annual gross</td><td>£45,000</td><td>£27,000</td></tr>
              <tr><td>Income Tax</td><td>−£6,486</td><td>−£2,886</td></tr>
              <tr><td>National Insurance</td><td>−£2,994</td><td>−£1,634</td></tr>
              <tr><td><strong>Monthly take-home</strong></td><td><strong>£2,960</strong></td><td><strong>£1,873</strong></td></tr>
              <tr><td>Effective rate</td><td>21.1%</td><td>16.7%</td></tr>
            </tbody>
          </table>
          <p><small>England, 2026/27 rates, no pension or student loan deductions.</small></p>

          <h2>Common Pro-Rata Scenarios</h2>
          <p><strong>Returning from maternity leave part-time:</strong> Many employees return on 3 or 4 days per week. Your pro-rata salary preserves your contractual hourly rate — you're not paid less per hour, only fewer hours. Use this calculator to compare take-home before and after the change.</p>
          <p><strong>Job offer with part-time hours:</strong> When comparing a new part-time offer to your current full-time role, always compare net take-home rather than gross. A £30,000 pro-rata salary can look significantly different after tax depending on your other income sources.</p>
          <p><strong>Term-time only roles:</strong> Teachers, teaching assistants, and school staff often work term-time only. The full-year pro-rata salary spreads the pay across 52 weeks even though work is only during 38–40 term weeks. The calculator handles this via the weeks-per-year input.</p>

          <h3>Frequently Asked Questions</h3>
          <p><strong>Is a pro-rata salary before or after tax?</strong> Salaries are always quoted gross (before tax) in the UK. The take-home figures shown after running the calculator are the net (after tax and NI) amounts.</p>
          <p><strong>Do I get the same pension contributions on a pro-rata salary?</strong> Yes — auto-enrolment pension percentages apply to your actual (pro-rata) earnings, not the full-time equivalent. Qualifying earnings are £6,240–£50,270, and the minimum 8% total contribution (3% employer + 5% employee) applies to the proportion of your salary within that band.</p>
          <p><strong>What if I have two part-time jobs?</strong> Each employment is initially taxed separately, but your total income across all jobs is assessed for tax. Use our <a href="/two-jobs">Two Jobs Calculator</a> to see the combined picture.</p>
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

export default ProRata;