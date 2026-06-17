import { lazy, Suspense } from "react";
import type { CalcResult } from "@/lib/tax/engine";

const MarginalCurveInner = lazy(() =>
  import("./MarginalCurve").then((m) => ({ default: m.MarginalCurve }))
);

export function LazyMarginalCurve({ result }: { result: CalcResult }) {
  return (
    <Suspense fallback={<div className="h-[220px] rounded-lg bg-secondary/40 animate-pulse" />}>
      <MarginalCurveInner result={result} />
    </Suspense>
  );
}
