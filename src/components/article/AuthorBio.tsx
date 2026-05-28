import { Shield } from "lucide-react";

interface Props {
  publishedISO: string;
  updatedISO: string;
}

/**
 * Author byline + last-updated shown on every article.
 * Required for Google E-E-A-T scoring on YMYL content.
 */
export function AuthorBio({ publishedISO, updatedISO }: Props) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <div className="not-prose flex items-start gap-3 border-b border-border pb-6 mb-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground font-semibold text-sm select-none">
        AA
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Amit Ahlawat</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Founder, UK Net Pay · Verified against HMRC 2026/27 rates and ONS earnings data.{" "}
          <span className="text-foreground/60">
            Published {fmt(publishedISO)}
            {updatedISO !== publishedISO && ` · Updated ${fmt(updatedISO)}`}
          </span>
        </p>
        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Shield className="h-3 w-3" aria-hidden="true" />
          Figures cross-referenced with{" "}
          <a
            href="https://www.gov.uk/government/collections/hm-revenue-and-customs-receipts"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            HMRC
          </a>{" "}
          and{" "}
          <a
            href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            ONS
          </a>
        </p>
      </div>
    </div>
  );
}
