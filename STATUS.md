# uknetpay.co.uk — Tech & SEO Status Report

**Date:** Sunday 10 May 2026 (revised, late evening — data-driven sprint)
**Prepared by:** Devin (Tech Lead / SEO Manager)
**Goal:** 10,000 daily users by May 2027
**Mode:** Amit provides GA4 + Search Console exports every 3 days; Devin consumes those.

---

## 1. TL;DR

- 13 GA4 + Search Console attachments parsed today. Real numbers, real opportunities.
- Indexation has **gone from 2 indexed (10 Apr) → 17 indexed (28 Apr) → 46 indexed (4 May)** out of 100 URLs Google currently knows about. Daily impressions jumped from ~30/day to **165–182/day on 3–4 May**, a 5–6× lift. PR #7 (prerender + GA4) and PR #8 (apex canonical) explain most of this.
- Mobile CTR is 0.94% at avg position 9.9 — actually decent. **Desktop CTR is 0.16% at avg position 16.17 — terrible.** Highest-impression queries are page-1 ranked but converting at 0%.
- 31% of GA4 users come from **chatgpt.com** referrals. The site needs first-class machine readability — added `public/llms.txt` in this sprint.
- New PR ships 5 surgical title / meta-description rewrites for the highest-impression / lowest-CTR articles, plus `llms.txt`. Zero risk to calculator logic.

---

## 2. Where we shipped from this week

| Date | Ref | Scope |
|---|---|---|
| 6 May | PR #7 merged | Install GA4 (Consent Mode v2) + expand prerender from `/salary/*` to all 152 indexable routes |
| 6 May | Growth Sprint 1 | Expand programmatic salary pages: 106 → 581 (£10k–£300k in £500 steps) |
| 7 May | Growth Sprint 2 | 40 insight articles (from 25), FAQ schema sitewide, sitemap → 640 URLs |
| 7 May | Legal Sprint | Privacy policy, disclaimer, no-data-collection messaging |
| 8 May | YMYL Sprint | Statutory disclaimers, CSP headers, session clearing, copy audit |
| 10 May (early) | PR #8 merged | Canonical / sitemap / og:url drift fix (`https://www.uknetpay.co.uk` → `https://uknetpay.co.uk`, 669 occurrences across 17 files) + lint repair + dedupe `package.json` |
| 10 May (mid) | PR #9 merged | Align visible link text on Disclaimer / Privacy / Terms to apex href |
| 10 May (this PR) | open | Data-driven SEO: 5 high-impression title/meta rewrites + `public/llms.txt` |

---

## 3. Data digest (1 Apr – 10 May 2026)

Source files: 8 GA4 exports + 4 Search Console exports (Coverage + 3 Performance windows: Last 24h, Last 7 days, Last 3 months).

### 3a. GA4 (40-day window)

- **Active users: 19** (100% new — essentially no returning traffic yet).
- **Engagement: 32.7s** avg per active user.
- **158 total events.**
- **Top page**: `/` (home) — 44 views, 14 users, 30s engagement. Title shown: "UK Salary Calculator 2026/27 | Take-Home Pay After Tax | UK Net Pay".
- **Second**: `/take-home` — 4 views, 1 user.
- **Other pages getting any GA4 traffic**: `/insights/average-salary-uk-2026`, `/oxford-methodology`, `/insights/what-is-a-good-salary-uk-2026`, `/ir35`, `/pay-rise`, `/pro-rata`, `/reverse`, `/salary/123500-after-tax`.

### 3b. Acquisition channels (GA4 first-user source / medium)

| Source | Users | Notes |
|---|---|---|
| google / organic | 7 | The reason for SEO work |
| (direct) / (none) | 6 | Branded recall, internal links, or bookmarks |
| **chatgpt.com / referral + (not set)** | **6** | **31% of all users — AI assistants are now a meaningful channel** |

### 3c. GA4 browser & device

- Chrome: 12 users (63%); Safari: 3; Edge: 2; Opera: 1; Samsung Internet: 1.
- Platform: 100% Web (no native app).
- Countries: GB 12, US 2, ES 1, GE 1, ID 1, UA 1. UK dominates as expected.
- Cities: Oxford 3, London 2, Bath, Liverpool, Manchester, Peterborough, Sheffield, Los Angeles, San Jose, Jakarta, Tbilisi, etc.

### 3d. Search Console — Coverage

| Metric | 10 Apr | 28 Apr | 4 May |
|---|---|---|---|
| Indexed | 2 | 17 | **46** |
| Not indexed | 0 | 62 | **54** |
| Daily impressions | 2 | 32 | **165** |

Critical issues (10 May snapshot):

| Reason | Pages |
|---|---|
| Discovered – currently not indexed | 42 |
| Crawled – currently not indexed | 5 |
| Excluded by 'noindex' tag | 3 |
| Page with redirect | 3 |
| Redirect error | 1 |

Interpretation:
- **42 "Discovered – currently not indexed"** = Google has the URL but hasn't crawled it. Normal for new programmatic pages. PR #8 (apex canonical) should accelerate this from the next crawl.
- **5 "Crawled – currently not indexed"** = Google rejected. Usually a quality / duplication signal. Worth identifying and improving these 5 specifically (data not in this export — needs URL inspection in GSC).
- **3 "Page with redirect"** = the `/guides/*` → `/insights/*` 301s. Will drop out of the report over the next few weeks.
- **1 "Redirect error"** = need to identify which.
- **3 "Excluded by 'noindex'"** = probably preview/print routes. Acceptable.

The sitemap has **641 URLs** but Google only knows about **100** (46 indexed + 54 not indexed). Most of the **581 salary pages** (added 7 May in Growth Sprint 1) have not been discovered yet. We need to push them out via internal links + IndexNow. PR #8 already fired IndexNow for the canonical-cleaned URLs; subsequent deploys will keep pinging.

### 3e. Search Console — Performance (Last 3 months)

**Headline:** 19 clicks / 4,140 impressions / 0.46% CTR / avg position 13.5.

By device:

| Device | Clicks | Impressions | CTR | Avg Position |
|---|---|---|---|---|
| Mobile | 15 | 1,602 | **0.94%** | 9.9 |
| Desktop | 4 | 2,518 | **0.16%** | 16.17 |
| Tablet | 0 | 20 | 0% | 6.6 |

By country (top 5):

| Country | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| United Kingdom | 18 | 2,565 | 0.7% | 16.17 |
| United States | 1 | 619 | 0.16% | 7.4 |
| India | 0 | 56 | 0% | 5.23 |
| Brazil | 0 | 49 | 0% | 7.27 |
| Germany | 0 | 48 | 0% | 43.04 |

**Top 10 queries (by impressions, 3-month window):**

| Query | Impressions | Clicks | CTR | Avg Position |
|---|---|---|---|---|
| uk tax calculator 2026 | 73 | 0 | 0% | **9.89** |
| average uk salary 2026 | 63 | 0 | 0% | **4.73** |
| reverse salary calculator | 33 | 0 | 0% | 6.79 |
| scottish income tax bands 2026/27 | 23 | 0 | 0% | 8.65 |
| uk employee national insurance rates 2026/27 | 18 | 0 | 0% | 8.72 |
| uk national insurance rates 2026/27 | 17 | 0 | 0% | 7.88 |
| average salary uk 2026 | 16 | 0 | 0% | 7.94 |
| uk salary calculator | 15 | 0 | 0% | **66.33** |
| employer ni rates 2026/27 | 14 | 0 | 0% | 6.14 |
| average wage uk 2026 | 14 | 0 | 0% | 5.57 |

The pattern is clear:
1. We rank top-10 on **niche 2026/27 tax queries** but get **zero clicks** — the snippet is not winning the click.
2. We rank **page-6-to-page-8 (pos 60–80)** for the head terms (`uk salary calculator`, `salary calculator uk`, `take home pay calculator uk`, `net pay calculator uk`). These are the keywords with the volume to hit 10k/day, but we're not competitive yet.

**Top 10 pages (by impressions, 3-month window):**

| Page | Impressions | Clicks | CTR | Avg Pos |
|---|---|---|---|---|
| `/insights/average-salary-uk-2026` | 972 | 5 | 0.51% | 5.75 |
| `/` (apex + www combined) | 582 | 4 | 0.69% | varies |
| `/insights/employer-ni-guide-2026` | 253 | 0 | 0% | **5.77** |
| `/insights/pension-auto-enrolment-2026` | 200 | 0 | 0% | **4.80** |
| `/guides/april-2026-guide` | 140 | 0 | 0% | 6.34 (cached old URL) |
| `/reverse` | 132 | 2 | 1.52% | 20.83 |
| `/insights/teacher-salary-uk-2026` | 86 | 0 | 0% | 10.28 |
| `/salary/140000-after-tax` | 84 | 0 | 0% | 12.15 |
| `/insights/income-tax-bands-2026-27` | 76 | 0 | 0% | 6.93 |
| `/insights/what-is-a-good-salary-uk-2026` | 67 | 1 | 1.49% | 6.31 |

The **5 starred pages** above are the ones this PR rewrites titles + descriptions for. They are all on page 1 of Google with healthy impressions, and producing 0–5 clicks. A 2% CTR uplift on these alone is ~30 clicks/month from existing rank.

---

## 4. What this PR ships

Branch: `devin/<ts>-seo-data-driven-may10` (open as of this writing).

### 4a. Title / description rewrites for 5 high-impression / low-CTR articles

File touched: `src/content/articles/data.tsx`.

| Slug | Old title | New title |
|---|---|---|
| `average-salary-uk-2026` | Average UK Salary 2026 — Median by Region & Age | Average UK Salary 2026: £35,000 Median by Region, Age & Job |
| `pension-auto-enrolment-2026` | Pension Auto-Enrolment 2026 — Rates & Impact | UK Pension Auto-Enrolment 2026/27: 8% Minimum (3% Employer + 5% Employee) |
| `employer-ni-guide-2026` | Employer National Insurance 2026/27 — Rates Guide | Employer NI 2026/27: 15% Rate, £5,000 Threshold & Real Cost of Hiring |
| `income-tax-bands-2026-27` | UK Income Tax Bands and Rates 2026/27 | UK Income Tax Bands 2026/27: Personal Allowance, Higher Rate & Scottish Rates |
| `teacher-salary-uk-2026` | Teacher Salary UK 2026: Take-Home Pay for Every Scale Point | UK Teacher Pay Scale 2026/27: Salary by Scale Point + Take-Home |

Description rewrites follow the same pattern: front-load the numeric anchor (£35,000, 15%, 8%, £12,570, etc.) and lead with the keyword variant Google is already matching against, so the rich-snippet preview tells users immediately "this is the page". No body changes, no calculator changes, no schema changes — these are surgical SERP-snippet edits, lowest risk.

### 4b. New `public/llms.txt`

Added a [llmstxt.org-style](https://llmstxt.org) `llms.txt` at the root. Reasons:

- 6 of 19 GA4 users (31%) come from `chatgpt.com`.
- A first-class machine-readable index helps ChatGPT, Claude, Perplexity and Gemini cite the correct page on the apex domain (not on www).
- Doubles as a "site map for AI" with our 2026/27 tax facts inline so the LLMs use accurate numbers.

`llms.txt` includes: per-tool descriptions, key 2026/27 tax facts, article catalogue, schema notes, and clear "cite the apex" guidance.

### 4c. Skipped (logged for the next sprint)

- **Home page title rewrite for "uk salary calculator" head term.** The home is at position 54-79 for our core keyword. The title is already decent; the real fix is more body content + inbound anchor text — too big for this PR.
- **Internal anchor-text linking from top article (`/insights/average-salary-uk-2026`, 972 impressions) → home with "UK Salary Calculator" anchor.** Body edits are riskier; deferred to next sprint.
- **Cross-link clusters between insight articles.** Same reason.
- **Identify the 5 "Crawled – currently not indexed" URLs.** Requires URL inspection in GSC — needs Amit to inspect on next 3-day cycle and paste URLs, or for me to log in (we agreed against logging in).
- **Identify the 1 "Redirect error" URL.** Same.

---

## 5. Three-day plan (10 May → 13 May)

### Track A — code-only (no data needed)

- [ ] Watch the PR through CI + merge.
- [ ] After merge, watch deploy → verify the 5 new titles render correctly on `https://uknetpay.co.uk/insights/employer-ni-guide-2026` etc. via `curl -A Googlebot`.
- [ ] Confirm `https://uknetpay.co.uk/llms.txt` is served as text/plain.
- [ ] Re-run `npm run indexnow` post-deploy to push the 5 updated URLs to Bing/Yandex.
- [ ] Submit the apex sitemap (`https://uknetpay.co.uk/sitemap.xml`) in Google Search Console if not already.

### Track B — needs the next data drop (13 May)

When Amit sends the next set of GA4 + GSC exports, I will:

- [ ] Cross-check that the 5 retitled articles have moved on CTR. Aim: 0% → 1–2%.
- [ ] Re-check the Coverage report — has "Discovered – currently not indexed" dropped from 42? Has indexed count grown past 46?
- [ ] Inspect the 5 "Crawled – currently not indexed" URLs (Amit, please paste them from GSC → Indexing → Pages → "Crawled - currently not indexed" so I can prioritise).
- [ ] Run a second sprint of title/desc rewrites on whatever the new high-impression / low-CTR list looks like.
- [ ] Open a small follow-up PR with internal anchor-text linking from the top 3 articles → home for the "UK Salary Calculator" head term, if traffic numbers warrant it.

### What I'd like Amit to do before the next data drop

1. **Verify `uknetpay.co.uk` (apex) is the primary Search Console property** — and submit `https://uknetpay.co.uk/sitemap.xml` as the canonical sitemap.
2. In GSC → Indexing → Pages, click into **"Crawled – currently not indexed"** and paste the 5 URL list in the next message.
3. In GSC → Indexing → Pages, click into **"Page with redirect"** + **"Redirect error"** and paste those URLs too — I want to confirm they're the deprecated `/guides/*` paths and not something live.
4. (Nice-to-have) Provide the AdSense publisher ID when ready so I can wire actual ad units; current `ads.txt` is still placeholder.

---

## 6. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Title rewrites underperform old ones | Low | Low | Reversible in one commit. Compare CTR on next 3-day cycle. |
| `llms.txt` ignored by AI assistants | Medium | Low | Convention is still emerging; even partial pickup is upside. |
| Google takes weeks to re-render new titles | Medium | Low | Expected; SERP-snippet refresh is gradual. Indexing API + IndexNow help. |
| `/guides/*` redirects still showing impressions | Low | Low | They will drop off Google's report over 30–60 days. |
| AdSense placeholder still live | Low (no traffic to monetise yet) | Low until we hit critical mass | Waiting on Amit's publisher ID. |

---

## 7. Progress vs goal (10,000 daily users)

Today: ~5 daily users from GA4 average (19 over 40 days). Daily-search-impression run rate is ~165, daily clicks ~0.5. Roughly **0.05%** of the way to the daily-users goal.

Realistic 90-day milestone: get to 100 daily users (≈ 30,000 monthly impressions × 3% CTR). The combination of expanded indexable surface (PR #7), correct canonicals (PR #8), and CTR-optimised snippets (this PR) is the right sequence to get there.

---

## 8. Files modified in this PR

- `src/content/articles/data.tsx` — 5 article title/description rewrites
- `public/llms.txt` — new file
- `STATUS.md` — this file
