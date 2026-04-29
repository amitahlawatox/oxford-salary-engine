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

  return (
    <Shell>
      
      <ToolSeo path="/hourly" />
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Hourly Wage Calculator</h1>
        <p className="mt-2 text-muted-foreground">Convert an hourly rate into annual, monthly and weekly take-home.</p>
        <div className="mt-4">
          <ShareSummary summary={`Hourly Wage Calculator — see my UK calculation for the 2026/27 tax year`} title="Hourly Wage Calculator | UK Net Pay" compact />
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
        </div>
      </section>
    </Shell>
  );
};

export default Hourly;