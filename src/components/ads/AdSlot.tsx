/**
 * AdSense-ready placeholder. Reserves fixed dimensions to prevent CLS.
 * Drop a real <ins class="adsbygoogle" .../> here once approved.
 */
type Size = "leaderboard" | "mpu" | "mobile-banner" | "skyscraper";

const DIMS: Record<Size, { w: number; h: number; label: string }> = {
  leaderboard: { w: 728, h: 90, label: "728 × 90" },
  mpu: { w: 300, h: 250, label: "300 × 250" },
  "mobile-banner": { w: 320, h: 100, label: "320 × 100" },
  skyscraper: { w: 160, h: 600, label: "160 × 600" },
};

export function AdSlot({ size = "leaderboard", className = "" }: { size?: Size; className?: string }) {
  const { w, h, label } = DIMS[size];
  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-border bg-surface/50 ${className}`}
      style={{ width: "100%", maxWidth: w, height: h }}
      aria-label="Advertisement"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
        Sponsor · {label}
      </span>
    </div>
  );
}