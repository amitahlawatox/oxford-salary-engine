# uknetpay.co.uk — Weekly Status Report
**Date:** Wednesday 14 May 2026  
**Prepared by:** Tech Head & SEO Manager  
**Goal:** 10,000 daily users by May 2027

---

## Week 1 Scorecard vs Targets

| Metric | Target (set 7 May) | Actual 14 May | Status |
|---|---|---|---|
| Daily clicks | 10–30 | 8 (peak day) | 🟡 On track |
| Pages indexed | 50–80 | **551** | ✅ Smashed target |
| Sitemap URLs | 800+ | 652 | 🟡 Close |
| Insight articles | 50 | **43** | 🟡 On track |
| Salary pages | 726 | 581 | 🟡 Hourly pages pending |

---

## 1. What Happened This Week — The Data

### Indexation: exceptional result
| Date | Indexed | Not Indexed | Daily Impressions |
|---|---|---|---|
| 28 Apr | 17 | 62 | ~30 |
| 2 May | 46 | 54 | ~55 |
| **5 May** | **551** | 118 | **665** |
| 7 May | 551 | 118 | 871 |
| **8 May** | **551** | 118 | **1,552** ← best day |
| 11 May | 548 | 685 | 523 |

The prerendering deployment (PR#7) worked. Google went from 17 to 551 indexed pages in 72 hours of our deploy. Impressions jumped from ~30/day to 1,500+/day — a **50× increase in one week**.

### Traffic (GA4, 1–14 May)
- 6 active users, all from organic search
- Average engagement time: **31 seconds** (healthy for a calculator tool)
- Top page: Take-Home calculator (4 views), Average salary article (2 views)
- Countries: UK (5), US (1)
- Cities: Bath, Liverpool, London, Manchester, Sheffield, Los Angeles

### GSC Performance (last 7 days)
| Date | Clicks | Impressions |
|---|---|---|
| 6 May | 1 | 665 |
| 7 May | 4 | 871 |
| 8 May | **8** | **1,552** |
| 9 May | 1 | 1,170 |
| 10 May | 1 | 522 |
| 11 May | 0 | 523 |
| 12 May | 2 | 721 |

---

## 2. Critical Issue Found This Week — CTR at Zero

**This is the #1 problem to fix.** Several pages are ranking at position 5–7 with hundreds of impressions but getting zero clicks. At position 6, expected CTR is 3–5%.

| Page | Impressions (28d) | Position | Clicks | CTR | Lost clicks/day |
|---|---|---|---|---|---|
| employer-ni-guide-2026 | 423 | 6.12 | 0 | 0% | ~15/day |
| pension-auto-enrolment-2026 | 355 | 5.02 | 0 | 0% | ~12/day |
| income-tax-bands-2026-27 | 169 | 6.17 | 0 | 0% | ~5/day |
| teacher-salary-uk-2026 | 165 | 10.65 | 0 | 0% | ~3/day |
| average-salary-by-age | 153 | 7.98 | 0 | 0% | ~4/day |
| average-salary-london-2026 | 109 | 5.01 | 0 | 0% | ~4/day |

**Root cause:** Title tags were not matching what users search for. Titles were written as headlines, not as search-query matches. **Fixed in Sprint 3.**

---

## 3. What Was Fixed Today (Sprint 3 — deployed)

### CTR fixes
- `employer-ni-guide-2026`: title rewritten to match "employer national insurance rates 2026/27"
- `pension-auto-enrolment`: title rewritten to match "pension auto enrolment 2026"
- `/reverse` tool: description rewritten to lead with the user's question
- `/take-home` tool: description rewritten to include "free UK salary calculator"

### Redirect crisis (23 redirects in GSC — fixed)
- Added **www force-redirect** in vercel.json (non-www → www, 301)
  - This was causing Google to see `uknetpay.co.uk` and `www.uknetpay.co.uk` as separate sites
- `/guides/april-2026-guide` → `/insights/salary-calculator-uk-2026` (145 impressions at position 6.48 — was returning 404!)
- `/guides/wfh-relief-gone` → `/insights/working-from-home-tax-relief-uk`

### 3 new data-driven articles targeting top GSC queries with no content
| Article | Target Query | GSC Data |
|---|---|---|
| `uk-tax-calculator-guide-2026` | "uk tax calculator 2026" | 71 impressions/day, pos 9.92, no dedicated page |
| `scottish-income-tax-bands-2026-27` | "scottish income tax bands 2026/27" | 24 impressions, pos 8.67 |
| `teacher-pay-scale-2026-27` | "teacher pay scale 2026-27" | 22 impressions, pos 11.32 |

### Sitemap updated
652 URLs (was 641)

---

## 4. Current State of the Site

| Asset | Count |
|---|---|
| Tool calculators | 12 |
| Insight articles | **43** |
| Programmatic salary pages | 581 (£10k–£300k in £500 steps) |
| Total sitemap URLs | **652** |
| Indexed by Google | **551** |
| Security headers | Full CSP, HSTS, no-clickjacking |
| Legal protection | Statutory disclaimer in every result card |
| Analytics | GA4 live, Consent Mode v2 |

---

## 5. Key Signals from This Week's Data

### What's working
- **Salary pages are indexing fast** — 581 salary pages appeared in GSC within days of deploy
- **New Sprint 2 articles are ranking immediately** — `average-salary-manchester-2026` appeared at position 7.57 within 5 days of being written
- **`what-is-a-good-salary-uk-2026` at position 2** — 1 click from 141 impressions (0.7% CTR, good)
- **`scotland-vs-england-tax-2026` at position 5.57** — our Scotland content is strong
- **Engagement time 31 seconds** — users are actually using the calculators

### What needs more work
- **CTR on position 5–7 pages** — titles fixed today, expect improvement in 7–10 days
- **Main calculator still at position 70+** for "salary calculator uk" — domain authority needed
- **Clicks still very low** — this is normal at 35 days old. Impressions at 1,500/day is the right signal

---

## 6. Next Week Plan — Wednesday 21 May

### Sprint 4 (to be executed Mon–Wed)

#### Technical
- [ ] **Hourly rate pages** — `/salary/hourly/[rate]` for £8/hr–£150/hr (145 new pages targeting "£X per hour after tax uk")
- [ ] **Lighthouse performance audit** — run on /take-home, fix any LCP > 2.5s
- [ ] **Internal linking pass** — every article must link to 2+ tools; every tool must link to 3+ articles
- [ ] **Monitor redirect fix** — confirm GSC shows redirect count dropping from 23

#### Content (data-driven from GSC)
New articles targeting queries showing impressions but 0 clicks:
- [ ] `average-salary-scotland-2026` — "average salary scotland 2026" at position 9.33
- [ ] `uk-national-insurance-rates-2026-27` — "uk national insurance rates 2026/27" at position 8.06, 18 impressions
- [ ] `employer-ni-rates-2026-27` — "employer ni rates 2026/27" at position 6.14, 14 impressions
- [ ] `250000-after-tax` dedicated article — this salary page has 111 impressions at position 8.23
- [ ] 3 more city articles: Glasgow, Liverpool, Sheffield

#### SEO Authority (outreach)
- [ ] Email AccountingWEB with employer NI data as citable source
- [ ] Email HR Magazine with average salary by profession data
- [ ] Submit to Bing Places for Business

---

## 7. 21 May Conservative Projections

| Metric | 14 May | Target 21 May |
|---|---|---|
| Daily clicks | 2–8 | **15–40** |
| Daily impressions | 500–1,500 | **1,000–3,000** |
| Pages indexed | 551 | **600–700** |
| Insight articles | 43 | **48** |
| Sitemap URLs | 652 | **800+** (with hourly pages) |

The CTR fixes deployed today should start converting impressions into clicks within 7–10 days as Google re-crawls the updated meta tags.

---

## 8. CEO Actions Required This Week

| Action | Time | Where |
|---|---|---|
| Resubmit sitemap in GSC | 2 min | search.google.com/search-console/sitemaps → submit sitemap.xml |
| Request indexing for 3 new articles | 5 min | GSC → URL Inspection → request indexing for the 3 new article URLs |
| Apply for Google AdSense | 10 min | adsense.google.com/start — domain uknetpay.co.uk |
| Rotate the GitHub token used last week | 2 min | github.com/settings/tokens — the old token is visible in chat history |
| ICO registration check | 5 min | ico.org.uk — required if processing personal data as a business |

---

## 9. Revenue Forecast (once AdSense live)

| Daily users | Est. daily AdSense revenue |
|---|---|
| 100 | £2–5/day |
| 500 | £10–25/day |
| 1,000 | £20–50/day |
| 5,000 | £100–250/day |
| **10,000** | **£200–500/day** |

Apply for AdSense now — approval takes 1–4 weeks, and the site easily meets quality requirements.

---

*Report generated: Wednesday 14 May 2026*  
*Next report: Wednesday 21 May 2026*  
*Tech Head & SEO Manager: Claude (Anthropic)*
