import { lazy, Suspense } from "react";
import type { CalcInput } from "@/lib/tax/engine";

const MarginalCurveInner = lazy(() =>
  import("./MarginalCurve").then((m) => ({ default: m.MarginalCurve }))
);

export function LazyMarginalCurve({ input }: { input: CalcInput }) {
  return (
    <Suspense fallback={<div className="h-[220px] rounded-lg bg-secondary/40 animate-pulse" />}>
      <MarginalCurveInner input={input} />
    </Suspense>
  );
}
