import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/layout/Shell";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, type Region } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { LazyMarginalCurve as MarginalCurve } from "@/components/charts/LazyMarginalCurve";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

const Hourly = () => {
  const [s, set] = useUrlState({
    rate: 18,
    hours: 37.5,
    weeks: 52,
    region: "england" as Region,
  });

  const annualGross = s.rate * s.hours * s.weeks;
  const r = useMemo(
    () => calculate({ gross: annualGross, region: s.region, pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }),
    [annualGross, s.region],
  );
  const calcInput = { gross: annualGross, region: s.region, pensionPct: 0 as number, pensionMode: "salary-sacrifice" as const, studentLoan: "none" as const, bonus: 0, overtime: 0 };

  return (
    <Shell>
      
      <ToolSeo path="/hourly" />
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hourly Wage Calculator</h1>
        <p className="mt-2 text-muted-foreground">Convert an hourly rate into annual, monthly and weekly take-home.</p>
        <div className="mt-4">
          <ShareSummary summary={`Hourly Wage Calculator — see my UK calculation for the 2026/27 tax year`} title="Hourly Wage Calculator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5 h-fit">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Inputs</div>

          <div>
            <Label className="text-sm">Hourly rate</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" step="0.01" value={s.rate === 0 ? "" : s.rate} onChange={(e) => set({ rate: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11 text-lg" />
            </div>
            <Slider className="mt-4" min={0} max={150} step={0.5} value={[s.rate]} onValueChange={(v) => set({ rate: v[0] })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Hours / week</Label>
              <Input type="number" step="0.5" value={s.hours === 0 ? "" : s.hours} onChange={(e) => set({ hours: Number(e.target.value) || 0 })} className="mt-2 font-mono-num" />
            </div>
            <div>
              <Label className="text-sm">Weeks / year</Label>
              <Input type="number" value={s.weeks === 0 ? "" : s.weeks} onChange={(e) => set({ weeks: Number(e.target.value) || 0 })} className="mt-2 font-mono-num" />
            </div>
          </div>

          <div>
            <Label className="text-sm">Region</Label>
            <Tabs value={s.region} onValueChange={(v) => set({ region: v as Region })} className="mt-2">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="england">England / Wales / NI</TabsTrigger>
                <TabsTrigger value="scotland">Scotland</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual gross</div>
            <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(annualGross)}</div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Per year</div>
              <div className="font-mono-num text-xl mt-1">{fmt(r.net)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Per month</div>
              <div className="font-mono-num text-xl mt-1">{fmt(r.net / 12)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Per week</div>
              <div className="font-mono-num text-xl mt-1">{fmt(r.net / s.weeks)}</div>
            </div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card text-sm space-y-2 font-mono-num">
            <div className="flex justify-between"><span className="text-muted-foreground">Income Tax</span><span>−{fmt2(r.incomeTax)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">National Insurance</span><span>−{fmt2(r.ni)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold"><span>Take-home</span><span>{fmt2(r.net)}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tax by band</div>
              <BandBreakdown result={r} />
            </div>
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Take-home curve</div>
              <MarginalCurve input={calcInput} />
            </div>
          </div>
          <button
            onClick={() => downloadToolPdf({
              title: "Hourly Wage Calculator",
              subtitle: `Tax year 2026/27 | Rate: GBP ${s.rate}/hr | ${s.hours} hrs/wk | ${s.weeks} wks/yr | ${s.region}`,
              rows: [
                { label: "Hourly rate", value: `GBP ${s.rate.toFixed(2)}` },
                { label: "Hours / week", value: `${s.hours}` },
                { label: "Weeks / year", value: `${s.weeks}` },
                { label: "Annual gross", value: annualGross },
                { label: "Income Tax", value: r.incomeTax, negative: true },
                { label: "National Insurance", value: r.ni, negative: true },
                { label: "---", value: "" },
                { label: "Net per year", value: r.net, bold: true },
                { label: "Net per month", value: r.net / 12, bold: true },
                { label: "Net per week", value: r.net / s.weeks, bold: true },
              ],
              filename: `uknetpay-hourly-${s.rate}.pdf`,
            })}
            className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
        </div>
      </section>

      {/* SEO content block */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How to Convert an Hourly Rate to Annual Salary in the UK (2026/27)</h2>
          <p>To work out your annual gross salary from an hourly rate: <strong>Annual Salary = Hourly Rate × Hours per Week × Weeks per Year</strong>. Most full-time employees use 37.5 hours/week and 52 weeks, giving a standard working year of 1,950 hours. Contractors and freelancers typically use 46–48 weeks to account for holidays and gaps between contracts.</p>

          <h2>Worked Example: £20/hour Full-Time</h2>
          <table>
            <thead><tr><th>Component</th><th>Amount</th></tr></thead>
            <tbody>
              <tr><td>Hourly rate</td><td>£20.00</td></tr>
              <tr><td>Hours per week</td><td>37.5</td></tr>
              <tr><td>Weeks per year</td><td>52</td></tr>
              <tr><td>Annual gross</td><td>£39,000</td></tr>
              <tr><td>Income Tax</td><td>−£5,286</td></tr>
              <tr><td>National Insurance</td><td>−£2,194</td></tr>
              <tr><td><strong>Monthly take-home</strong></td><td><strong>£2,627</strong></td></tr>
              <tr><td>Net hourly rate (effective)</td><td>£16.17/hour</td></tr>
            </tbody>
          </table>
          <p><small>England, 2026/27, no student loan or pension deductions.</small></p>

          <h2>UK National Minimum Wage Hourly Rates (2026/27)</h2>
          <table>
            <thead><tr><th>Age group</th><th>Hourly rate</th><th>Est. annual full-time</th><th>Monthly take-home</th></tr></thead>
            <tbody>
              <tr><td>21 and over (National Living Wage)</td><td>£12.21</td><td>£23,809</td><td>~£1,745/month</td></tr>
              <tr><td>18–20</td><td>£10.00</td><td>£19,500</td><td>~£1,498/month</td></tr>
              <tr><td>Under 18</td><td>£7.55</td><td>£14,722</td><td>~£1,226/month</td></tr>
              <tr><td>Apprentice</td><td>£7.55</td><td>£14,722</td><td>~£1,226/month</td></tr>
            </tbody>
          </table>

          <h3>Frequently Asked Questions</h3>
          <p><strong>How many weeks should I use for my annual calculation?</strong> Employees with 28 days of statutory holiday should use 52 weeks — your annual salary already accounts for paid holiday. Contractors and self-employed workers who are only paid when working should use 46–48 weeks to model realistic annual income.</p>
          <p><strong>Does the calculator include National Insurance?</strong> Yes. Class 1 Employee NI is deducted at 8% on earnings between £12,571 and £50,270, and 2% above £50,270. This is calculated on your annualised salary.</p>
          <p><strong>What is a good hourly rate in the UK in 2026?</strong> The UK median hourly rate for full-time employees is approximately £19.10/hour based on ONS ASHE data (equivalent to the ~£37,400 median full-time salary). London roles typically pay £22–£28/hour at the median. Skilled technical roles (engineers, software developers, accountants) typically start at £25–£35/hour.</p>
          <p><strong>How do I work out my day rate as a contractor?</strong> Divide your target annual earnings by your working days. A contractor targeting £70,000/year over 230 working days needs a day rate of approximately £304/day. Most UK contractors charge £300–£600/day depending on specialism. Use our <a href="/ir35">IR35 Calculator</a> to compare inside vs outside IR35 take-home on a given day rate.</p>
        </div>
      </section>
    </Shell>
  );
};

export default Hourly;