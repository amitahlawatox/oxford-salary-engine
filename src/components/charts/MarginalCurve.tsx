import { Area, AreaChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { calculate, type CalcInput } from "@/lib/tax/engine";
import { fmt } from "@/lib/format";

export function MarginalCurve({ input }: { input: CalcInput }) {
  const points: { gross: number; net: number; rate: number }[] = [];
  for (let g = 0; g <= 200_000; g += 2_500) {
    const r = calculate({ ...input, gross: g });
    points.push({ gross: g, net: r.net, rate: Math.round(r.marginalRate) });
  }
  const here = calculate(input);
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={points} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="netfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.45} />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="gross" tickFormatter={(v) => fmt(v)} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tickFormatter={(v) => fmt(v)} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={70} />
        <Tooltip
          formatter={(v: number, name) => (name === "net" ? [fmt(v), "Take-home"] : [v, name])}
          labelFormatter={(g: number) => `Gross ${fmt(g)}`}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 6,
            fontSize: 12,
          }}
        />
        <Area type="monotone" dataKey="net" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#netfill)" />
        <ReferenceDot x={input.gross} y={here.net} r={5} fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}