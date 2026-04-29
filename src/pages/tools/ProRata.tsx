import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";

const ProRata = () => {
  const [s, set] = useUrlState({ ftSalary: 45000, ftHours: 37.5, actualHours: 22.5 });
  const ratio = s.ftHours > 0 ? s.actualHours / s.ftHours : 0;
  const proRata = Math.round(s.ftSalary * ratio);
  const rFull = useMemo(() => calculate({ gross: s.ftSalary, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }), [s.ftSalary]);
  const rPro = useMemo(() => calculate({ gross: proRata, region: "england", pensionPct: 0, pensionMode: "salary-sacrifice", studentLoan: "none", bonus: 0, overtime: 0 }), [proRata]);

  return (
    <Shell>
      
      <ToolSeo path="/pro-rata" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Pro-Rata Calculator</h1>
        <p className="mt-2 text-muted-foreground">Part-time hours scaled from a full-time salary.</p>
        <div className="mt-4">
          <ShareSummary summary={`Pro-Rata Calculator — see my UK calculation for the 2026/27 tax year`} title="Pro-Rata Calculator | UK Net Pay" compact />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Full-time equivalent salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.ftSalary} onChange={(e) => set({ ftSalary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Full-time hours / week</Label><span className="font-mono-num text-sm">{s.ftHours}</span></div>
            <Slider className="mt-3" min={20} max={48} step={0.5} value={[s.ftHours]} onValueChange={(v) => set({ ftHours: v[0] })} />
          </div>
          <div>
            <div className="flex justify-between"><Label className="text-sm">Your hours / week</Label><span className="font-mono-num text-sm">{s.actualHours}</span></div>
            <Slider className="mt-3" min={1} max={s.ftHours} step={0.5} value={[s.actualHours]} onValueChange={(v) => set({ actualHours: v[0] })} />
          </div>
          <div className="text-sm text-muted-foreground">FTE ratio: <span className="font-mono-num text-foreground">{(ratio * 100).toFixed(1)}%</span></div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Your pro-rata salary</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(proRata)}</div>
          <div className="mt-6 space-y-2">
            <Row label="Take-home / year" v={fmt2(rPro.net)} />
            <Row label="Take-home / month" v={fmt2(rPro.net / 12)} />
            <Row label="Income tax" v={fmt2(rPro.incomeTax)} />
            <Row label="NI" v={fmt2(rPro.ni)} />
            <Row label="Effective rate" v={`${rPro.effectiveRate.toFixed(1)}%`} />
          </div>
          <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
            Vs full-time net of {fmt(rFull.net)} → keeping {((rPro.net / rFull.net) * 100).toFixed(1)}% of net for {(ratio * 100).toFixed(0)}% hours.
          </div>
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

export default ProRata;