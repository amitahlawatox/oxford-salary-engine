import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { fmt } from "@/lib/format";
import type { CalcResult } from "@/lib/tax/engine";

type Props = { current: CalcResult; previous: CalcResult; previousLabel: string };

export function YoYDelta({ current, previous, previousLabel }: Props) {
  const diffNet = current.net - previous.net;
  const diffTax = (current.incomeTax + current.ni + current.studentLoan) - (previous.incomeTax + previous.ni + previous.studentLoan);
  const direction = diffNet > 0.5 ? "up" : diffNet < -0.5 ? "down" : "flat";
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  const tone =
    direction === "up" ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
    : direction === "down" ? "text-rose-600 dark:text-rose-400 bg-rose-500/10"
    : "text-muted-foreground bg-secondary";

  return (
    <div className="border border-border rounded-lg p-5 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
          vs <span className="text-foreground">{previousLabel}</span>
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold ${tone}`}>
          <Icon className="h-3 w-3" />
          {direction === "flat" ? "No change" : `${diffNet > 0 ? "+" : ""}${fmt(diffNet)}/yr`}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <Cell label={`${previousLabel} net`} value={fmt(previous.net)} muted />
        <Cell label="Net change" value={`${diffNet >= 0 ? "+" : ""}${fmt(diffNet)}`} accent={direction !== "flat"} />
        <Cell label="Tax + NI Δ" value={`${diffTax >= 0 ? "+" : ""}${fmt(diffTax)}`} muted />
      </div>
    </div>
  );
}

const Cell = ({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) => (
  <div>
    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className={`mt-1 font-mono tabular ${accent ? "text-lg font-semibold" : muted ? "text-base text-muted-foreground" : "text-base"}`}>{value}</div>
  </div>
);
