import { ReactNode } from "react";

/** Tailwind-only typography wrapper — no @tailwindcss/typography dependency.
 *  Use semantic tokens for colour. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-none text-foreground/90
        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24
        [&_p]:text-[15px] [&_p]:leading-7 [&_p]:my-4 [&_p]:text-foreground/85
        [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-1.5
        [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-1.5
        [&_li]:text-[15px] [&_li]:leading-7 [&_li]:text-foreground/85
        [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80
        [&_strong]:text-foreground [&_strong]:font-semibold
        [&_code]:font-mono [&_code]:text-[13px] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-secondary
        [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-muted-foreground [&_blockquote]:italic
        [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_table]:border-collapse
        [&_th]:text-left [&_th]:font-semibold [&_th]:py-2 [&_th]:px-3 [&_th]:border-b [&_th]:border-border [&_th]:text-foreground
        [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-border [&_td]:text-foreground/85 [&_td]:font-mono [&_td]:tabular-nums
        [&_td:first-child]:font-sans [&_td:first-child]:text-foreground
      "
    >
      {children}
    </div>
  );
}
