import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUrlState } from "@/hooks/useUrlState";
import { calculateSelfEmployed } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { downloadToolPdf } from "@/lib/toolPdf";

const SelfEmployed = () => {
  const [s, set] = useUrlState({ profit: 50000, voluntary: false as boolean });
  const r = useMemo(() => calculateSelfEmployed(s.profit, "england", s.voluntary), [s.profit, s.voluntary]);

  return (
    <Shell>
      
      <ToolSeo path="/self-employed" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Self-Employed Calculator</h1>
        <p className="mt-2 text-muted-foreground">2026/27 sole trader: Income Tax + Class 4 NI (6%/2%) + payments on account.</p>
        <div className="mt-4">
          <ShareSummary summary={`Self-Employed Calculator — see my UK calculation for the 2026/27 tax year`} title="Self-Employed Calculator | UK Net Pay" compact />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Annual profit (after expenses)</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.profit === 0 ? "" : s.profit} onChange={(e) => set({ profit: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div className="flex items-center justify-between border border-border rounded-md p-3">
            <div>
              <div className="text-sm">Voluntary Class 2 NI</div>
              <div className="text-xs text-muted-foreground">Protects State Pension entitlement (£3.45/wk)</div>
            </div>
            <Switch checked={s.voluntary} onCheckedChange={(v) => set({ voluntary: v })} />
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Net profit after tax</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(r.net)}</div>
          <div className="text-sm text-muted-foreground">Effective rate {r.effectiveRate.toFixed(1)}%</div>
          <div className="mt-6 space-y-2">
            <Row label="Profit" v={fmt2(r.profit)} />
            <Row label="Personal allowance" v={fmt2(r.personalAllowance)} />
            <Row label="Income tax" v={fmt2(r.incomeTax)} />
            <Row label="Class 4 NI" v={fmt2(r.class4)} />
            {r.class2 > 0 && <Row label="Class 2 NI (voluntary)" v={fmt2(r.class2)} />}
            <Row label="Total tax" v={fmt2(r.incomeTax + r.class4 + r.class2)} />
          </div>
          {r.paymentsOnAccount > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Payments on account</div>
              <div className="font-mono-num text-lg mt-1">{fmt2(r.paymentsOnAccount)} × 2</div>
              <div className="text-xs text-muted-foreground mt-1">Due 31 Jan and 31 Jul — each = 50% of last year's tax bill.</div>
            </div>
          )}
          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={() => downloadToolPdf({
                title: "Self-Employed Calculator",
                subtitle: `Tax year 2026/27 | Profit: GBP ${s.profit.toLocaleString()}${s.voluntary ? " | Class 2 NI: Yes" : ""}`,
                rows: [
                  { label: "Annual profit", value: r.profit },
                  { label: "Personal allowance", value: r.personalAllowance },
                  { label: "Income Tax", value: r.incomeTax, negative: true },
                  { label: "Class 4 NI", value: r.class4, negative: true },
                  ...(r.class2 > 0 ? [{ label: "Class 2 NI (voluntary)", value: r.class2, negative: true }] : []),
                  { label: "---", value: "" },
                  { label: "Net profit", value: r.net, bold: true },
                  { label: "Effective rate", value: `${r.effectiveRate.toFixed(1)}%`, bold: true },
                ],
                filename: `uknetpay-selfemployed-${s.profit}.pdf`,
              })}
              className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
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

export default SelfEmployed;