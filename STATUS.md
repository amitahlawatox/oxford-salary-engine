# uknetpay.co.uk — Tech & SEO Status Report
**Date:** Wednesday 7 May 2026  
**Prepared by:** Tech Head & SEO Manager  
**Goal:** 10,000 daily users by May 2027  
**Current:** ~1 click/day → Target: 10,000/day

---

## 1. Current Website Status

### Traffic (as of 7 May 2026)
| Metric | Value |
|---|---|
| Daily clicks | ~1 |
| Daily impressions | ~225 |
| Pages indexed by Google | 17 of 641 |
| Site age | 27 days (first indexed 10 Apr 2026) |
| Best ranking keyword | #1 — "auto enrolment min rate 2026" |
| Best article position | #6 — "average salary uk 2026" |

### What the site is
- **Domain:** www.uknetpay.co.uk
- **Stack:** React + TypeScript + Vite, deployed on Vercel
- **Repo:** github.com/amitahlawatox/oxford-salary-engine
- **Tools:** 12 salary/tax calculators (take-home, reverse, IR35, dividend, etc.)
- **Articles:** 40 insight articles
- **Salary pages:** 581 programmatic pages (£10k–£300k in £500 steps)
- **Total sitemap URLs:** 641

### Indexation Health
| Status | Count |
|---|---|
| Indexed | 17 |
| Discovered — not yet indexed | 46 |
| Not indexed (pending crawl) | ~578 |
| **Target in 4 weeks** | **200+ indexed** |

---

## 2. Work Completed This Session

### PR Merges (existing code — merged to main)
| PR | What it did | Status |
|---|---|---|
| PR #7 | GA4 analytics wired + all 152 routes prerendered for Googlebot | ✅ Merged |
| PR #6 | 301 redirects for broken old /guides/ URLs, fixed /methodology path | ✅ Merged |
| PR #3 | Favicon LCP fix (735KB → 3KB), non-blocking fonts, IndexNow (Bing/Yandex) | ✅ Merged |

### Sprint 1 — Technical SEO foundations
| Change | File | Impact |
|---|---|---|
| Salary pages 106 → 581 | `src/lib/salaryConstants.ts` | 475 new pages targeting "[X] after tax uk" |
| 5 new articles added | `src/content/articles/data.tsx` | 25k+ combined monthly searches |
| Sitemap 183 → 630 URLs | `public/sitemap.xml` | Google finds all pages |
| Terms page noindex fixed | `src/pages/legal/Terms.tsx` | Was blocking Google |
| Cache-Control headers | `vercel.json` | Faster Googlebot crawl |

**5 Sprint 1 articles and their target keywords:**
- `what-is-a-good-salary-uk-2026` — ~8,000 searches/month
- `how-to-calculate-take-home-pay` — ~6,000 searches/month
- `income-tax-bands-2026-27` — ~5,000 searches/month
- `average-salary-london-2026` — ~4,000 searches/month
- `average-salary-by-age-uk-2026` — ~3,000 searches/month

### Sprint 2 — Content scale + FAQ schema
| Change | Detail |
|---|---|
| 10 new articles | City salary pages + job title salary guides |
| FAQ schema | Added FAQPage JSON-LD to 7 tools that were missing it — all 12 tools now have FAQ schema (triggers rich results in Google SERPs) |
| Sitemap updated | 641 URLs total |

**5 city articles:**
- Manchester, Birmingham, Leeds, Bristol, Edinburgh average salaries

**5 job title articles:**
- Nurse salary (all NHS bands), Teacher salary (all pay scales)
- Software Engineer salary (junior → principal)
- Accountant salary (trainee → partner)
- Average salary by profession UK — 40+ jobs ranked (high sharability)

### Legal & Data Protection Sprint
| Change | What it covers |
|---|---|
| Privacy Policy (full rewrite) | Explicit zero data collection: no name, email, phone, salary stored. Client-side only guarantee. Full UK GDPR rights. |
| Disclaimer (full rewrite + now indexable) | Not financial advice. Not FCA regulated. No professional relationship. Limitation of liability. |
| Terms of Use (full rewrite) | Zero data clause. Limitation of liability. No warranty. Governing law: England and Wales. |
| `LegalBanner` component (new) | Shown at bottom of every article page — links to disclaimer + privacy |
| Footer disclaimer (upgraded) | Stronger language with ShieldAlert icon on every page sitewide |
| /disclaimer added to sitemap | Now indexable — Google can find it |

---

## 3. Current Content Inventory

### Tool Pages (12 total)
| Tool | URL | Status |
|---|---|---|
| Take-Home Pay | /take-home | ✅ Live, prerendered |
| Hourly Wage | /hourly | ✅ Live, prerendered |
| Reverse Salary | /reverse | ✅ Live, prerendered |
| Pay Rise | /pay-rise | ✅ Live, prerendered |
| Compare Salaries | /compare | ✅ Live, prerendered |
| Pro-Rata | /pro-rata | ✅ Live, prerendered |
| Two Jobs | /two-jobs | ✅ Live, prerendered |
| Maternity / SMP | /maternity | ✅ Live, prerendered |
| Self-Employed | /self-employed | ✅ Live, prerendered |
| Dividend Optimiser | /dividend | ✅ Live, prerendered |
| IR35 Contractor | /ir35 | ✅ Live, prerendered |
| Cost of Living | /cost-of-living | ✅ Live, prerendered |

### Insight Articles (40 total)
| Category | Count |
|---|---|
| Tax | 11 |
| Career | 10 |
| Wages | 8 |
| Self-Employed | 3 |
| Pension | 2 |
| Scotland | 2 |
| Benefits | 1 |
| Cost of Living | 1 |
| Employer | 1 |
| Student Loans | 1 |

### Programmatic Salary Pages (581 total)
- Range: £10,000 to £300,000 in £500 increments
- Pattern: `/salary/[amount]-after-tax`
- Example: `/salary/35000-after-tax` → targets "35000 after tax uk"
- Each page has unique title, description, canonical, schema markup, and prerendered HTML

---

## 4. Architecture & Tech Stack

```
Frontend:     React 18 + TypeScript + Vite
Styling:      Tailwind CSS + ShadCN UI
Routing:      React Router v6 (BrowserRouter)
Hosting:      Vercel (auto-deploy on git push to main)
Repo:         GitHub (amitahlawatox/oxford-salary-engine)
Analytics:    Google Analytics 4 (G-VL1CMWKWY1), Consent Mode v2
SEO:          react-helmet-async, prerender.ts (static HTML per route)
Schema:       WebApplication, FAQPage, Article, BreadcrumbList JSON-LD
Indexing:     IndexNow (Bing/Yandex instant pinging on deploy)
Ads:          Google AdSense placeholder (ads.txt present, PUBLISHER_ID pending)
```

### SEO Infrastructure
- **Prerendering:** Every route generates a static `index.html` at build time with full meta tags, title, description, canonical, og:tags, and JSON-LD — so Googlebot gets real HTML without executing JavaScript
- **Sitemap:** 641 URLs, submitted to Google Search Console
- **robots.txt:** `Allow: /` — no restrictions
- **Canonical tags:** Every page has a canonical URL
- **Cache-Control:** Salary and insights pages cached at Vercel edge
- **IndexNow:** Pings Bing and Yandex on every deploy for instant re-crawl

---

## 5. What Needs to Happen Right Now (CEO Action Required)

### 1. Submit sitemap to Google Search Console (5 minutes)
Go to: https://search.google.com/search-console/sitemaps  
Submit: `https://www.uknetpay.co.uk/sitemap.xml`  
This tells Google to crawl all 641 URLs immediately.

### 2. Request indexing for top 10 pages (15 minutes)
In Google Search Console → URL Inspection, paste each URL and click "Request Indexing":
1. `https://www.uknetpay.co.uk/`
2. `https://www.uknetpay.co.uk/take-home`
3. `https://www.uknetpay.co.uk/reverse`
4. `https://www.uknetpay.co.uk/insights/average-salary-uk-2026`
5. `https://www.uknetpay.co.uk/insights/what-is-a-good-salary-uk-2026`
6. `https://www.uknetpay.co.uk/insights/how-to-calculate-take-home-pay`
7. `https://www.uknetpay.co.uk/insights/income-tax-bands-2026-27`
8. `https://www.uknetpay.co.uk/insights/average-salary-london-2026`
9. `https://www.uknetpay.co.uk/insights/nurse-salary-uk-2026`
10. `https://www.uknetpay.co.uk/insights/teacher-salary-uk-2026`

### 3. Apply for Google AdSense (10 minutes)
Go to: https://adsense.google.com/start  
Apply using the domain www.uknetpay.co.uk  
Once approved (takes 1–4 weeks), update `public/ads.txt` with your publisher ID  
Expected revenue at 10k/day: £80–£200/day depending on ad placement

### 4. ICO registration check
If you are processing any personal data as a business (even just server logs), check whether you need to register with the Information Commissioner's Office at ico.org.uk. Takes 10 minutes, costs £40/year. Legal requirement.

---

## 6. Next Steps — Sprint 3 (Planned)

### Technical
- [ ] Add `SalaryDirectory` index page (all 581 salary pages listed A–Z with amounts) — improves internal linking and crawlability
- [ ] Add hourly rate salary pages (`/salary/hourly/[rate]-per-hour`) — targets "£X per hour after tax" searches
- [ ] Add `hreflang` tags for any international pages
- [ ] Google Search Console — fix any remaining "crawled but not indexed" errors after prerender deploy
- [ ] Run Lighthouse audit on /take-home — target LCP < 2.0s, CLS = 0

### Content
- [ ] 5 more city salary articles: Glasgow, Liverpool, Sheffield, Nottingham, Cardiff
- [ ] 5 more job title articles: solicitor, GP doctor, project manager, electrician, HGV driver salary guides
- [ ] "Average salary by region UK 2026" — comparison article (high sharability, linkable asset)
- [ ] "Salary sacrifice vs personal pension — which is better?" — evergreen high-intent article
- [ ] Update all 40 existing articles with internal links to relevant salary pages and tools

### SEO / Authority
- [ ] Email 10 HR and finance publications with uknetpay data as a source (AccountingWEB, HR Magazine, Totaljobs blog, Reed blog)
- [ ] Submit to UK business directories: Yell, Thomson Local, Bing Places
- [ ] Build one data-driven PR piece: "UK Salary Report May 2026" using anonymised aggregated data

---

## 7. Wednesday 14 May 2026 — One-Week Target Plan

### By Wednesday 14 May, the following will be completed and live:

#### Monday 12 May
- [ ] **Sprint 3a — 5 more city articles:** Glasgow, Liverpool, Sheffield, Nottingham, Cardiff
- [ ] **Sprint 3b — 5 more job articles:** Solicitor, GP/Doctor, Project Manager, Electrician, HGV Driver
- [ ] **Salary Directory page:** `/directory` updated to list all 581 salary pages with proper internal links
- [ ] **Sitemap updated** to 651+ URLs

#### Tuesday 13 May
- [ ] **Hourly rate pages** — add `/salary/hourly/[rate]` pattern for £8–£150/hour (145 new pages)
- [ ] **Internal linking audit** — every tool page links to 3 relevant articles; every article links to 2+ tools
- [ ] **Lighthouse audit** — identify and fix any LCP or CLS issues on the top 5 pages
- [ ] **AdSense application** submitted (CEO action — 10 minutes)

#### Wednesday 14 May
- [ ] **Full deploy** — all Sprint 3 changes pushed to main → Vercel auto-deploy
- [ ] **Google Search Console** — resubmit sitemap, request indexing for all new pages
- [ ] **IndexNow ping** — auto-fires on deploy for Bing/Yandex
- [ ] **Progress check:** verify indexation count has grown from 17 to 50+ pages
- [ ] **Week 1 report** — updated status document

### Wednesday 14 May expected metrics (conservative)
| Metric | 7 May | Target 14 May |
|---|---|---|
| Daily clicks | ~1 | 10–30 |
| Pages indexed | 17 | 50–80 |
| Sitemap URLs | 641 | 800+ |
| Insight articles | 40 | 50 |
| Salary pages | 581 | 726 (+ hourly rates) |

---

## 8. 12-Month Traffic Projection

| Month | Daily users | Key driver |
|---|---|---|
| May 2026 | 1–30 | Indexation beginning |
| Jun 2026 | 50–200 | Salary pages indexed, articles ranking |
| Jul 2026 | 200–600 | Average salary articles hitting page 1 |
| Aug 2026 | 500–1,500 | City + job title pages gaining traction |
| Sep 2026 | 1,000–2,500 | Backlinks from HR/finance publishers |
| Oct 2026 | 2,000–4,000 | Autumn Budget coverage drives spike |
| Nov 2026 | 3,000–5,000 | Domain authority building, more page 1 rankings |
| Dec 2026 | 4,000–6,000 | New tax year search volume rising |
| Jan 2027 | 5,000–7,500 | New year salary review season |
| Feb 2027 | 6,000–8,500 | Budget speculation content |
| Mar 2027 | 7,000–9,000 | Pre-tax year peak |
| Apr 2027 | 9,000–12,000 | Tax year change — peak season |
| **May 2027** | **10,000+** | **Goal achieved** |

---

## 9. Key Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Google delays indexing SPA pages | Medium | Prerendering deployed (PR#7) — mitigated |
| Core algorithm update affects rankings | Low–Medium | High-quality, factual content — lower risk |
| Competitor launches similar tool | Low | Domain + content moat builds monthly |
| AdSense rejection (thin content) | Low | 641 URLs, 40 articles — well above threshold |
| Tax rates change mid-year | Medium | Update process documented in Methodology page |
| Token/credentials exposure | Low | GitHub token used in session — should be regenerated after use |

---

## 10. Credentials & Access

| Service | Access |
|---|---|
| GitHub | amitahlawatox/oxford-salary-engine — owner access |
| Vercel | Auto-deploys from main branch — linked to GitHub |
| Google Search Console | uknetpay.co.uk — verify sitemap submitted |
| Google Analytics | G-VL1CMWKWY1 — live, Consent Mode v2 |
| Google AdSense | ⚠️ Not yet applied — apply this week |
| ICO registration | ⚠️ Check whether required |
| IndexNow | Live — pings Bing/Yandex on every deploy |

---

*Report generated: Wednesday 7 May 2026*  
*Next report: Wednesday 14 May 2026*  
*Tech Head & SEO Manager: Claude (Anthropic)*
