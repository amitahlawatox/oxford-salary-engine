import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculateDividend, optimiseDirectorSplit } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { downloadToolPdf } from "@/lib/toolPdf";

const Dividend = () => {
  const [s, set] = useUrlState({ salary: 12570, dividends: 37430 });
  const r = useMemo(() => calculateDividend(s.salary, s.dividends), [s.salary, s.dividends]);
  const total = s.salary + s.dividends;
  const splits = useMemo(() => optimiseDirectorSplit(total), [total]);
  const best = splits.reduce((a, b) => (b.result.net > a.result.net ? b : a), splits[0]);

  return (
    <Shell>
      
      <ToolSeo path="/dividend" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dividend Optimiser</h1>
        <p className="mt-2 text-muted-foreground">Director salary + dividends. 2026/27 dividend rates: 8.75% / 33.75% / 39.35%. Allowance £500.</p>
        <div className="mt-4">
          <ShareSummary summary={`Dividend Optimiser — see my UK calculation for the 2026/27 tax year`} title="Dividend Optimiser | UK Net Pay" compact />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">Director salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.salary === 0 ? "" : s.salary} onChange={(e) => set({ salary: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div>
            <Label className="text-sm">Dividends drawn</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
              <Input type="number" value={s.dividends === 0 ? "" : s.dividends} onChange={(e) => set({ dividends: Number(e.target.value) || 0 })} className="pl-7 font-mono-num text-lg h-11" />
            </div>
          </div>
          <div className="border border-border rounded-md p-4 bg-secondary/40">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Optimal split for {fmt(total)} total</div>
            <div className="space-y-2">
              {splits.map((opt) => {
                const isBest = opt === best;
                return (
                  <button
                    key={opt.salary}
                    onClick={() => set({ salary: opt.salary, dividends: opt.dividends })}
                    className={`w-full text-left flex justify-between items-center text-sm py-1.5 px-2 rounded ${isBest ? "bg-foreground/5 font-medium" : "hover:bg-foreground/5"}`}
                  >
                    <span className="font-mono-num">{fmt(opt.salary)} sal + {fmt(opt.dividends)} div</span>
                    <span className="font-mono-num">{fmt(opt.result.net)} {isBest && <span className="ml-1 text-xs text-accent">★</span>}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Net take-home</div>
          <div className="font-mono-num text-3xl font-semibold mt-1">{fmt(r.net)}</div>
          <div className="text-sm text-muted-foreground">Effective rate {r.effectiveRate.toFixed(1)}%</div>
          <div className="mt-6 space-y-2">
            <Row label="Total extracted" v={fmt2(r.total)} />
            <Row label="Personal allowance" v={fmt2(r.personalAllowance)} />
            <Row label="Salary income tax" v={fmt2(r.salaryTax)} />
            <Row label="NI on salary" v={fmt2(r.ni)} />
            <Row label="Dividend allowance used" v={fmt2(r.dividendAllowance)} />
            <Row label="Dividend tax" v={fmt2(r.dividendTax)} />
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={() => downloadToolPdf({
                title: "Dividend Optimiser",
                subtitle: `Tax year 2026/27 | Salary: GBP ${s.salary.toLocaleString()} | Dividends: GBP ${s.dividends.toLocaleString()}`,
                rows: [
                  { label: "Total extracted", value: r.total },
                  { label: "Director salary", value: s.salary },
                  { label: "Dividends drawn", value: s.dividends },
                  { label: "Personal allowance", value: r.personalAllowance },
                  { label: "Salary income tax", value: r.salaryTax, negative: true },
                  { label: "NI on salary", value: r.ni, negative: true },
                  { label: "Dividend tax", value: r.dividendTax, negative: true },
                  { label: "---", value: "" },
                  { label: "Net take-home", value: r.net, bold: true },
                  { label: "Effective rate", value: `${r.effectiveRate.toFixed(1)}%`, bold: true },
                ],
                filename: `uknetpay-dividend-${Math.round(r.total)}.pdf`,
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

export default Dividend;