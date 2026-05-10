/**
 * Generate public/sitemap.xml from the live route inventory.
 *
 * Source of truth:
 *   - ARTICLES                (src/content/articles/data.tsx)
 *   - TOOL_META               (src/lib/seoMeta.ts)
 *   - ALL_SITEMAP_SALARIES    (src/lib/salaryConstants.ts)
 *   - STATIC_ROUTES           (defined below)
 *
 * Run with: npx vite-node scripts/generate-sitemap.ts
 *
 * This is run before `vite build` so the generated file in `public/` is
 * copied into `dist/` automatically. Run after editing article data or
 * adding a tool/static page so the sitemap stays aligned with reality.
 */
import { writeFileSync } from "fs";
import path from "path";
import { ALL_SITEMAP_SALARIES } from "@/lib/salaryConstants";
import { TOOL_META } from "@/lib/seoMeta";
import { ARTICLES } from "@/content/articles";

const SITE = "https://uknetpay.co.uk";
const TODAY = new Date().toISOString().slice(0, 10);

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: string;
};

const STATIC_ROUTES: { path: string; priority: string; changefreq: SitemapEntry["changefreq"] }[] = [
  { path: "/insights", priority: "0.85", changefreq: "weekly" },
  { path: "/directory", priority: "0.85", changefreq: "weekly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
  { path: "/methodology", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.4", changefreq: "monthly" },
  { path: "/terms", priority: "0.4", changefreq: "monthly" },
  { path: "/disclaimer", priority: "0.4", changefreq: "monthly" },
];

const entries: SitemapEntry[] = [];

entries.push({
  loc: `${SITE}/`,
  lastmod: TODAY,
  changefreq: "daily",
  priority: "1.0",
});

for (const meta of Object.values(TOOL_META)) {
  entries.push({
    loc: `${SITE}${meta.path}`,
    lastmod: TODAY,
    changefreq: "daily",
    priority: "0.95",
  });
}

for (const article of ARTICLES) {
  entries.push({
    loc: `${SITE}/insights/${article.slug}`,
    lastmod: article.updatedISO,
    changefreq: "weekly",
    priority: "0.8",
  });
}

for (const route of STATIC_ROUTES) {
  entries.push({
    loc: `${SITE}${route.path}`,
    lastmod: TODAY,
    changefreq: route.changefreq,
    priority: route.priority,
  });
}

for (const salary of ALL_SITEMAP_SALARIES) {
  entries.push({
    loc: `${SITE}/salary/${salary}-after-tax`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.6",
  });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const target = path.resolve(process.cwd(), "public", "sitemap.xml");
writeFileSync(target, xml, "utf-8");

const total = entries.length;
const counts = {
  home: 1,
  tools: Object.keys(TOOL_META).length,
  articles: ARTICLES.length,
  static: STATIC_ROUTES.length,
  salary: ALL_SITEMAP_SALARIES.length,
};
console.log(
  `Sitemap written → public/sitemap.xml: ${counts.home} home + ${counts.tools} tools + ${counts.articles} insights + ${counts.static} static + ${counts.salary} salary = ${total} URLs.`,
);
