import { useEffect, useRef, useState } from "react";

type Size = "leaderboard" | "mpu" | "mobile-banner" | "skyscraper";

const MIN_H: Record<Size, number> = {
  leaderboard: 90,
  mpu: 250,
  "mobile-banner": 100,
  skyscraper: 600,
};

const CONSENT_KEY = "ukn-consent-v1";

function hasAdConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const c = JSON.parse(raw) as { advertising?: boolean };
    return c.advertising === true;
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({
  size = "leaderboard",
  slot = "6647333230",
  className = "",
}: {
  size?: Size;
  slot?: string;
  className?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [consented, setConsented] = useState(hasAdConsent);

  useEffect(() => {
    const check = () => setConsented(hasAdConsent());
    window.addEventListener("ukn:consent", check);
    return () => window.removeEventListener("ukn:consent", check);
  }, []);

  useEffect(() => {
    if (!consented || pushed.current || !ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle not loaded yet — silently skip
    }
  }, [consented]);

  return (
    <div
      className={`mx-auto overflow-hidden ${className}`}
      style={{ minHeight: MIN_H[size], textAlign: "center" }}
      aria-label="Advertisement"
    >
      {consented ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6080607990825814"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-lg border border-dashed border-border bg-surface/50"
          style={{ minHeight: MIN_H[size] }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
            Sponsor
          </span>
        </div>
      )}
    </div>
  );
}
