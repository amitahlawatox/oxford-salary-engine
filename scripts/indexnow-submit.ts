/**
 * Submits all sitemap URLs to search engines via the IndexNow protocol.
 *
 * Supported engines: Bing, Yandex, Seznam, Naver.
 * Run with: npx vite-node scripts/indexnow-submit.ts
 */
import { ALL_SITEMAP_SALARIES } from "@/lib/salaryConstants";

const SITE = "https://www.uknetpay.co.uk";
const API_KEY = "2cb417ca645de7ca35a9391113e36220";
const KEY_LOCATION = `${SITE}/${API_KEY}.txt`;

const ENGINES = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

function buildUrlList(): string[] {
  const urls: string[] = [];

  // Static pages
  const staticPaths = [
    "/",
    "/take-home",
    "/oxford-methodology",
    "/hourly",
    "/reverse",
    "/compare",
    "/employer",
    "/contractor",
    "/self-employed",
    "/dividend",
    "/ir35",
    "/student-loan",
    "/benefits",
    "/directory",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
    "/accessibility",
  ];

  for (const p of staticPaths) {
    urls.push(`${SITE}${p}`);
  }

  // Salary pages
  for (const gross of ALL_SITEMAP_SALARIES) {
    urls.push(`${SITE}/salary/${gross}-after-tax`);
  }

  // Insight articles (must match actual slugs in src/content/articles/data.tsx)
  const insights = [
    "salary-calculator-uk-2026",
    "scotland-vs-england-tax-2026",
    "scottish-tax-hike-2026-explained",
    "student-loan-plan-5-calculator",
    "emergency-tax-code-1257l-explained",
    "net-pay-on-50k-salary",
    "salary-sacrifice-pension-explained",
    "self-employed-tax-calculator-2026",
    "ir35-inside-vs-outside-2026",
    "limited-company-dividend-strategy-2026",
    "two-jobs-tax-uk-2026",
    "pay-rise-after-tax-calculator-uk",
    "national-insurance-2026-explained",
    "personal-allowance-taper-100k-trap",
    "uk-cost-of-living-salary-comparison",
    "minimum-wage-uk-2026",
    "average-salary-uk-2026",
    "marriage-allowance-uk-2026",
    "pension-auto-enrolment-2026",
    "how-paye-works-uk",
    "tax-refund-uk-guide",
    "employer-ni-guide-2026",
    "working-from-home-tax-relief-uk",
    "tax-free-childcare-uk-2026",
    "uk-tax-bands-explained-2026",
  ];

  for (const slug of insights) {
    urls.push(`${SITE}/insights/${slug}`);
  }

  return urls;
}

async function submitBatch(engine: string, urls: string[]): Promise<void> {
  const body = JSON.stringify({
    host: "www.uknetpay.co.uk",
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });

  try {
    const res = await fetch(engine, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });

    const status = res.status;
    if (status === 200 || status === 202) {
      console.log(`  ${engine} — ${status} OK (${urls.length} URLs accepted)`);
    } else {
      const text = await res.text().catch(() => "");
      console.warn(`  ${engine} — ${status} ${text.slice(0, 200)}`);
    }
  } catch (err) {
    console.error(`  ${engine} — error: ${(err as Error).message}`);
  }
}

async function main() {
  const urls = buildUrlList();
  console.log(`IndexNow: submitting ${urls.length} URLs to ${ENGINES.length} engines...\n`);

  for (const engine of ENGINES) {
    await submitBatch(engine, urls);
  }

  console.log("\nDone. Search engines will process URLs within minutes to hours.");
}

main();
