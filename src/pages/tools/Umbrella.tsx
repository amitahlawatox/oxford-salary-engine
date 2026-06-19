import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { Link } from "react-router-dom";

const EMPLOYERS_NI_THRESHOLD = 5000;
const EMPLOYERS_NI_RATE = 0.15;

const Umbrella = () => {
  const [s, set] = useUrlState({
    assignment: 50000,
    margin: 25,
    pension: 0,
  });

  const r = useMemo(() => {
    const annualMargin = s.margin * 52;
    const grossBeforeENI = s.assignment - annualMargin;
    const employersNI = Math.max(0, (grossBeforeENI - EMPLOYERS_NI_THRESHOLD) * EMPLOYERS_NI_RATE);
    const apprenticeshipLevy = Math.max(0, grossBeforeENI * 0.005);
    const grossPay = grossBeforeENI - employersNI - apprenticeshipLevy;

    const result = calculate({
      gross: Math.max(0, grossPay),
      region: "england",
      pensionPct: s.pension,
      pensionMode: "salary-sacrifice",
      studentLoan: "none",
      bonus: 0,
      overtime: 0,
    });

    return {
      assignment: s.assignment,
      margin: annualMargin,
      employersNI,
      apprenticeshipLevy,
      grossPay: Math.max(0, grossPay),
      incomeTax: result.incomeTax,
      ni: result.ni,
      net: result.net,
      monthlyNet: result.net / 12,
      weeklyNet: result.net / 52,
      effectiveRate: result.effectiveRate,
      totalDeductions: annualMargin + employersNI + apprenticeshipLevy + result.incomeTax + result.ni,
      result,
    };
  }, [s.assignment, s.margin, s.pension]);

  return (
    <Shell>
      <ToolSeo path="/umbrella" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Umbrella Company Take-Home Pay Calculator 2026/27
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your take-home pay through an umbrella company. See how much
          of your assignment rate reaches your bank after employer NI, umbrella
          margin, and PAYE deductions.
        </p>
        <div className="mt-4">
          <ShareSummary
            summary="Umbrella Company Calculator — see my UK calculation for the 2026/27 tax year"
            title="Umbrella Company Calculator | UK Net Pay"
            compact
          />
          <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Annual assignment rate (£)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input
                type="number"
                value={s.assignment === 0 ? "" : s.assignment}
                onChange={(e) => set({ assignment: Number(e.target.value) || 0 })}
                className="pl-7 font-mono-num text-lg h-11"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              The total your agency invoices the client for you per year.
            </p>
          </div>
          <div>
            <Label className="text-sm">Umbrella margin (£/week)</Label>
            <Input
              type="number"
              value={s.margin === 0 ? "" : s.margin}
              onChange={(e) => set({ margin: Number(e.target.value) || 0 })}
              className="mt-2 font-mono-num h-11"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Typical range: £20–£30/week. This is the umbrella company's fee.
            </p>
          </div>
          <div>
            <Label className="text-sm">Pension contribution (%)</Label>
            <Input
              type="number"
              min={0}
              max={40}
              value={s.pension === 0 ? "" : s.pension}
              onChange={(e) => set({ pension: Number(e.target.value) || 0 })}
              className="mt-2 font-mono-num h-11"
            />
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Monthly take-home
          </div>
          <div className="font-mono-num text-3xl font-semibold mt-1">
            {fmt(r.monthlyNet)}
          </div>
          <div className="text-sm text-muted-foreground">per month ({fmt(r.weeklyNet)}/week)</div>

          <div className="mt-6 space-y-2">
            <Row label="Assignment rate" v={fmt2(r.assignment)} />
            <Row label="Umbrella margin" v={`−${fmt2(r.margin)}`} />
            <Row label="Employer NI (15%)" v={`−${fmt2(r.employersNI)}`} />
            <Row label="Apprenticeship Levy" v={`−${fmt2(r.apprenticeshipLevy)}`} />
            <Row label="Gross pay" v={fmt2(r.grossPay)} />
            <Row label="Income tax" v={`−${fmt2(r.incomeTax)}`} />
            <Row label="Employee NI" v={`−${fmt2(r.ni)}`} />
            <Row label="Net per year" v={fmt2(r.net)} />
            <Row label="Net per month" v={fmt2(r.monthlyNet)} />
            <Row label="Effective rate" v={`${r.effectiveRate.toFixed(1)}%`} />
          </div>

          <div className="mt-4 p-3 rounded bg-secondary/50 text-xs text-muted-foreground">
            Total deductions: {fmt2(r.totalDeductions)} ({((r.totalDeductions / Math.max(1, r.assignment)) * 100).toFixed(1)}% of assignment rate).
            Compare with <Link to="/ir35" className="text-accent hover:underline">IR35 calculator</Link> or{" "}
            <Link to="/contractor/take-home" className="text-accent hover:underline">Ltd vs Umbrella</Link>.
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Tax by band
            </div>
            <BandBreakdown result={r.result} />
          </div>
          <div className="mt-4">
            <button
              onClick={() =>
                downloadToolPdf({
                  title: "Umbrella Company Calculator",
                  subtitle: `Tax year 2026/27 | Assignment: GBP ${s.assignment.toLocaleString()} | Margin: GBP ${s.margin}/wk`,
                  rows: [
                    { label: "Assignment rate", value: r.assignment },
                    { label: "Umbrella margin", value: r.margin, negative: true },
                    { label: "Employer NI", value: r.employersNI, negative: true },
                    { label: "Apprenticeship Levy", value: r.apprenticeshipLevy, negative: true },
                    { label: "Gross pay", value: r.grossPay },
                    { label: "Income Tax", value: r.incomeTax, negative: true },
                    { label: "Employee NI", value: r.ni, negative: true },
                    { label: "---", value: "" },
                    { label: "Net per year", value: r.net, bold: true },
                    { label: "Net per month", value: r.monthlyNet, bold: true },
                  ],
                  filename: `uknetpay-umbrella-${r.assignment}.pdf`,
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How Umbrella Company Pay Works in the UK (2026/27)</h2>
          <p>
            An umbrella company employs you on behalf of your recruitment agency or client. Your assignment rate
            (what the client pays) is <strong>not</strong> your salary — the umbrella deducts its margin, employer
            National Insurance (15% above £5,000), and Apprenticeship Levy (0.5%) before calculating your gross pay.
            Income tax and employee NI are then deducted via PAYE.
          </p>

          <h2>Worked Example: £50,000 Assignment Rate</h2>
          <table>
            <thead>
              <tr><th>Deduction</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Assignment rate</td><td>£50,000</td></tr>
              <tr><td>Umbrella margin (£25/wk)</td><td>−£1,300</td></tr>
              <tr><td>Employer NI (15%)</td><td>−£6,555</td></tr>
              <tr><td>Apprenticeship Levy</td><td>−£211</td></tr>
              <tr><td>Gross pay</td><td>£41,934</td></tr>
              <tr><td>Income Tax</td><td>−£5,873</td></tr>
              <tr><td>Employee NI</td><td>−£2,349</td></tr>
              <tr><td><strong>Annual take-home</strong></td><td><strong>~£33,712</strong></td></tr>
              <tr><td><strong>Monthly take-home</strong></td><td><strong>~£2,809</strong></td></tr>
            </tbody>
          </table>
          <p><small>England, 2026/27 rates, no pension, no student loan. Figures are estimates.</small></p>

          <h2>Why Is Umbrella Take-Home Lower Than Expected?</h2>
          <p>
            The biggest surprise for contractors is <strong>employer NI</strong>. Unlike
            permanent employment where the employer absorbs this cost, in an umbrella setup it is deducted from your
            assignment rate. At 15% above £5,000, this can reduce your gross pay by £5,000–£15,000 per year.
          </p>

          <h3>Frequently Asked Questions</h3>
          <p>
            <strong>What is a good umbrella company margin?</strong> Typical margins range from £20 to £30 per week.
            Be wary of umbrella companies advertising very low margins — they may recoup costs through hidden fees
            or deducting employer NI after quoting your "gross salary."
          </p>
          <p>
            <strong>Can I claim expenses through an umbrella company?</strong> Since April 2016, umbrella company
            workers under the supervision, direction, or control of the client generally cannot claim tax
            relief on travel and subsistence expenses.
          </p>
          <p>
            <strong>Is umbrella or limited company better?</strong> For rates above £400/day outside IR35, a limited
            company typically saves £5,000–£15,000/year vs umbrella. Inside IR35, the difference is minimal. Use our{" "}
            <a href="/contractor/take-home">Contractor Calculator</a> to compare directly.
          </p>
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

export default Umbrella;
