import { useState } from "react";
import { Check, Copy, Link2, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Props = {
  summary: string;
  title?: string;
  url?: string;
  compact?: boolean;
};

export function ShareSummary({
  summary,
  title = "My UK take-home calculation",
  url,
  compact,
}: Props) {
  const [copied, setCopied] = useState<"link" | "text" | null>(null);

  const shareUrl =
    url ??
    (typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "");
  const shareText = `${summary}\n\nCalculate yours -> ${shareUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied("link");
      toast({ title: "Link copied", description: "Share this exact calculation with anyone." });
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied("text");
      toast({ title: "Summary copied", description: "Paste it into a chat, email or doc." });
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const shareNative = async () => {
    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({ title, text: summary, url: shareUrl });
        return;
      } catch {
        // User cancelled; fall back to copy.
      }
    }
    await copyText();
  };

  if (compact) {
    return (
      <button
        onClick={shareNative}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border text-sm hover:bg-secondary transition"
        aria-label="Share calculation"
      >
        <Share2 className="h-3.5 w-3.5" /> Share
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={shareNative}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
      >
        <Share2 className="h-3.5 w-3.5" /> Share
      </button>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border text-sm hover:bg-secondary transition"
      >
        {copied === "link" ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        Copy link
      </button>
      <button
        onClick={copyText}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border text-sm hover:bg-secondary transition"
      >
        {copied === "text" ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        Copy summary
      </button>
    </div>
  );
}
