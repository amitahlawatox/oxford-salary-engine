import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";

const KEY = "ukn-consent-v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  ts: number;
};

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch { return null; }
}

function write(c: Consent) {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ }
  type DLWindow = Window & { dataLayer?: unknown[] };
  const w = window as DLWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "consent_update",
    ad_storage: c.advertising ? "granted" : "denied",
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_user_data: c.advertising ? "granted" : "denied",
    ad_personalization: c.advertising ? "granted" : "denied",
  });
  window.dispatchEvent(new CustomEvent("ukn:consent", { detail: c }));
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    if (!read()) setOpen(true);
    const onOpen = () => { setDetails(true); setOpen(true); };
    window.addEventListener("ukn:open-consent", onOpen);
    return () => window.removeEventListener("ukn:open-consent", onOpen);
  }, []);

  if (!open) return null;

  const save = (c: Omit<Consent, "necessary" | "ts">) => {
    write({ necessary: true, ts: Date.now(), ...c });
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 z-[60] sm:max-w-md">
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-lg bg-aurora flex items-center justify-center shrink-0">
            <Cookie className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm tracking-tight">Your privacy choices</h3>
              <button onClick={() => save({ analytics: false, advertising: false })} aria-label="Close" className="text-muted-foreground hover:text-foreground -mr-1 -mt-1">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              We use necessary cookies to make the site work. With your consent we'd also use cookies for
              <strong className="text-foreground"> analytics</strong> and
              <strong className="text-foreground"> personalised ads</strong> (Google AdSense, TCF v2 framework).
              Calculation data stays in your browser.{" "}
              <a href="/privacy" className="underline hover:text-foreground">Privacy&nbsp;Policy</a>.
            </p>

            {details && (
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                <Toggle label="Strictly necessary" desc="Required — site theme, consent state." checked disabled />
                <Toggle label="Analytics" desc="Anonymous, aggregated traffic measurement." checked={analytics} onChange={setAnalytics} />
                <Toggle label="Advertising" desc="Google AdSense personalised ads." checked={advertising} onChange={setAdvertising} />
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => save({ analytics: true, advertising: true })} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition">
                <ShieldCheck className="h-3.5 w-3.5" /> Accept all
              </button>
              <button onClick={() => save({ analytics: false, advertising: false })} className="h-9 px-3 rounded-lg border border-border text-xs font-semibold hover:bg-secondary transition">
                Reject non-essential
              </button>
              {!details ? (
                <button onClick={() => setDetails(true)} className="h-9 px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition">
                  Customise
                </button>
              ) : (
                <button onClick={() => save({ analytics, advertising })} className="h-9 px-3 rounded-lg border border-border text-xs font-semibold hover:bg-secondary transition">
                  Save choices
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, desc, checked, disabled, onChange }: {
  label: string; desc: string; checked: boolean; disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className={`flex items-start gap-3 ${disabled ? "opacity-70" : "cursor-pointer"}`}>
      <span className="relative inline-flex shrink-0 mt-0.5">
        <input type="checkbox" className="sr-only peer" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
        <span className="w-9 h-5 rounded-full bg-secondary peer-checked:bg-foreground transition-colors" />
        <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-background shadow transition-transform peer-checked:translate-x-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold">{label}</span>
        <span className="block text-[11px] text-muted-foreground leading-snug">{desc}</span>
      </span>
    </label>
  );
}

export function openConsent() {
  window.dispatchEvent(new CustomEvent("ukn:open-consent"));
}
