import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, calculateDividend } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

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
      
      <ToolSeo path="/ir35" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">IR35 Contractor</h1>
        <p className="mt-2 text-muted-foreground">Inside vs outside IR35 take-home at your day rate.</p>
        <div className="mt-4">
          <ShareSummary summary={`IR35 Contractor Calculator — see my UK calculation for the 2026/27 tax year`} title="IR35 Contractor Calculator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 space-y-6">
        <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm">Day rate</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.dayRate === 0 ? "" : s.dayRate} onChange={(e) => set({ dayRate: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Billable days / year</Label>
            <Input type="number" value={s.daysPerYear === 0 ? "" : s.daysPerYear} onChange={(e) => set({ daysPerYear: Number(e.target.value) || 0 })} className="mt-2 font-mono-num h-11" />
          </div>
          <div>
            <Label className="text-sm">Annual expenses (Ltd)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.expenses === 0 ? "" : s.expenses} onChange={(e) => set({ expenses: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
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

        <div className="border border-border rounded-lg p-5 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Inside IR35 - Tax by band</div>
          <BandBreakdown result={inside} />
        </div>

        <button
          onClick={() => downloadToolPdf({
            title: "IR35 Contractor Calculator",
            subtitle: `Tax year 2026/27 | Day rate: GBP ${s.dayRate} | ${s.daysPerYear} days/yr`,
            rows: [
              { label: "Day rate", value: `GBP ${s.dayRate}` },
              { label: "Billable days", value: `${s.daysPerYear}` },
              { label: "Annual turnover", value: grossYear },
              { label: "---", value: "" },
              { label: "Outside IR35 - Net", value: outside.net, bold: true },
              { label: "Corp tax", value: outside.corpTax, negative: true },
              { label: "Personal tax + NI", value: outside.divTax, negative: true },
              { label: "---", value: "" },
              { label: "Inside IR35 - Net", value: inside.net, bold: true },
              { label: "Income tax", value: inside.incomeTax, negative: true },
              { label: "NI", value: inside.ni, negative: true },
              { label: "---", value: "" },
              { label: "Difference (Outside better by)", value: Math.abs(diff), bold: true },
            ],
            filename: `uknetpay-ir35-${s.dayRate}pd.pdf`,
          })}
          className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
        >
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </section>

      {/* SEO content block */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>IR35 Calculator: Inside vs Outside — What It Means for Your Take-Home Pay (2026/27)</h2>
          <p>IR35 (off-payroll working rules) determines whether HMRC treats a contractor as effectively employed. If you're <strong>inside IR35</strong>, your client deducts income tax and National Insurance before paying you — just like an employee. If you're <strong>outside IR35</strong>, you operate as a genuine business and pay yourself via salary and dividends from your limited company, keeping significantly more of what you earn.</p>

          <h2>Worked Example: £500/day Contractor (230 days/year)</h2>
          <table>
            <thead><tr><th>Scenario</th><th>Inside IR35</th><th>Outside IR35</th></tr></thead>
            <tbody>
              <tr><td>Day rate</td><td>£500</td><td>£500</td></tr>
              <tr><td>Annual contract income</td><td>£115,000</td><td>£115,000</td></tr>
              <tr><td>Corporation Tax (19%)</td><td>N/A</td><td>−£6,460</td></tr>
              <tr><td>Income Tax + NI (as employee)</td><td>−£41,600</td><td>−£7,450 (salary only)</td></tr>
              <tr><td>Dividend Tax</td><td>N/A</td><td>−£6,100</td></tr>
              <tr><td><strong>Annual take-home</strong></td><td><strong>~£73,400</strong></td><td><strong>~£95,000</strong></td></tr>
              <tr><td><strong>Difference</strong></td><td colSpan={2}><strong>Outside IR35 better by ~£21,600/year</strong></td></tr>
            </tbody>
          </table>
          <p><small>Estimates assume optimal salary/dividend split (£12,570 salary + remaining as dividends), England, 2026/27 rates. Employer NI on deemed payment not modelled. Consult a contractor accountant for your exact situation.</small></p>

          <h2>The 2026/27 IR35 Landscape</h2>
          <p><strong>Who decides IR35 status?</strong> Since April 2021, medium and large private sector clients determine IR35 status (reformed off-payroll rules). Only small companies (defined as meeting two of: turnover &lt;£10.2M, balance sheet &lt;£5.1M, &lt;50 employees) leave the determination with the contractor. HMRC's CEST tool provides a determination, but it's not infallible — approximately 20% of cases produce an "undetermined" result.</p>
          <p><strong>Key factors pointing outside IR35:</strong> Right of substitution (you can send a qualified substitute), no mutuality of obligation (no guaranteed work or obligation to accept it), control over how the work is done, working for multiple clients, using your own equipment, and financial risk (fixed-price contracts).</p>
          <p><strong>Key factors pointing inside IR35:</strong> Working for one client for an extended period, client controls how/when/where you work, integrated into the client's team, no right to substitute, and no financial risk (hourly/daily paid indefinitely).</p>

          <h3>Frequently Asked Questions</h3>
          <p><strong>Can I be inside IR35 for one contract and outside for another?</strong> Yes — IR35 status is determined per contract, not per contractor. You can have multiple simultaneous contracts with different IR35 status determinations.</p>
          <p><strong>What is the Intermediaries Legislation threshold for small companies?</strong> For 2026/27, small companies (the client's own classification) still allow the contractor's own IR35 self-assessment. A client is small if it meets two of these three: annual turnover not exceeding £10.2M, balance sheet not exceeding £5.1M, and no more than 50 employees.</p>
          <p><strong>Does operating through an umbrella company affect IR35?</strong> Umbrella company workers are always taxed as employees — umbrella is effectively always "inside IR35" equivalent. The trade-off is simplicity and PAYE compliance at the cost of take-home pay. Compare umbrella vs limited company with our <a href="/contractor">Contractor Calculator</a>.</p>
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