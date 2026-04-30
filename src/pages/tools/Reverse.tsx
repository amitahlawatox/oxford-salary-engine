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
import { BandBreakdown } from "@/components/charts/BandBreakdown";
import { MarginalCurve } from "@/components/charts/MarginalCurve";
import { downloadToolPdf } from "@/lib/toolPdf";

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
    </Shell>
  );
};

export default Reverse;