/**
 * Post-build script: generates route-specific index.html files for each salary
 * page so that crawlers (Googlebot, Bingbot) see correct meta tags, canonical
 * URLs, and FAQ schema without needing to execute JavaScript.
 *
 * Run with: npx vite-node scripts/prerender.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { calculate } from "@/lib/tax/engine";
import { ALL_SITEMAP_SALARIES } from "@/lib/salaryConstants";

const DIST = path.resolve(process.cwd(), "dist");
const SITE = "https://www.uknetpay.co.uk";

const template = readFileSync(path.join(DIST, "index.html"), "utf-8");

function fmtGBP(n: number): string {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let count = 0;

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
  const canonical = `${SITE}/salary/${gross}-after-tax`;

  const title = `${label} After Tax UK 2026/27 — Take Home ${fmtGBP(net)}/yr | UK Net Pay`;
  const desc = `On a ${label} salary in 2026/27, you take home ${fmtGBP(net)} per year (${fmtGBP(monthly)}/mo). Full breakdown: Income Tax ${fmtGBP(result.incomeTax)}, NI ${fmtGBP(result.ni)}. Compare England vs Scotland instantly.`;

  const annualDiff = result.net - scotResult.net;
  const totalDeductions = Math.round(result.incomeTax + result.ni + result.studentLoan);
  const effectiveRate = result.effectiveRate.toFixed(1);

  const faqSchema = {
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
          text: annualDiff > 0
            ? `On ${label}, you take home approximately ${fmtGBP(Math.abs(annualDiff))} more per year in England compared to Scotland.`
            : annualDiff < 0
              ? `On ${label}, you take home approximately ${fmtGBP(Math.abs(annualDiff))} more per year in Scotland compared to England.`
              : `At ${label}, take-home pay is nearly identical in both England and Scotland.`,
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description: desc,
  };

  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(desc)}" />`,
  );

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(desc)}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(desc)}" />`,
  );

  const schemaScripts =
    `<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>\n` +
    `    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;

  html = html.replace("</head>", `    ${schemaScripts}\n  </head>`);

  const dir = path.join(DIST, "salary", `${gross}-after-tax`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  count++;
}

console.log(`Prerendered ${count} salary pages with route-specific meta tags`);
