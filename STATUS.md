# uknetpay.co.uk — Tech & SEO Status Report
**Date:** Sunday 10 May 2026
**Prepared by:** Devin (Tech Lead / SEO Manager)
**Goal:** 10,000 daily users by May 2027
**Mode change:** From this audit on, Amit provides GA4 + Search Console exports every 3 days; Devin consumes those instead of running expensive Google logins.

---

## 1. TL;DR

- One concrete, currently-shipping bug fixed today: every internal canonical / sitemap / og:url / IndexNow ping was still pointing at `https://www.uknetpay.co.uk/...` after the production domain was switched to the apex `uknetpay.co.uk`. Every URL Googlebot looks up is therefore hitting a 308 redirect on first hop. Fix is in PR (this branch).
- Two collateral bugs caught and patched in the same PR: a JSX parse error in `src/App.tsx` (added by the YMYL sprint, lint was failing on `main`), and a duplicate `indexnow` script key in `package.json`.
- May 7 `STATUS.md` was already stale: 4 sprints landed in the last 3 days (Growth Sprint 1, Growth Sprint 2, Legal, YMYL Hardening). This document supersedes it.
- The 13 GA4 / Search Console attachments uploaded today returned **401 Unauthorized** on download — they need to be re-attached in a fresh message before I can do data-driven prioritisation. Bug filed.
- Until the data exports are accessible, the 3-day plan is intentionally conservative: ship the canonical/sitemap fix, watch indexation, draft Sprint 3 content but do not blind-publish.

---

## 2. Current Site State (10 May 2026)

| Area | Value | Source |
|---|---|---|
| Production domain | `https://uknetpay.co.uk` (apex) | Vercel — confirmed via `curl -I` |
| `www.` subdomain | 308 → apex | Vercel redirect |
| Sitemap | 641 URLs | `public/sitemap.xml` |
| Prerendered routes | 643 (1 home + 12 tools + 40 insights + 9 static + 581 salary) | `npm run build` output |
| Tool pages | 12 | `src/pages/tools/*` |
| Insight articles | 40 | `src/content/articles/data.tsx` |
| Programmatic salary pages | 581 (£10k–£300k in £500 steps) | `src/lib/salaryConstants.ts` |
| GA4 | Live, Consent Mode v2 (G-VL1CMWKWY1) | `index.html`, verified in served HTML |
| IndexNow | Live, key `5d0a77f231bb49489a2985984b00bc8a` | `scripts/indexnow.ts`, `public/<key>.txt` |
| AdSense | Placeholder only — `ads.txt` still has `PUBLISHER_ID` | `public/ads.txt` |

### Live-site health checks performed today
- `curl https://uknetpay.co.uk/` → 200 OK, GA4 tag present, 4805 bytes of prerendered HTML.
- `curl -A Googlebot https://uknetpay.co.uk/take-home` → route-specific `<title>`, canonical, JSON-LD all present.
- `curl -A Googlebot https://uknetpay.co.uk/salary/35000-after-tax` → route-specific `<title>` "£35,000 After Tax UK 2026/27 — Take Home £28,720/yr | UK Net Pay".
- `curl -A Googlebot https://www.uknetpay.co.uk/take-home` → **308 redirect** (this is the issue PR fixes).

---

## 3. What Devin Shipped Today (10 May 2026)

Single PR on branch `devin/<ts>-canonical-apex-fix`. Three changes, all tightly scoped:

### 3a. Canonical / sitemap / og:url drift fix (the main reason for this PR)
- Replaced `https://www.uknetpay.co.uk` → `https://uknetpay.co.uk` across all source files (17 files, 669 occurrences).
- Files touched: `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/components/seo/Seo.tsx`, `src/components/article/ArticleLayout.tsx`, `src/lib/seoMeta.ts`, `src/pages/Directory.tsx`, all 4 legal pages, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Methodology.tsx`, `src/pages/programmatic/SalaryPage.tsx`, `scripts/prerender.ts`, `scripts/indexnow.ts`, `scripts/indexnow-submit.ts`.
- After this lands, every one of the 641 sitemap URLs returns 200 directly instead of a 308 redirect, and canonical tags self-reference the URL Google actually serves.

### 3b. Fix `src/App.tsx` JSX parse error
- The YMYL sprint that landed on 8 May added `useSessionClear()` inside the `App` component but left the arrow-function body unclosed (`)` instead of `);`/`};`). esbuild was permissive enough to keep prod alive, but ESLint was failing on every CI run.
- Fix: properly close the function body. `npm run lint` now reports **0 errors** (13 unrelated warnings remain, none new).

### 3c. Drop duplicate `indexnow` script key in `package.json`
- Two `indexnow` keys existed; the second won, but esbuild was emitting a `Duplicate key` warning on every build. Removed the legacy `indexnow-submit.ts` entry.
- The `scripts/indexnow-submit.ts` file is left in place for historical reference; the active script is now unambiguously `scripts/indexnow.ts`.

### Verification
- `npm run lint` → 0 errors, 13 pre-existing warnings.
- `npm run test` → 5/5 passed.
- `npm run build` → "Prerendered routes: 1 home + 12 tools + 40 insights + 9 static + 581 salary = 643".
- `dist/index.html`, `dist/take-home/index.html`, `dist/insights/average-salary-uk-2026/index.html` all show `rel="canonical" href="https://uknetpay.co.uk/..."`.
- `dist/sitemap.xml` first three `<loc>` entries all use the apex.

### What Devin did NOT do today (deliberately)
- No new content was published. With 17/641 indexed and the canonical bug live, adding more URLs into the sitemap would have made the redirect-flood worse, not better.
- No AdSense wiring — still waiting on Amit's publisher ID.
- No data-driven prioritisation (e.g. fixing high-impression / low-CTR title tags) because the GA4/GSC exports were not accessible. See §4.

---

## 4. Data-Export Blocker

Amit attached 13 files to the kickoff message:

| File | Type |
|---|---|
| View_user_engagement_&_retention_overview.pdf | GA4 |
| Pages_and_screens_Page_path_and_screen_class.pdf | GA4 |
| Tech_details_Browser.pdf + .csv | GA4 |
| Tech_overview.pdf | GA4 |
| Audiences_Audience_name.pdf | GA4 |
| Demographic_details_Country.pdf | GA4 |
| User_attributes_overview.csv | GA4 |
| Reports_snapshot.csv | GA4 |
| uknetpay.co.uk-Coverage-2026-05-10.zip | Search Console |
| uknetpay.co.uk-Performance-on-Search-2026-05-10.zip (×3) | Search Console |

All 13 returned **`HTTP 401 {"detail":"Unauthorized"}`** when downloaded from this VM. The Devin platform's auto-download appears to have been interrupted by the VM reboot earlier today; once that window passes, the URLs are auth-gated and Devin cannot retrieve them.

**Action for Amit:** re-attach the same files in a fresh chat message. They will then be auto-downloaded and Devin can run the analysis (top queries, indexed-vs-not-indexed counts, page-level CTR, country split, browser split, period-over-period trend). If this happens again on the next 3-day cycle, Cognition engineers should investigate the auto-download retry behaviour.

---

## 5. What Landed on `main` Between 4 May and 10 May (for context)

Devin shipped PR #7 on 4 May, then the session went idle for 6 days. During that gap, four sprints were merged by other agents:

| Date | Sprint | Highlights |
|---|---|---|
| 6 May | PR #7 merged | GA4 install + prerender all 152 routes |
| 6 May | PR #6 merged | 301 redirects for old `/guides/` URLs, `/methodology` consolidation |
| 7 May | Growth Sprint 1 (`f6f68cd`) | Salary pages 106 → 581 (£500 step), 5 articles (good-salary, take-home, tax-bands, London salary, salary by age), sitemap 183 → 630, fixed Terms `noindex`, edge cache headers |
| 7 May | Growth Sprint 2 (`a85b0d1`) | +10 articles (5 cities + 5 job titles), FAQ schema on all 12 tools, sitemap → 641 |
| 7 May | Legal sprint (`ebe2b1d`) | Privacy / Disclaimer / Terms full rewrite, `LegalBanner`, footer disclaimer, disclaimer indexable |
| 7 May | `STATUS.md` v1 (`506ce50`) | Status report for that point in time (now superseded by this doc) |
| 8 May | YMYL hardening (`3b741bd`) | Statutory disclaimers, CSP, session clearing, `useSessionClear` hook, `ResultDisclaimer` |

The site jumped from 152 indexable routes to 643 in three days. Indexation count was 17 in the May 7 doc — the bigger sitemap will not move that number until Google's crawl picks up the new URLs **and** the canonical fix in this PR removes the 308 redirect from the path.

---

## 6. Three-Day Plan (10 → 13 May 2026)

Plan is split into **"can do without GA4/GSC data"** and **"requires GA4/GSC data"**. The first track always runs; the second runs as soon as Amit re-attaches the exports.

### Track A — code-only, no data needed (will run regardless)

**Day 1 (Sun 10 May, today)**
- [x] Audit repo state, identify canonical/sitemap drift bug.
- [x] Open PR with canonical fix + `App.tsx` parse-error fix + dedupe `indexnow` key.
- [x] Update `STATUS.md` (this doc).
- [ ] Wait for CI to pass and merge.
- [ ] Once merged + Vercel auto-deploys, re-curl 5 representative URLs to confirm 200 OK on the apex.

**Day 2 (Mon 11 May)**
- [ ] Submit fresh `https://uknetpay.co.uk/sitemap.xml` to Google Search Console (replaces the www-host entry).
- [ ] Run `npm run indexnow` to push the 641 URLs to Bing/Yandex with the corrected `host: uknetpay.co.uk`.
- [ ] Add Google Search Console **apex property** (`uknetpay.co.uk`) if it is not already verified — the existing `www.` property may be holding outdated data.
- [ ] Lighthouse audit on the 5 highest-priority pages: `/`, `/take-home`, `/reverse`, `/insights/average-salary-uk-2026`, `/insights/how-to-calculate-take-home-pay`. Record LCP / CLS / TBT.
- [ ] Tighten the largest JS chunks (`recharts`, `pdf`, `index-es`) — code-split or dynamic-import on the few pages that actually need them. Currently 500KB+ chunks load on first paint.

**Day 3 (Tue 12 May)**
- [ ] Internal-linking audit: every tool page should link to ≥3 relevant articles, every article should link to ≥2 tools. Use `grep` on `src/content/articles/data.tsx` and `src/pages/tools/*.tsx` to find gaps.
- [ ] Build a `/directory` improvement: group salary pages by band (£10–25k, £25–50k, £50–75k, £75–100k, £100k+) so Google sees structured navigation, not a 581-link wall.
- [ ] Add `og:image` per major route (currently a single shared `/og-default.png` for everything). Generate 4 type-specific OG images: tool, article, salary-page, home.

### Track B — runs as soon as data exports are accessible

- [ ] Parse the 13 attachments. Extract:
  - Top 25 search queries by impressions, with current rank + CTR.
  - Top 25 pages by impressions, with current rank + CTR.
  - Indexed-URL count (move from 17 → ?).
  - "Discovered — currently not indexed" list — these are pages I should manually request indexing for.
  - Crawl errors / soft-404s.
  - Country / device / browser split.
- [ ] Identify **high-impression / low-CTR pages** (≥100 impressions, <2% CTR) → rewrite their `<title>` and meta description (cheapest possible win).
- [ ] Identify **page-2 ranking keywords** (positions 11–20) → add internal links pointing at those pages from the home page and the relevant `/insights/*` articles.
- [ ] Compare 4–10 May trend vs. 1–3 May to attribute lift to PR #7 (prerender + GA4) and the 4 follow-up sprints.

### Explicitly out-of-scope this 3-day window
- New content sprints (city #6+, job title #6+) — paused until indexation moves.
- AdSense wiring — blocked on Amit's publisher ID.
- Hourly-rate programmatic pages (`/salary/hourly/*`) — would add ~145 URLs to a sitemap that hasn't been crawled yet. Defer until indexed count is north of 200.

---

## 7. Open Decisions for Amit

1. **Re-attach the 13 GA4 / GSC files** in a fresh message so I can run Track B above.
2. **AdSense publisher ID** — once Google approves, paste the `pub-XXXXXXXX` ID and I'll wire `ads.txt` + the `<AdSlot>` component on day 4.
3. **GSC properties** — confirm whether `uknetpay.co.uk` (apex) is verified as a property in Search Console. If only `www.uknetpay.co.uk` exists, indexation reports will be misleading after this PR ships.
4. **Vercel domain config** — confirm apex is set as the production domain (it appears so from the redirect direction). If you want www to be canonical instead, flip the redirect direction on Vercel and I'll re-revert this PR's URL changes.

---

*Generated: Sunday 10 May 2026, by Devin (Tech Lead).
Next report: Wednesday 13 May 2026 — 3 days from now.*
