/**
 * Post-build script: generates route-specific index.html files for every
 * indexable route so crawlers (Googlebot, Bingbot) see correct meta tags,
 * canonical URLs, Open Graph data, and JSON-LD without executing JavaScript.
 *
 * Coverage:
 *   - 12 tool pages         (/take-home, /hourly, ...)
 *   - 25 insight articles   (/insights/{slug})
 *   -  9 static pages       (/about, /contact, /privacy, /terms,
 *                            /disclaimer, /methodology, /oxford-methodology,
 *                            /directory, /insights)
 *   - 106 salary pages      (/salary/{amount}-after-tax)
 *
 * Run with: npx vite-node scripts/prerender.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { calculate } from "@/lib/tax/engine";
import { ALL_SITEMAP_SALARIES } from "@/lib/salaryConstants";
import { TOOL_META, buildToolJsonLd } from "@/lib/seoMeta";
import { ARTICLES } from "@/content/articles";

const DIST = path.resolve(process.cwd(), "dist");
const SITE = "https://www.uknetpay.co.uk";

const template = readFileSync(path.join(DIST, "index.html"), "utf-8");

function fmtGBP(n: number): string {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type JsonLd = Record<string, unknown>;

interface RouteMeta {
  /** URL path, e.g. "/take-home" or "/" */
  route: string;
  title: string;
  description: string;
  jsonLd?: JsonLd[];
  /** Override og:type (default "website"). Articles use "article". */
  ogType?: string;
}

function applyMeta(html: string, meta: RouteMeta): string {
  const canonical = meta.route === "/" ? `${SITE}/` : `${SITE}${meta.route}`;
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${desc}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${desc}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  if (meta.ogType) {
    out = out.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${meta.ogType}" />`,
    );
  }
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${desc}" />`,
  );

  if (meta.jsonLd?.length) {
    const block = meta.jsonLd
      .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
      .join("\n    ");
    out = out.replace("</head>", `    ${block}\n  </head>`);
  }

  return out;
}

function writeRoute(route: string, html: string): void {
  // Home gets written back to dist/index.html (already exists from Vite build).
  const dir =
    route === "/"
      ? DIST
      : path.join(DIST, ...route.split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
}

// ---------------------------------------------------------------------------
// 1. Homepage — enrich with Organization + WebSite SearchAction schema.
// ---------------------------------------------------------------------------
const homeJsonLd: JsonLd[] = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UK Net Pay",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/insights?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UK Net Pay",
    url: SITE,
    logo: `${SITE}/favicon.png`,
  },
];

writeRoute(
  "/",
  applyMeta(template, {
    route: "/",
    title: "UK Salary Calculator 2026/27 - Take-Home Pay After Tax | UK Net Pay",
    description:
      "Free UK salary and tax calculator for the 2026/27 tax year. See take-home pay after Income Tax, NI, Student Loan, pension, and dividends.",
    jsonLd: homeJsonLd,
  }),
);

// ---------------------------------------------------------------------------
// 2. Tool pages — drive titles/descriptions from src/lib/seoMeta.ts.
// ---------------------------------------------------------------------------
let toolCount = 0;
for (const meta of Object.values(TOOL_META)) {
  const fullTitle = meta.title.includes("UK Net Pay")
    ? meta.title
    : `${meta.title} | UK Net Pay`;
  const html = applyMeta(template, {
    route: meta.path,
    title: fullTitle,
    description: meta.description,
    jsonLd: buildToolJsonLd(meta) as JsonLd[],
  });
  writeRoute(meta.path, html);
  toolCount++;
}

// ---------------------------------------------------------------------------
// 3. Insight articles — Article + BreadcrumbList + optional FAQPage schema.
// ---------------------------------------------------------------------------
let articleCount = 0;
for (const article of ARTICLES) {
  const route = `/insights/${article.slug}`;
  const url = `${SITE}${route}`;
  const fullTitle = article.title.includes("UK Net Pay")
    ? article.title
    : `${article.title} | UK Net Pay`;

  const jsonLd: JsonLd[] = [
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

  const html = applyMeta(template, {
    route,
    title: fullTitle,
    description: article.description,
    jsonLd,
    ogType: "article",
  });
  writeRoute(route, html);
  articleCount++;
}

// ---------------------------------------------------------------------------
// 4. Other static pages — proper meta + lightweight schema for indexability.
// ---------------------------------------------------------------------------
interface StaticPage {
  route: string;
  title: string;
  description: string;
  schemaType?: string;
}

const STATIC_PAGES: StaticPage[] = [
  {
    route: "/insights",
    title: "UK Tax & Salary Insights 2026/27 — Guides | UK Net Pay",
    description:
      "Plain-English guides on UK take-home pay, Income Tax, NI, student loans, pensions and self-employed tax for 2026/27.",
    schemaType: "CollectionPage",
  },
  {
    route: "/directory",
    title: "All UK Salary Tools — Directory | UK Net Pay",
    description:
      "Browse every UK Net Pay calculator: take-home, hourly, IR35, dividend, self-employed, maternity, two jobs and more for 2026/27.",
    schemaType: "CollectionPage",
  },
  {
    route: "/about",
    title: "About UK Net Pay — Privacy-First UK Salary Calculator",
    description:
      "UK Net Pay is a free, privacy-first salary calculator for the 2026/27 UK tax year. Learn who we are and why we built it.",
    schemaType: "AboutPage",
  },
  {
    route: "/contact",
    title: "Contact UK Net Pay",
    description:
      "Questions, feedback or partnership ideas for UK Net Pay? Get in touch with the team behind the UK's privacy-first salary calculator.",
    schemaType: "ContactPage",
  },
  {
    route: "/oxford-methodology",
    title: "UK Net Pay Methodology — How We Calculate 2026/27 Take-Home",
    description:
      "Read the full methodology behind UK Net Pay: 2026/27 tax bands, NI rates, student loan thresholds, and pension treatment.",
    schemaType: "WebPage",
  },
  {
    route: "/methodology",
    title: "UK Net Pay Methodology — How We Calculate 2026/27 Take-Home",
    description:
      "Read the full methodology behind UK Net Pay: 2026/27 tax bands, NI rates, student loan thresholds, and pension treatment.",
    schemaType: "WebPage",
  },
  {
    route: "/privacy",
    title: "Privacy Policy — UK Net Pay",
    description:
      "How UK Net Pay handles your data: calculations stay in your browser, no accounts, and full control over analytics and advertising cookies.",
    schemaType: "WebPage",
  },
  {
    route: "/terms",
    title: "Terms of Use — UK Net Pay",
    description:
      "Terms governing use of UK Net Pay calculators and content. Information is provided for guidance only and is not financial advice.",
    schemaType: "WebPage",
  },
  {
    route: "/disclaimer",
    title: "Disclaimer — UK Net Pay",
    description:
      "UK Net Pay calculators are provided for information only and are not a substitute for personalised tax or financial advice.",
    schemaType: "WebPage",
  },
];

let staticCount = 0;
for (const page of STATIC_PAGES) {
  const url = `${SITE}${page.route}`;
  const jsonLd: JsonLd[] = [
    {
      "@context": "https://schema.org",
      "@type": page.schemaType ?? "WebPage",
      name: page.title,
      url,
      description: page.description,
    },
  ];
  const html = applyMeta(template, {
    route: page.route,
    title: page.title,
    description: page.description,
    jsonLd,
  });
  writeRoute(page.route, html);
  staticCount++;
}

// ---------------------------------------------------------------------------
// 5. Programmatic salary pages (existing behaviour, untouched).
// ---------------------------------------------------------------------------
let salaryCount = 0;
for (const gross of ALL_SITEMAP_SALARIES) {
  const result = calculate({
    gross,
    region: "england",
    pensionPct: 0,
    pensionMode: "personal",
    studentLoan: "none",
    bonus: 0,
    overtime: 0,
  });

  const scotResult = calculate({
    gross,
    region: "scotland",
    pensionPct: 0,
    pensionMode: "personal",
    studentLoan: "none",
    bonus: 0,
    overtime: 0,
  });

  const net = Math.round(result.net);
  const monthly = Math.round(result.net / 12);
  const label = `£${gross.toLocaleString("en-GB")}`;
  const route = `/salary/${gross}-after-tax`;
  const canonical = `${SITE}${route}`;

  const title = `${label} After Tax UK 2026/27 — Take Home ${fmtGBP(net)}/yr | UK Net Pay`;
  const desc = `On a ${label} salary in 2026/27, you take home ${fmtGBP(net)} per year (${fmtGBP(monthly)}/mo). Full breakdown: Income Tax ${fmtGBP(result.incomeTax)}, NI ${fmtGBP(result.ni)}. Compare England vs Scotland instantly.`;

  const annualDiff = result.net - scotResult.net;
  const totalDeductions = Math.round(result.incomeTax + result.ni + result.studentLoan);
  const effectiveRate = result.effectiveRate.toFixed(1);

  const faqSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the take-home pay on a ${label} salary in 2026/27?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On a gross salary of ${label} in the 2026/27 tax year, you take home approximately ${fmtGBP(result.net)} per year in England, Wales and Northern Ireland. That works out to about ${fmtGBP(result.net / 12)} per month.`,
        },
      },
      {
        "@type": "Question",
        name: `How much Income Tax and National Insurance do I pay on ${label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `On ${label} in 2026/27, you pay approximately ${fmtGBP(result.incomeTax)} in Income Tax and ${fmtGBP(result.ni)} in National Insurance. Total deductions are ${fmtGBP(totalDeductions)}, giving an effective tax rate of ${effectiveRate}%.`,
        },
      },
      {
        "@type": "Question",
        name: `What is ${label} per month after tax?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${label} salary gives you approximately ${fmtGBP(result.net / 12)} per month after tax in England, Wales and NI, or ${fmtGBP(scotResult.net / 12)} in Scotland.`,
        },
      },
      {
        "@type": "Question",
        name: `How does a ${label} salary compare between England and Scotland?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            annualDiff > 0
              ? `On ${label}, you take home approximately ${fmtGBP(Math.abs(annualDiff))} more per year in England compared to Scotland.`
              : annualDiff < 0
                ? `On ${label}, you take home approximately ${fmtGBP(Math.abs(annualDiff))} more per year in Scotland compared to England.`
                : `At ${label}, take-home pay is nearly identical in both England and Scotland.`,
        },
      },
    ],
  };

  const webPageSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description: desc,
  };

  const html = applyMeta(template, {
    route,
    title,
    description: desc,
    jsonLd: [webPageSchema, faqSchema],
  });
  writeRoute(route, html);
  salaryCount++;
}

console.log(
  `Prerendered routes: 1 home + ${toolCount} tools + ${articleCount} insights + ${staticCount} static + ${salaryCount} salary = ${1 + toolCount + articleCount + staticCount + salaryCount}`,
);
