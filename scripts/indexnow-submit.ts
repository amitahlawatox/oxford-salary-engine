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

  // Insight articles
  const insights = [
    "salary-vs-hourly-uk",
    "pension-auto-enrolment-uk",
    "student-loan-repayment-uk",
    "marginal-tax-rate-uk",
    "tax-code-guide-uk",
    "national-insurance-guide-uk",
    "self-employed-vs-ltd-uk",
    "ir35-explained-uk",
    "salary-sacrifice-uk",
    "dividend-tax-guide-uk",
    "marriage-allowance-uk",
    "employment-allowance-uk",
    "capital-gains-tax-uk",
    "inheritance-tax-uk",
    "working-from-home-tax-uk",
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
