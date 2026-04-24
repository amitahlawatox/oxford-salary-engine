import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CalcResult } from "@/lib/tax/engine";
import { fmt } from "@/lib/format";

const PALETTE = ["#10b981", "#3b82f6", "#6366f1", "#f59e0b", "#ef4444", "#a855f7"];

export function BandBreakdown({ result }: { result: CalcResult }) {
  const data = result.bands.map((b, i) => ({
    name: b.name,
    Tax: Math.round(b.tax),
    color: PALETTE[i % PALETTE.length],
  }));
  if (data.length === 0) {
    return <div className="text-sm text-muted-foreground py-8 text-center">No income tax band reached.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tickFormatter={(v) => fmt(v)} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={70} />
        <Tooltip
          formatter={(v: number) => fmt(v)}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 6,
            fontSize: 12,
          }}
        />
        <Bar dataKey="Tax" radius={[4, 4, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}