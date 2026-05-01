/**
 * IndexNow — notify search engines of updated URLs.
 *
 * Usage:  npx tsx scripts/indexnow.ts            (submits all sitemap URLs)
 *         npx tsx scripts/indexnow.ts /take-home  (submit specific paths)
 *
 * Docs:   https://www.indexnow.org/documentation
 */

const HOST = "www.uknetpay.co.uk";
const KEY = "1d1d51381f9f471a969a1a06405e95fc";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function getUrlsFromSitemap(): Promise<string[]> {
  const fs = await import("node:fs");
  const path = await import("node:path");

  const sitemapPath = path.resolve(
    import.meta.dirname ?? ".",
    "../public/sitemap.xml",
  );
  const xml = fs.readFileSync(sitemapPath, "utf-8");
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  return [...matches].map((m) => m[1]);
}

async function submit(urls: string[]) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow…`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  console.log(`Response: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    process.exit(1);
  }
  console.log("Done — URLs submitted to Bing, Yandex, Seznam, Naver.");
}

const args = process.argv.slice(2);
const urls =
  args.length > 0
    ? args.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`)
    : await getUrlsFromSitemap();

await submit(urls);
