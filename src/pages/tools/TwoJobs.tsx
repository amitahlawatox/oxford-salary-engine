import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, employeeNI } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

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
      
      <ToolSeo path="/two-jobs" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Two Jobs Calculator</h1>
        <p className="mt-2 text-muted-foreground">Tax across two PAYE employments. Personal allowance applied to Job A; Job B taxed at BR (basic rate).</p>
        <div className="mt-4">
          <ShareSummary summary={`Two-Jobs Tax Calculator — see my UK calculation for the 2026/27 tax year`} title="Two-Jobs Tax Calculator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Job A salary (primary, 1257L)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.jobA === 0 ? "" : s.jobA} onChange={(e) => set({ jobA: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Job B salary (secondary, BR)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.jobB === 0 ? "" : s.jobB} onChange={(e) => set({ jobB: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
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
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Combined tax by band</div>
            <BandBreakdown result={combined} />
          </div>
          <div className="mt-4">
            <button
              onClick={() => downloadToolPdf({
                title: "Two Jobs Calculator",
                subtitle: `Tax year 2026/27 | Job A: GBP ${s.jobA.toLocaleString()} | Job B: GBP ${s.jobB.toLocaleString()}`,
                rows: [
                  { label: "Job A salary", value: s.jobA },
                  { label: "Job B salary", value: s.jobB },
                  { label: "Total gross", value: s.jobA + s.jobB },
                  { label: "Income Tax (combined)", value: combined.incomeTax, negative: true },
                  { label: "NI Job A", value: niA, negative: true },
                  { label: "NI Job B", value: niB, negative: true },
                  { label: "---", value: "" },
                  { label: "True net take-home", value: trueNet, bold: true },
                ],
                filename: `uknetpay-twojobs-${s.jobA}-${s.jobB}.pdf`,
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
          <h2>Tax on a Second Job in the UK — 2026/27</h2>
          <p>When you work two jobs, your Personal Allowance (£12,570) is allocated to one employer through your primary tax code (usually 1257L). Your second employer uses a BR (Basic Rate) code and deducts 20% Income Tax from every pound you earn — with no tax-free allowance. This isn't a penalty; it simply reflects that your allowance is already being used elsewhere.</p>
          <h2>How the BR Tax Code Works</h2>
          <table>
            <thead><tr><th>Job</th><th>Annual pay</th><th>Tax code</th><th>Income Tax paid</th></tr></thead>
            <tbody>
              <tr><td>Primary job</td><td>£28,000</td><td>1257L</td><td>£3,086 (on £15,430 taxable)</td></tr>
              <tr><td>Second job</td><td>£8,000</td><td>BR</td><td>£1,600 (flat 20%)</td></tr>
              <tr><td>Single employer at £36,000</td><td>£36,000</td><td>1257L</td><td>£4,686</td></tr>
            </tbody>
          </table>
          <p>The total tax is identical either way — £4,686. The BR code on Job 2 is not collecting more tax, just ensuring the correct amount is collected at source from each employer.</p>
          <h2>When Two Jobs Push You Into the Higher Rate</h2>
          <p>If your combined income from both jobs exceeds £50,270, part of your earnings moves into the 40% higher rate band. HMRC's Real Time Information (RTI) system usually detects this and issues an updated D0 (40% flat rate) code for the second job. If it doesn't happen automatically, you may owe a balancing payment through Self Assessment at year end.</p>
          <h2>National Insurance: Where Two Jobs Can Cost More</h2>
          <p>Unlike Income Tax, National Insurance is calculated per employment — not on your combined income. If Job 1 pays exactly £50,270 and Job 2 pays £10,000, you pay NI on both separately. Job 2 effectively has its own lower earnings limit — meaning you pay 8% NI on £10,000 from Job 2, costing £800 extra versus a single employer. You can reclaim this overpaid NI from HMRC after the tax year ends.</p>
          <p><strong>Do I need to complete Self Assessment with two jobs?</strong> Only if your total income exceeds £100,000, or if HMRC cannot collect the correct tax through your codes — for example if the combined income crosses into higher rate and your codes haven't been updated.</p>
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