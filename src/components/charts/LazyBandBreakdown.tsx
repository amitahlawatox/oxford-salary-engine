import { lazy, Suspense } from "react";
import type { CalcResult } from "@/lib/tax/engine";

const BandBreakdownInner = lazy(() =>
  import("./BandBreakdown").then((m) => ({ default: m.BandBreakdown }))
);

export function LazyBandBreakdown({ result }: { result: CalcResult }) {
  return (
    <Suspense fallback={<div className="h-[220px] rounded-lg bg-secondary/40 animate-pulse" />}>
      <BandBreakdownInner result={result} />
    </Suspense>
  );
}
