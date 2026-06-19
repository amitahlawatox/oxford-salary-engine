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
import { Link } from "react-router-dom";

const EMPLOYERS_NI_THRESHOLD = 5000;
const EMPLOYERS_NI_RATE = 0.15;
const UMBRELLA_MARGIN_WEEKLY = 25;

const DayRate = () => {
  const [s, set] = useUrlState({ dayRate: 400, daysPerYear: 220, expenses: 3000 });

  const annualRevenue = s.dayRate * s.daysPerYear;

  // Umbrella route
  const umbrella = useMemo(() => {
    const margin = UMBRELLA_MARGIN_WEEKLY * 52;
    const beforeENI = annualRevenue - margin;
    const eni = Math.max(0, (beforeENI - EMPLOYERS_NI_THRESHOLD) * EMPLOYERS_NI_RATE);
    const levy = Math.max(0, beforeENI * 0.005);
    const gross = Math.max(0, beforeENI - eni - levy);
    const r = calculate({
      gross,
      region: "england",
      pensionPct: 0,
      pensionMode: "salary-sacrifice",
      studentLoan: "none",
      bonus: 0,
      overtime: 0,
    });
    return { gross, net: r.net, tax: r.incomeTax, ni: r.ni, eni, margin, levy, result: r };
  }, [annualRevenue]);

  // Ltd company route
  const ltd = useMemo(() => {
    const salary = 12570;
    const salaryENI = Math.max(0, (salary - EMPLOYERS_NI_THRESHOLD) * EMPLOYERS_NI_RATE);
    const profit = Math.max(0, annualRevenue - salary - salaryENI - s.expenses);
    let corpTax = 0;
    if (profit <= 50000) corpTax = profit * 0.19;
    else if (profit <= 250000) corpTax = 50000 * 0.19 + (profit - 50000) * 0.265;
    else corpTax = 50000 * 0.19 + 200000 * 0.265 + (profit - 250000) * 0.25;
    const distributable = profit - corpTax;
    const div = calculateDividend(salary, distributable);
    return { salary, profit, corpTax, distributable, net: div.net, divTax: div.dividendTax + div.salaryTax + div.ni };
  }, [annualRevenue, s.expenses]);

  // PAYE (permanent equivalent)
  const paye = useMemo(
    () =>
      calculate({
        gross: annualRevenue,
        region: "england",
        pensionPct: 0,
        pensionMode: "salary-sacrifice",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [annualRevenue]
  );

  const hourlyRate = s.daysPerYear > 0 ? s.dayRate / 8 : 0;
  const monthlyRevenue = annualRevenue / 12;

  return (
    <Shell>
      <ToolSeo path="/day-rate" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Day Rate Calculator UK 2026/27
        </h1>
        <p className="mt-2 text-muted-foreground">
          Convert a contractor day rate into annual salary, monthly income, and
          take-home pay. Compare umbrella, limited company, and permanent PAYE equivalents.
        </p>
        <div className="mt-4">
          <ShareSummary
            summary="Day Rate Calculator — see my UK calculation for the 2026/27 tax year"
            title="Day Rate Calculator | UK Net Pay"
            compact
          />
          <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm">Day rate (£)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input
                type="number"
                value={s.dayRate === 0 ? "" : s.dayRate}
                onChange={(e) => set({ dayRate: Number(e.target.value) || 0 })}
                className="pl-7 font-mono-num text-lg h-11"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm">Billable days / year</Label>
            <Input
              type="number"
              value={s.daysPerYear === 0 ? "" : s.daysPerYear}
              onChange={(e) => set({ daysPerYear: Number(e.target.value) || 0 })}
              className="mt-2 font-mono-num h-11"
            />
          </div>
          <div>
            <Label className="text-sm">Annual expenses (Ltd)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input
                type="number"
                value={s.expenses === 0 ? "" : s.expenses}
                onChange={(e) => set({ expenses: Number(e.target.value) || 0 })}
                className="pl-7 font-mono-num h-11"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border border-border rounded-lg p-4 bg-card text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Hourly</div>
            <div className="font-mono-num text-xl font-semibold mt-1">{fmt(hourlyRate)}</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Daily</div>
            <div className="font-mono-num text-xl font-semibold mt-1">{fmt(s.dayRate)}</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly</div>
            <div className="font-mono-num text-xl font-semibold mt-1">{fmt(monthlyRevenue)}</div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual</div>
            <div className="font-mono-num text-xl font-semibold mt-1">{fmt(annualRevenue)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Umbrella</div>
            <div className="font-mono-num text-2xl font-semibold mt-1">{fmt(umbrella.net)}</div>
            <div className="text-sm text-muted-foreground">per year</div>
            <div className="mt-4 space-y-2">
              <Row label="Gross" v={fmt2(umbrella.gross)} />
              <Row label="Income tax" v={fmt2(umbrella.tax)} />
              <Row label="Employee NI" v={fmt2(umbrella.ni)} />
              <Row label="Employer NI" v={fmt2(umbrella.eni)} />
              <Row label="Monthly net" v={fmt2(umbrella.net / 12)} />
            </div>
          </div>

          <div className="border-2 border-accent/40 rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Limited Company</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent uppercase">Optimal</span>
            </div>
            <div className="font-mono-num text-2xl font-semibold mt-1 text-accent">{fmt(ltd.net)}</div>
            <div className="text-sm text-muted-foreground">per year</div>
            <div className="mt-4 space-y-2">
              <Row label="Director salary" v={fmt2(ltd.salary)} />
              <Row label="Profit" v={fmt2(ltd.profit)} />
              <Row label="Corp tax" v={fmt2(ltd.corpTax)} />
              <Row label="Dividends" v={fmt2(ltd.distributable)} />
              <Row label="Monthly net" v={fmt2(ltd.net / 12)} />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Permanent PAYE</div>
            <div className="font-mono-num text-2xl font-semibold mt-1">{fmt(paye.net)}</div>
            <div className="text-sm text-muted-foreground">per year (equivalent salary)</div>
            <div className="mt-4 space-y-2">
              <Row label="Gross" v={fmt2(annualRevenue)} />
              <Row label="Income tax" v={fmt2(paye.incomeTax)} />
              <Row label="NI" v={fmt2(paye.ni)} />
              <Row label="Monthly net" v={fmt2(paye.net / 12)} />
            </div>
          </div>
        </div>

        {ltd.net - umbrella.net > 0 && (
          <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4 text-sm">
            <strong>Ltd company saves {fmt(ltd.net - umbrella.net)} per year</strong> ({fmt((ltd.net - umbrella.net) / 12)}/month) vs umbrella at this day rate.
          </div>
        )}

        <div className="mt-4 p-3 rounded bg-secondary/50 text-xs text-muted-foreground">
          See also: <Link to="/ir35" className="text-accent hover:underline">IR35 Calculator</Link> |{" "}
          <Link to="/contractor/take-home" className="text-accent hover:underline">Contractor Take-Home</Link> |{" "}
          <Link to="/umbrella" className="text-accent hover:underline">Umbrella Calculator</Link> |{" "}
          <Link to="/hourly" className="text-accent hover:underline">Hourly Rate Calculator</Link>
        </div>

        <div className="mt-6 border border-border rounded-lg p-5 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Umbrella — Tax by band</div>
          <BandBreakdown result={umbrella.result} />
        </div>

        <button
          onClick={() =>
            downloadToolPdf({
              title: "Day Rate Calculator",
              subtitle: `Tax year 2026/27 | Day rate: GBP ${s.dayRate} | ${s.daysPerYear} days/yr`,
              rows: [
                { label: "Day rate", value: `GBP ${s.dayRate}` },
                { label: "Billable days", value: `${s.daysPerYear}` },
                { label: "Annual revenue", value: annualRevenue },
                { label: "---", value: "" },
                { label: "Umbrella — Net", value: umbrella.net, bold: true },
                { label: "Ltd — Net", value: ltd.net, bold: true },
                { label: "Permanent — Net", value: paye.net, bold: true },
                { label: "---", value: "" },
                { label: "Ltd vs Umbrella saving", value: Math.abs(ltd.net - umbrella.net), bold: true },
              ],
              filename: `uknetpay-dayrate-${s.dayRate}pd.pdf`,
            })
          }
          className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
        >
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Day Rate to Annual Salary: How to Convert (2026/27)</h2>
          <p>
            To convert a day rate to annual salary, multiply by your billable days per year.
            Most UK contractors work <strong>220 days</strong> (52 weeks minus 25 days holiday and 8 bank holidays).
            A £400/day rate × 220 days = £88,000 annual equivalent. However, your actual take-home depends heavily
            on whether you operate through an umbrella company or your own limited company.
          </p>

          <h2>Worked Example: £500/day Contractor</h2>
          <table>
            <thead>
              <tr><th>Structure</th><th>Annual Net</th><th>Monthly Net</th></tr>
            </thead>
            <tbody>
              <tr><td>Umbrella company</td><td>~£66,700</td><td>~£5,558</td></tr>
              <tr><td>Limited company (outside IR35)</td><td>~£88,300</td><td>~£7,358</td></tr>
              <tr><td>Permanent PAYE equivalent</td><td>~£73,400</td><td>~£6,117</td></tr>
            </tbody>
          </table>
          <p><small>220 billable days, £3,000 expenses for Ltd. England, 2026/27 rates.</small></p>

          <h2>Day Rate Quick Reference</h2>
          <table>
            <thead>
              <tr><th>Day Rate</th><th>Annual</th><th>Hourly (8hrs)</th><th>Ltd Net/mo</th></tr>
            </thead>
            <tbody>
              <tr><td>£300</td><td>£66,000</td><td>£37.50</td><td>~£4,200</td></tr>
              <tr><td>£400</td><td>£88,000</td><td>£50</td><td>~£5,700</td></tr>
              <tr><td>£500</td><td>£110,000</td><td>£62.50</td><td>~£7,350</td></tr>
              <tr><td>£600</td><td>£132,000</td><td>£75</td><td>~£8,500</td></tr>
              <tr><td>£750</td><td>£165,000</td><td>£93.75</td><td>~£10,200</td></tr>
            </tbody>
          </table>

          <h3>Frequently Asked Questions</h3>
          <p>
            <strong>How many billable days should I use?</strong> Most contractors use 220 days (52 weeks × 5 days
            minus 30 days for holidays/bank holidays). If you work through an agency with specific holiday terms,
            adjust accordingly. IT contractors often use 230 days, while those with generous time off may use 200.
          </p>
          <p>
            <strong>What is a good day rate in the UK?</strong> Day rates vary hugely by industry and role. As of
            2026, typical ranges are: junior developer £250–£350, senior developer £400–£600, IT architect £600–£900,
            management consultant £500–£1,200. Use our calculator to see what each rate means for your take-home.
          </p>
          <p>
            <strong>Should I include expenses in my day rate?</strong> No — your day rate should be your fee before
            expenses. Business expenses (accountancy, software, equipment, insurance) are deducted from revenue before
            corporation tax if you operate through a limited company.
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

export default DayRate;
