import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/layout/Shell";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate, solveGrossFromNet, type Region } from "@/lib/tax/engine";
import { fmt } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { LazyMarginalCurve as MarginalCurve } from "@/components/charts/LazyMarginalCurve";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

const Reverse = () => {
  const [s, set] = useUrlState({
    targetMonthly: 3000,
    region: "england" as Region,
  });

  const targetAnnual = s.targetMonthly * 12;

  const requiredGross = useMemo(
    () =>
      solveGrossFromNet(targetAnnual, {
        region: s.region,
        pensionPct: 0,
        pensionMode: "salary-sacrifice",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [targetAnnual, s.region],
  );

  const verify = useMemo(
    () =>
      calculate({
        gross: requiredGross,
        region: s.region,
        pensionPct: 0,
        pensionMode: "salary-sacrifice",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [requiredGross, s.region],
  );

  const calcInput = { gross: requiredGross, region: s.region, pensionPct: 0 as number, pensionMode: "salary-sacrifice" as const, studentLoan: "none" as const, bonus: 0, overtime: 0 };

  return (
    <Shell>
      
      <ToolSeo path="/reverse" />
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Reverse Salary Calculator</h1>
        <p className="mt-2 text-muted-foreground">Set your target monthly take-home — we'll solve for the gross salary you need.</p>
        <div className="mt-4">
          <ShareSummary summary={`Reverse Salary Calculator — see my UK calculation for the 2026/27 tax year`} title="Reverse Salary Calculator | UK Net Pay" compact />
              <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5 h-fit">
          <div>
            <Label className="text-sm">Target net per month</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.targetMonthly === 0 ? "" : s.targetMonthly} onChange={(e) => set({ targetMonthly: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11 text-lg" />
            </div>
            <Slider className="mt-4" min={500} max={15000} step={50} value={[s.targetMonthly]} onValueChange={(v) => set({ targetMonthly: v[0] })} />
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
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Required gross salary</div>
            <div className="font-mono-num text-4xl font-semibold mt-2">{fmt(requiredGross)}</div>
            <div className="text-sm text-muted-foreground mt-1">to take home {fmt(s.targetMonthly)} / month</div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card text-sm space-y-2 font-mono-num">
            <div className="flex justify-between"><span className="text-muted-foreground">Verified net (annual)</span><span>{fmt(verify.net)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Verified net (monthly)</span><span>{fmt(verify.net / 12)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Effective rate</span><span>{verify.effectiveRate.toFixed(1)}%</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tax by band</div>
              <BandBreakdown result={verify} />
            </div>
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Take-home curve</div>
              <MarginalCurve input={calcInput} />
            </div>
          </div>
          <button
            onClick={() => downloadToolPdf({
              title: "Reverse Salary Calculator",
              subtitle: `Tax year 2026/27 | Target: GBP ${s.targetMonthly.toLocaleString()}/mo | ${s.region}`,
              rows: [
                { label: "Target net / month", value: s.targetMonthly * 12 / 12 },
                { label: "Required gross salary", value: requiredGross, bold: true },
                { label: "Verified net (annual)", value: verify.net },
                { label: "Verified net (monthly)", value: verify.net / 12 },
                { label: "Effective rate", value: `${verify.effectiveRate.toFixed(1)}%` },
              ],
              filename: `uknetpay-reverse-${s.targetMonthly}mo.pdf`,
            })}
            className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
        </div>
      </section>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>How to Work Out the Gross Salary You Need for a Target Net Income</h2>
          <p>Most salary negotiations and job offers are quoted in gross (pre-tax) terms — but it's your net (take-home) income that determines what you can actually spend. The reverse salary calculator works backwards: you enter the monthly or annual net income you need, and it calculates the gross salary required to achieve that, accounting for Income Tax, National Insurance, and any Student Loan repayments.</p>
          <h2>When You Need a Reverse Salary Calculator</h2>
          <p><strong>Negotiating a salary offer:</strong> If you need £3,000/month to cover your outgoings, you need to know what gross salary that requires — not just hope a round-number gross will cover it. On a basic rate salary, £3,000/month net requires approximately £43,400 gross.</p>
          <p><strong>Comparing job offers:</strong> Two jobs offering £45,000 gross in England and £45,000 gross in Scotland produce different take-home pay due to different income tax rates. The reverse calculator lets you compare net-equivalent gross figures across regions.</p>
          <p><strong>Freelance day rate to salary equivalent:</strong> A contractor earning £400/day over 220 days earns £88,000 gross — but the reverse of that net income shows what employed gross salary would produce the same take-home, making the comparison clear.</p>
          <h2>Common Gross Salaries Required for Target Net Income (England, 2026/27)</h2>
          <table>
            <thead><tr><th>Target monthly net</th><th>Required gross salary</th><th>Tax + NI per year</th></tr></thead>
            <tbody>
              <tr><td>£1,500/month</td><td>~£19,400/year</td><td>~£1,600</td></tr>
              <tr><td>£2,000/month</td><td>~£27,100/year</td><td>~£3,100</td></tr>
              <tr><td>£2,500/month</td><td>~£34,900/year</td><td>~£4,900</td></tr>
              <tr><td>£3,000/month</td><td>~£43,400/year</td><td>~£7,000</td></tr>
              <tr><td>£3,500/month</td><td>~£51,600/year</td><td>~£9,600</td></tr>
              <tr><td>£4,000/month</td><td>~£60,400/year</td><td>~£12,400</td></tr>
              <tr><td>£5,000/month</td><td>~£78,400/year</td><td>~£18,400</td></tr>
            </tbody>
          </table>
          <p><small>No student loan, standard tax code, England. The jump from £3,000 to £3,500/month requires a disproportionately large gross increase because earnings above £50,270 are taxed at 42% (40% IT + 2% NI).</small></p>
          <p><strong>Why does the higher-rate band require more gross per net pound?</strong> In the basic rate band, you keep 72p of every extra £1 earned (28% IT + NI combined). In the higher rate band, you only keep 58p. This is why a £10,000 gross pay rise from £45,000 to £55,000 produces a much smaller net improvement than the same rise from £35,000 to £45,000.</p>
        </div>
      </section>
    </Shell>
  );
};

export default Reverse;