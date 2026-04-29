import { useMemo } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
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

const base = (gross: number, region: Region) =>
  calculate({ gross, region, pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 });

const PayRise = () => {
  const [s, set] = useUrlState({
    salary: 45000,
    rise: 3000,
    region: "england" as Region,
  });

  const before = useMemo(() => base(s.salary, s.region), [s.salary, s.region]);
  const after = useMemo(() => base(s.salary + s.rise, s.region), [s.salary, s.rise, s.region]);

  const netGain = after.net - before.net;
  const keptPct = s.rise > 0 ? (netGain / s.rise) * 100 : 0;
  const lostToTax = s.rise - netGain;

  return (
    <Shell>
      
      <ToolSeo path="/pay-rise" />
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <TrendingUp className="h-6 w-6" /> Pay Rise Simulator
        </h1>
        <p className="mt-2 text-muted-foreground">See exactly how much of your raise actually reaches your bank account.</p>
        <div className="mt-4">
          <ShareSummary summary={`Pay Rise Simulator — see my UK calculation for the 2026/27 tax year`} title="Pay Rise Simulator | UK Net Pay" compact />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 space-y-6">
        <div className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="text-sm">Current salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary === 0 ? "" : s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
            </div>
            <Slider className="mt-3" min={0} max={200000} step={500} value={[s.salary]} onValueChange={(v) => set({ salary: v[0] })} />
          </div>
          <div>
            <Label className="text-sm">Pay rise (£)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.rise === 0 ? "" : s.rise} onChange={(e) => set({ rise: Number(e.target.value) || 0 })} className="pl-7 font-mono-num h-11" />
            </div>
            <Slider className="mt-3" min={0} max={50000} step={250} value={[s.rise]} onValueChange={(v) => set({ rise: v[0] })} />
          </div>
          <div>
            <Label className="text-sm">Region</Label>
            <Tabs value={s.region} onValueChange={(v) => set({ region: v as Region })} className="mt-2">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="england">rUK</TabsTrigger>
                <TabsTrigger value="scotland">Scotland</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Headline delta */}
        <div className="border border-border rounded-lg p-8 bg-card text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Of your {fmt(s.rise)} raise, you actually keep</div>
          <div className="font-mono-num text-5xl md:text-6xl font-semibold mt-3 text-accent">{fmt(netGain)}</div>
          <div className="text-sm text-muted-foreground mt-2">
            That's <span className="font-mono-num text-foreground">{keptPct.toFixed(0)}%</span> of the gross —{" "}
            <span className="font-mono-num text-destructive">{fmt(lostToTax)}</span> goes to tax & NI.
          </div>
          <div className="text-xs text-muted-foreground mt-1">+{fmt(netGain / 12)} per month after deductions.</div>
        </div>

        {/* Side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Compare title="Before" gross={s.salary} net={before.net} tax={before.incomeTax + before.ni} />
          <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground justify-self-center" />
          <Compare title="After" gross={s.salary + s.rise} net={after.net} tax={after.incomeTax + after.ni} highlight />
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Marginal rate</div>
          <div className="text-sm">
            On the next £1 you earn, you'll keep{" "}
            <span className="font-mono-num font-semibold text-foreground">{(100 - after.marginalRate).toFixed(0)}p</span> and pay{" "}
            <span className="font-mono-num text-destructive">{after.marginalRate.toFixed(0)}p</span> in tax/NI.
          </div>
          {s.salary + s.rise > 100000 && s.salary + s.rise < 125140 && (
            <div className="mt-3 text-sm border-l-2 border-destructive pl-3 text-muted-foreground">
              ⚠️ You're in the £100k–£125,140 personal-allowance taper — your marginal rate is effectively 60% in this band.
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
};

const Compare = ({ title, gross, net, tax, highlight }: { title: string; gross: number; net: number; tax: number; highlight?: boolean }) => (
  <div className={`border rounded-lg p-5 bg-card ${highlight ? "border-accent" : "border-border"}`}>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
    <div className="font-mono-num text-2xl font-semibold mt-2">{fmt(net)}</div>
    <div className="text-xs text-muted-foreground mt-1">net / year on {fmt(gross)} gross</div>
    <div className="text-xs font-mono-num text-muted-foreground mt-2">Tax+NI: {fmt2(tax)}</div>
  </div>
);

export default PayRise;