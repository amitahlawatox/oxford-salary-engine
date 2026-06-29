/**
 * Post-build script: generates route-specific index.html files for every
 * indexable route so crawlers (Googlebot, Bingbot) see correct meta tags,
 * canonical URLs, Open Graph data, and JSON-LD without executing JavaScript.
 *
 * Coverage:
 *   - 12 tool pages         (/take-home, /hourly, ...)
 *   - 67 insight articles   (/insights/{slug})
 *   -  9 static pages       (/about, /contact, /privacy, /terms,
 *                            /disclaimer, /methodology, /oxford-methodology,
 *                            /directory, /insights)
 *   - 581 salary pages      (/salary/{amount}-after-tax, £10k-£300k in £500 steps)
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
const SITE = "https://uknetpay.co.uk";

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
  /** Server-rendered HTML injected into #root so crawlers see an H1 + content
   *  before JavaScript runs. React hydrates over this on the client. */
  injectContent?: string;
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

  // Inject server-rendered content into #root so crawlers get an H1 + readable
  // content without executing JS. React replaces this on hydration.
  if (meta.injectContent) {
    out = out.replace(
      '<div id="root"></div>',
      `<div id="root">${meta.injectContent}</div>`,
    );
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
    injectContent:
      `<main>` +
      `<h1>UK Salary Calculator 2026/27</h1>` +
      `<p>Free UK take-home pay calculator for 2026/27. See exactly what you keep after Income Tax, National Insurance, Student Loan, and pension contributions. No sign-up required.</p>` +
      `<nav aria-label="Calculator tools">` +
      `<h2>Salary and tax calculators</h2>` +
      `<ul>` +
      `<li><a href="/take-home">Take-Home Pay Calculator</a></li>` +
      `<li><a href="/hourly">Hourly Rate Calculator</a></li>` +
      `<li><a href="/reverse">Reverse Salary Calculator</a></li>` +
      `<li><a href="/pay-rise">Pay Rise Calculator</a></li>` +
      `<li><a href="/compare">Compare Two Salaries</a></li>` +
      `<li><a href="/pro-rata">Pro Rata Salary Calculator</a></li>` +
      `<li><a href="/two-jobs">Two Jobs Tax Calculator</a></li>` +
      `<li><a href="/maternity">Maternity Pay Calculator</a></li>` +
      `<li><a href="/self-employed">Self-Employed Tax Calculator</a></li>` +
      `<li><a href="/dividend">Dividend Tax Calculator</a></li>` +
      `<li><a href="/ir35">IR35 Calculator</a></li>` +
      `<li><a href="/cost-of-living">Cost of Living Calculator</a></li>` +
      `<li><a href="/childcare">Childcare Cost Calculator</a></li>` +
      `<li><a href="/salary-sacrifice/electric-car">EV Salary Sacrifice Calculator</a></li>` +
      `<li><a href="/contractor/take-home">Contractor Take-Home Calculator</a></li>` +
      `<li><a href="/nhs">NHS Pay Calculator</a></li>` +
      `<li><a href="/teacher">Teacher Pay Calculator</a></li>` +
      `<li><a href="/umbrella">Umbrella Company Calculator</a></li>` +
      `<li><a href="/day-rate">Day Rate Calculator</a></li>` +
      `<li><a href="/bonus">Bonus Tax Calculator</a></li>` +
      `<li><a href="/overtime">Overtime Pay Calculator</a></li>` +
      `</ul>` +
      `</nav>` +
      `<nav aria-label="Popular salary breakdowns">` +
      `<h2>Popular salary after tax pages</h2>` +
      `<ul>` +
      [20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,
       70000,75000,80000,85000,90000,100000,110000,120000,150000,200000]
        .map(s => `<li><a href="/salary/${s}-after-tax">£${s.toLocaleString("en-GB")} after tax</a></li>`)
        .join("") +
      `</ul>` +
      `</nav>` +
      `<nav aria-label="Salary guides and articles">` +
      `<h2>UK salary guides and tax articles</h2>` +
      `<ul>` +
      `<li><a href="/insights/average-salary-uk-2026">Average UK Salary 2026</a></li>` +
      `<li><a href="/insights/average-salary-london-2026">Average Salary in London 2026</a></li>` +
      `<li><a href="/insights/average-salary-manchester-2026">Average Salary in Manchester 2026</a></li>` +
      `<li><a href="/insights/average-salary-birmingham-2026">Average Salary in Birmingham 2026</a></li>` +
      `<li><a href="/insights/average-salary-edinburgh-2026">Average Salary in Edinburgh 2026</a></li>` +
      `<li><a href="/insights/average-salary-scotland-2026">Average Salary in Scotland 2026</a></li>` +
      `<li><a href="/insights/teacher-salary-uk-2026">Teacher Salary UK 2026</a></li>` +
      `<li><a href="/insights/teacher-pay-scale-2026-27">Teacher Pay Scale 2026-27</a></li>` +
      `<li><a href="/insights/nurse-salary-uk-2026">NHS Nurse Salary UK 2026</a></li>` +
      `<li><a href="/insights/nhs-pay-bands-2026-27">NHS Pay Bands 2026-27</a></li>` +
      `<li><a href="/insights/income-tax-bands-2026-27">Income Tax Bands 2026-27</a></li>` +
      `<li><a href="/insights/employer-ni-guide-2026">Employer NI Guide 2026</a></li>` +
      `<li><a href="/insights/what-is-a-good-salary-uk-2026">What Is a Good Salary in the UK?</a></li>` +
      `<li><a href="/insights/gp-doctor-salary-uk-2026">GP Doctor Salary UK 2026</a></li>` +
      `<li><a href="/insights/software-engineer-salary-uk-2026">Software Engineer Salary UK 2026</a></li>` +
      `<li><a href="/insights">All UK salary and tax guides</a></li>` +
      `</ul>` +
      `</nav>` +
      `</main>`,
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
    injectContent:
      `<main>` +
      `<h1>${escapeHtml(meta.h1 || meta.title)}</h1>` +
      `<p>${escapeHtml(meta.description)}</p>` +
      (meta.faq?.length
        ? `<section><h2>Frequently asked questions</h2>` +
          meta.faq
            .map(
              (f) =>
                `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`,
            )
            .join("") +
          `</section>`
        : "") +
      `</main>`,
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

  // Teacher pay articles get extra static pay-table content for Googlebot
  const teacherStaticTable = (article.slug === "teacher-salary-uk-2026" || article.slug === "teacher-pay-scale-2026-27")
    ? `<section>` +
      `<h2>Teacher pay scale 2026/27 — full table (England, outside London)</h2>` +
      `<table><thead><tr><th>Scale point</th><th>Gross salary</th><th>Monthly take-home</th><th>Inner London gross</th></tr></thead>` +
      `<tbody>` +
      `<tr><td>M1 (NQT)</td><td>£31,650</td><td>£2,212/month</td><td>£42,637</td></tr>` +
      `<tr><td>M2</td><td>£33,483</td><td>£2,330/month</td><td>£44,305</td></tr>` +
      `<tr><td>M3</td><td>£35,674</td><td>£2,473/month</td><td>£46,235</td></tr>` +
      `<tr><td>M4</td><td>£37,935</td><td>£2,630/month</td><td>£48,235</td></tr>` +
      `<tr><td>M5</td><td>£40,625</td><td>£2,804/month</td><td>£50,471</td></tr>` +
      `<tr><td>M6</td><td>£43,685</td><td>£2,987/month</td><td>£53,482</td></tr>` +
      `<tr><td>U1 (Upper Pay Range)</td><td>£46,525</td><td>£3,130/month</td><td>£57,959</td></tr>` +
      `<tr><td>U2</td><td>£48,389</td><td>£3,238/month</td><td>£59,965</td></tr>` +
      `<tr><td>U3</td><td>£50,500</td><td>£3,339/month</td><td>£62,138</td></tr>` +
      `</tbody></table>` +
      `<p>Take-home figures are after income tax and NI only (2025/26 thresholds). Teachers also pay TPS pension contributions: 7.4% on salaries up to £32,135, rising to 11.2% above £51,292. ` +
      `The Outer London scale adds approximately £7,000–£8,000 above outside-London rates. The London Fringe adds approximately £1,400–£1,600.</p>` +
      `<h2>Proposed teacher pay for 2026/27</h2>` +
      `<p>As of June 2026, no confirmed 2026/27 teacher pay award has been announced. The DfE has proposed a 6.5% cumulative increase over three years (2026/27 to 2028/29). ` +
      `The first-year uplift (2026/27) may be approximately 1.5–2%, with the larger increases weighted towards later years. ` +
      `The STRB is expected to publish its recommendations before the end of the 2025/26 school year. ` +
      `Any award takes effect from 1 September 2026.</p>` +
      `</section>`
    : "";

  const html = applyMeta(template, {
    route,
    title: fullTitle,
    description: article.description,
    jsonLd,
    ogType: "article",
    injectContent:
      `<main>` +
      `<article>` +
      `<h1>${escapeHtml(article.title)}</h1>` +
      `<p>${escapeHtml(article.excerpt || article.description)}</p>` +
      teacherStaticTable +
      (article.faq?.length
        ? `<section><h2>Frequently asked questions</h2>` +
          article.faq
            .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
            .join("") +
          `</section>`
        : "") +
      `</article>` +
      `</main>`,
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

  // Related salary amounts — 4 nearest values for internal linking
  const idx = ALL_SITEMAP_SALARIES.indexOf(gross);
  const related = [
    ALL_SITEMAP_SALARIES[idx - 2],
    ALL_SITEMAP_SALARIES[idx - 1],
    ALL_SITEMAP_SALARIES[idx + 1],
    ALL_SITEMAP_SALARIES[idx + 2],
  ].filter(Boolean);

  const html = applyMeta(template, {
    route,
    title,
    description: desc,
    jsonLd: [webPageSchema, faqSchema],
    injectContent:
      `<main>` +
      `<h1>${label} After Tax UK 2026/27</h1>` +
      `<p>On a gross salary of ${label} in the 2026/27 tax year, your estimated take-home pay is ` +
      `${fmtGBP(result.net)} per year, which is about ${fmtGBP(result.net / 12)} per month or ` +
      `${fmtGBP(result.net / 52)} per week in England, Wales and Northern Ireland.</p>` +
      `<h2>Tax breakdown on ${label}</h2>` +
      `<ul>` +
      `<li>Gross annual salary: ${label}</li>` +
      `<li>Income Tax: ${fmtGBP(result.incomeTax)} per year</li>` +
      `<li>National Insurance: ${fmtGBP(result.ni)} per year</li>` +
      `<li>Total deductions: ${fmtGBP(totalDeductions)} (${effectiveRate}% effective rate)</li>` +
      `<li>Take-home pay: ${fmtGBP(result.net)} per year</li>` +
      `<li>Monthly take-home: ${fmtGBP(result.net / 12)}</li>` +
      `</ul>` +
      `<h2>${label} after tax in Scotland</h2>` +
      `<p>Under Scottish income tax rates, a ${label} salary gives a take-home of ` +
      `${fmtGBP(scotResult.net)} per year (${fmtGBP(scotResult.net / 12)} per month). ` +
      (annualDiff > 0
        ? `That is ${fmtGBP(Math.abs(annualDiff))} less than in England and Wales.`
        : annualDiff < 0
          ? `That is ${fmtGBP(Math.abs(annualDiff))} more than in England and Wales.`
          : `This is almost identical to England and Wales.`) +
      `</p>` +
      `<p>These figures assume the standard tax code, no pension contributions, and no student loan. ` +
      `Use the <a href="/take-home">take-home pay calculator</a> to add pension, student loan, bonus and other adjustments.</p>` +
      `<nav aria-label="Related salary pages">` +
      `<h2>Related salary breakdowns</h2>` +
      `<ul>` +
      related.map(s => `<li><a href="/salary/${s}-after-tax">£${s.toLocaleString("en-GB")} after tax</a></li>`).join("") +
      `<li><a href="/directory">All salary calculators</a></li>` +
      `</ul>` +
      `</nav>` +
      `</main>`,
  });
  writeRoute(route, html);
  salaryCount++;
}

console.log(
  `Prerendered routes: 1 home + ${toolCount} tools + ${articleCount} insights + ${staticCount} static + ${salaryCount} salary = ${1 + toolCount + articleCount + staticCount + salaryCount}`,
);
