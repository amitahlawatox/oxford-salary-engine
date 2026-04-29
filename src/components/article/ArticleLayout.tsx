import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Prose } from "./Prose";
import { LeadCTA } from "./LeadCTA";
import type { Article } from "@/content/articles/types";
import { ARTICLES } from "@/content/articles";

const SITE = "https://uknetpay.co.uk";

export function ArticleLayout({ article }: { article: Article }) {
  const url = `${SITE}/insights/${article.slug}`;
  const related = ARTICLES
    .filter((a) => a.slug !== article.slug && a.keywords.some((k) => article.keywords.includes(k)))
    .slice(0, 3);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedISO,
      dateModified: article.updatedISO,
      author: { "@type": "Organization", name: "UK Net Pay" },
      publisher: {
        "@type": "Organization",
        name: "UK Net Pay",
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: article.category,
      keywords: article.keywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UK Net Pay", item: SITE },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  if (article.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <Shell>
      <Seo title={article.title} description={article.description} path={`/insights/${article.slug}`} jsonLd={jsonLd} />

      <div className="mx-auto max-w-3xl px-5 sm:px-6 pt-10 pb-4">
        <Link to="/insights" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="h-3 w-3" /> All insights
        </Link>
      </div>

      <article className="mx-auto max-w-3xl px-5 sm:px-6 pb-12">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
            <span className="px-2 py-0.5 rounded-full border border-accent/40">{article.category}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" />{new Date(article.publishedISO).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" />{article.readMinutes} min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15]">{article.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
        </header>

        <AdSlot size="leaderboard" className="my-6" />

        <Prose>{article.body()}</Prose>

        {article.faq?.length ? (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Frequently asked questions</h2>
            <div className="space-y-5">
              {article.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base font-semibold mb-1.5">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Found this useful?</div>
            <div className="text-sm mt-1">Share with someone who'd benefit.</div>
          </div>
          <ShareSummary summary={`${article.title} — ${article.excerpt}`} title={article.title} />
        </div>

        <LeadCTA variant="mortgage" />

        {related.length > 0 && (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-xl font-semibold tracking-tight mb-5">Related insights</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/insights/${r.slug}`} className="group block border border-border rounded-xl p-4 hover:border-accent/50 hover:bg-secondary/40 transition">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1.5">{r.category}</div>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors">{r.title}</h3>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Clock className="h-3 w-3" />{r.readMinutes} min</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex justify-center">
          <Link to="/take-home" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition">
            Run your own number <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </Shell>
  );
}
