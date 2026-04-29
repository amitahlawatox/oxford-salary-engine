import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt } from "@/lib/format";
import { MapPin } from "lucide-react";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";

// Approx monthly cost-of-living (1-bed rent + bills + transport + modest food) — 2026 estimates.
const CITIES: { name: string; cost: number; rent: number }[] = [
  { name: "London", cost: 3200, rent: 2100 },
  { name: "Brighton", cost: 2300, rent: 1500 },
  { name: "Edinburgh", cost: 2050, rent: 1300 },
  { name: "Bristol", cost: 2050, rent: 1350 },
  { name: "Manchester", cost: 1850, rent: 1200 },
  { name: "Birmingham", cost: 1750, rent: 1100 },
  { name: "Leeds", cost: 1700, rent: 1050 },
  { name: "Glasgow", cost: 1650, rent: 1000 },
  { name: "Liverpool", cost: 1550, rent: 900 },
  { name: "Newcastle", cost: 1500, rent: 850 },
  { name: "Cardiff", cost: 1700, rent: 1050 },
  { name: "Belfast", cost: 1500, rent: 850 },
];

const CostOfLiving = () => {
  const [s, set] = useUrlState({ salary: 45000 });
  const r = useMemo(
    () => calculate({ gross: s.salary, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }),
    [s.salary]
  );
  const monthlyNet = r.net / 12;

  return (
    <Shell>
      
      <ToolSeo path="/cost-of-living" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Cost-of-Living Overlay</h1>
        <p className="mt-2 text-muted-foreground">Does your net cover the city you live in?</p>
        <div className="mt-4">
          <ShareSummary summary={`Cost-of-Living Adjuster — see my UK calculation for the 2026/27 tax year`} title="Cost-of-Living Adjuster | UK Net Pay" compact />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="border border-border rounded-lg p-6 bg-card mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <Label className="text-sm">Annual salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly take-home</div>
            <div className="font-mono-num text-2xl font-semibold mt-1">{fmt(monthlyNet)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual net</div>
            <div className="font-mono-num text-2xl font-semibold mt-1">{fmt(r.net)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CITIES.map((c) => {
            const surplus = monthlyNet - c.cost;
            const ok = surplus > 0;
            const pct = Math.min(100, Math.max(0, (monthlyNet / c.cost) * 100));
            return (
              <div key={c.name} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <span className={`text-xs font-medium ${ok ? "text-accent" : "text-destructive"}`}>
                    {ok ? "Affordable" : "Tight"}
                  </span>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Monthly need ≈ <span className="font-mono-num text-foreground">{fmt(c.cost)}</span> · rent {fmt(c.rent)}</div>
                <div className="mt-3 h-1.5 bg-secondary rounded overflow-hidden">
                  <div className={`h-full ${ok ? "bg-accent" : "bg-destructive"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className={`mt-2 text-sm font-mono-num ${ok ? "text-foreground" : "text-destructive"}`}>
                  {ok ? "+" : "−"}{fmt(Math.abs(surplus))}/mo {ok ? "surplus" : "shortfall"}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Cost-of-living estimates for a single person in a 1-bed flat (rent + bills + transport + modest food). Indicative only.</p>
      </section>
    </Shell>
  );
};

export default CostOfLiving;