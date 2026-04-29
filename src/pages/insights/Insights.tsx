import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Search } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { AdSlot } from "@/components/ads/AdSlot";
import { ARTICLES } from "@/content/articles";
import type { ArticleCategory } from "@/content/articles";

const SITE = "https://uknetpay.co.uk";
const CATEGORIES: ("All" | ArticleCategory)[] = [
  "All", "Tax", "Scotland", "Student Loans", "Pension", "Self-Employed", "Career", "Cost of Living",
];

const Insights = () => {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      if (cat !== "All" && a.category !== cat) return false;
      if (q && !(a.title + a.description + a.keywords.join(" ")).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UK Net Pay — Insights",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/insights/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <Shell>
      <Seo
        title="UK Tax & Salary Insights — 2026/27 Guides"
        description="Plain-English UK tax, pension, student loan and salary guides for the 2026/27 tax year. Updated weekly."
        path="/insights"
        jsonLd={jsonLd}
      />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/60 backdrop-blur text-xs font-medium mb-5">
            <BookOpen className="h-3 w-3 text-accent" /> Insights · {ARTICLES.length} guides
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.05]">
            Plain-English <span className="text-aurora font-semibold">UK tax</span> guides.
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
            Everything you need to understand your payslip in 2026/27 — written by people who actually run the numbers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`h-8 px-3 rounded-full text-xs font-medium border transition-colors ${
                  cat === c ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search insights…"
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              to={`/insights/${a.slug}`}
              className="group flex flex-col border border-border rounded-2xl p-5 bg-card hover:border-accent/50 hover:shadow-card transition-all"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">{a.category}</div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
              <div className="mt-auto pt-4 flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.readMinutes} min</span>
                <span>·</span>
                <span>{new Date(a.publishedISO).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">No insights match — try another category.</div>
        )}

        <div className="mt-12 flex justify-center">
          <AdSlot size="leaderboard" />
        </div>
      </section>
    </Shell>
  );
};

export default Insights;
