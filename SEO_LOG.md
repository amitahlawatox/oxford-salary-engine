# SEO_LOG.md — UKNet Pay Strategic Audit Log

## Entry: 2026-06-09 — SEMrush Pro Data Audit (Baseline)

**Source:** SEMrush API (Pro trial), Google Search Console exports
**Domain:** uknetpay.co.uk
**Raw data:** `data/semrush-2026-06-09/`

---

### DOMAIN OVERVIEW

| Metric | uknetpay.co.uk | thesalarycalculator.co.uk | listentotaxman.com | taxcalculate.co.uk |
|--------|---------------|--------------------------|--------------------|--------------------|
| SEMrush Rank | 3,125,822 | 1,170 | 4,125 | 40,164 |
| Organic Keywords | 854 | 19,133 | 5,981 | 2,086 |
| Est. Monthly Traffic | 4 | 583,889 | 159,491 | 11,981 |
| Backlinks | 1 | 12,340 | 5,330 | 201 |
| Referring Domains | 1 | 2,589 | 1,296 | 96 |

**Reality check:** We have 854 keywords indexed but essentially zero traffic. The backlink gap is the #1 bottleneck — 1 referring domain vs 2,589 for the incumbent. No amount of on-page optimization will overcome a 2,589:1 authority deficit alone.

---

### STRIKING DISTANCE KEYWORDS (Positions 1-20)

Only 5 keywords are currently in striking distance of page 1:

| Keyword | Position | Monthly Volume | URL |
|---------|----------|---------------|-----|
| 35500 after tax | 11 | 210 | /salary/35500-after-tax |
| 39500 after tax | 17 | 110 | /salary/39500-after-tax |
| uk reverse tax calculator | 18 | 110 | /reverse |
| calc take home pay | 18 | 140 | / (homepage) |
| 17500 after tax | 20 | 110 | /salary/17500-after-tax |

**Total striking distance volume: ~680/month.** These need to be pushed to top 5.

---

### HIGH-VOLUME KEYWORD OPPORTUNITIES (Positions 21-50)

These are the biggest medium-term wins — page 2-5, achievable in 3-6 months with content improvements + backlinks:

| Keyword | Position | Monthly Volume | URL | Notes |
|---------|----------|---------------|-----|-------|
| net wage calculator | 35 | 2,900 | / | **Best opportunity** — already position 35 |
| 28000 after tax | 48 | 3,600 | /salary/27000-after-tax | **Wrong URL ranking** — should be /salary/28000 |
| wage calculator after tax | 48 | 2,400 | / | Homepage competing |
| 28000 after tax uk | 49 | 1,600 | /salary/27000-after-tax | Wrong URL again |
| 27500 after tax | 28-35 | 1,000 | /salary/27500-after-tax | Close to page 1 |
| 31k after tax | 45 | 1,300 | /salary/31000-after-tax | |
| wage uk calculator | 42 | 1,300 | / | |
| 26500 after tax | 32-41 | 880 | various | |
| 39k after tax | 39 | 880 | /salary/39000-after-tax | |
| 72000 after tax | 42 | 480 | /salary/72000-after-tax | |
| 44000 after tax uk | 37 | 480 | /salary/44000-after-tax | |
| daycare cost | 38 | 480 | /childcare | Unexpected — good sign |
| 33k after tax uk | 34 | 720 | /salary/33000-after-tax | |

**Total page 2-5 volume: ~18,000/month.** Moving even half of these to page 1 would 10x current traffic.

---

### BIGGEST VOLUME MISSES (Positions 51-100)

These keywords have massive search volume but we're invisible (page 6+):

| Keyword | Position | Monthly Volume | Gap to Page 1 |
|---------|----------|---------------|----------------|
| pro rata | 89 | 14,800 | Competitor #1 for this |
| uk tax bands | 55-86 | 14,800 | Article exists, needs authority |
| tax bands | 78 | 9,900 | Same article |
| pro rata calculator | 66 | 8,100 | Tool exists at /pro-rata |
| uk income tax bands | 86 | 8,100 | Same article |
| 60k after tax uk | 66 | 6,600 | /salary/60000-after-tax |
| take home pay from wages | 88 | 6,600 | Homepage |
| 45000 after tax | 73 | 4,400 | /salary/45500-after-tax (wrong!) |
| salary prorated calculator | 82 | 4,400 | /pro-rata |
| 70k after tax uk | 66 | 3,600 | /salary/70500-after-tax |
| paye calculator uk | 83 | 3,600 | Homepage |
| hourly wage calculator uk | 59 | 2,900 | /hourly |
| contractor calculator uk | 79 | 1,900 | /contractor/take-home |

**Combined volume: 100,000+/month.** This is the long-tail goldmine we're sitting on but not capturing.

---

### CRITICAL ISSUES FOUND

#### 1. BACKLINK CRISIS (Severity: CRITICAL)
- **1 backlink from 1 domain** (a Brazilian property blog)
- Competitors have 96-2,589 referring domains
- Without backlinks, Google will not promote any page above position 30 for competitive keywords
- **Action:** This is the single most impactful thing to fix. Need 50+ quality referring domains in the next 6 months.

#### 2. URL MISMATCH / CANNIBALIZATION (Severity: HIGH)
SEMrush shows Google ranking `www.uknetpay.co.uk` URLs alongside `uknetpay.co.uk` URLs for the same keywords. This confirms the canonical conflict we fixed in PR #15, but the data shows Google still has both versions indexed:
- "net wage calculator" → `https://www.uknetpay.co.uk/` (pos 35)
- "salary calculator tax" → `https://www.uknetpay.co.uk/` (pos 80 AND 82)
- "take home pay monthly calculator" → `https://www.uknetpay.co.uk/` (pos 68 AND 76)
- Multiple salary pages showing www.* variants

**Action:** The 301 redirect fix is deployed. Request re-indexing in Search Console for all affected URLs. This cannibalization is splitting ranking signals between two URL versions.

#### 3. WRONG SALARY PAGES RANKING (Severity: MEDIUM)
Several keywords are matching the wrong salary page:
- "28000 after tax" → ranking /salary/**27000**-after-tax (wrong!)
- "45000 after tax" → ranking /salary/**45500**-after-tax (wrong!)
- "25000 after tax" → ranking /salary/**255000**-after-tax (VERY wrong!)
- "25k after tax" → ranking /salary/**255000**-after-tax
- "23k after tax" → ranking /salary/**233000**-after-tax
- "80000 after tax uk" → ranking /salary/**86000**-after-tax

**Action:** These pages exist at the correct URLs (/salary/28000-after-tax, etc). The wrong pages ranking suggests internal linking or sitemap issues. Verify these correct URLs are in the sitemap and have proper internal links from adjacent pages.

#### 4. HOMEPAGE KEYWORD DILUTION (Severity: MEDIUM)
The homepage (/) is trying to rank for 30+ different keyword intents simultaneously — from "paye calculator uk" to "wages calculator" to "take home pay from wages". It's not focused enough to rank well for any single one.

**Action:** Create dedicated landing pages or ensure the /take-home page captures calculator-intent keywords, while the homepage focuses on brand + navigational queries.

---

### COMPETITOR INTELLIGENCE

**thesalarycalculator.co.uk** dominates with:
- #1 for "salary calculator" (368,000/mo)
- #1 for "take home pay calculator" (301,000/mo)
- #1 for "salary calculator uk" (90,500/mo)
- #1 for "pro rata calculator" (8,100/mo)
- #1 for "hourly wage calculator" (9,900/mo)
- 2,589 referring domains providing massive authority

**What they DON'T have that we do:**
- No "after tax" salary-specific landing pages (their traffic is all through one page)
- No editorial content (no /insights/ equivalent)
- No specialized tools (no IR35, contractor, childcare, EV calculators)
- Dated UI and no privacy-first messaging

**Our competitive advantage:** Breadth of tools and content. Their weakness is a single-page architecture. Our 661+ pages give us more surface area to capture long-tail keywords — but only if we build enough authority.

---

### PRIORITY ACTION PLAN

#### WEEK 1 (Immediate — during SEMrush trial)
1. ✅ Fixed www→non-www canonical (PR #15, merged)
2. Request re-indexing for all www.* URLs in Search Console
3. Fix wrong salary page URLs ranking (verify /salary/28000, /salary/45000, /salary/25000 are in sitemap correctly)
4. Export and save all SEMrush data before trial expires

#### MONTH 1 (Backlink Foundation)
5. Target 10 referring domains from UK personal finance blogs
6. Submit to financial tool directories (AllTop, Product Hunt, etc.)
7. Pitch guest posts to HR/payroll blogs using Oxford methodology angle
8. Create shareable infographics from salary data (linkbait)

#### MONTHS 2-3 (Content Optimization)
9. Optimize /pro-rata page content — "pro rata calculator" has 8,100/mo volume and we're at pos 66
10. Strengthen /insights/uk-tax-bands-explained-2026 — 14,800/mo volume, pos 55
11. Improve /hourly page — "hourly wage calculator uk" has 2,900/mo, pos 59
12. Add FAQ schema to top 20 pages for SERP real estate

#### MONTHS 3-6 (Authority Building)
13. Target 50 referring domains total
14. Build .ac.uk backlinks (Oxford methodology angle)
15. Launch HARO responses for tax/salary journalist queries
16. Create data studies (e.g., "Average Take-Home Pay by Region 2026") for PR backlinks

---

### RAW DATA REFERENCE

All SEMrush CSV exports saved to: `data/semrush-2026-06-09/`
- `semrush_organic_keywords.csv` — top 100 keywords by traffic share
- `semrush_keywords_by_volume.csv` — all 500 keywords by search volume
- `semrush_striking_distance.csv` — keywords in positions 1-20
- `semrush_page2to5.csv` — keywords in positions 21-50
- `semrush_competitors.csv` — organic competitor list
- `semrush_competitor_keywords.csv` — thesalarycalculator.co.uk top keywords
- `semrush_backlinks_overview.csv` — backlink summary
- `semrush_backlinks_detail.csv` — individual backlinks
- `semrush_homepage_keywords.csv` — keywords ranking to homepage

---

*Next entry: After backlink campaign begins. Re-pull SEMrush data if trial still active.*

---

## Entry: 2026-06-19 — Keyword Intelligence Analysis (780 Keywords)

**Source:** 9 SEMrush keyword export files (keywords, suggestions, ideas, very-easy)
**Total keywords analyzed:** 1,900 raw → 780 unique (after dedup) → 737 with volume data

---

### EXECUTIVE SUMMARY

| Bucket | Keywords | Total Volume/mo | Description |
|--------|----------|-----------------|-------------|
| QUICK WIN | 79 | 148,680 | KD ≤ 20, Vol ≥ 500 — attack immediately |
| EASY PICKUP | 203 | 39,760 | KD ≤ 20, Vol ≥ 100 — low-hanging fruit |
| MEDIUM TERM | 45 | 75,400 | KD 21-40, Vol ≥ 1,000 — 3-6 month targets |
| MEDIUM EASY | 94 | 30,010 | KD 21-40, Vol ≥ 100 — secondary targets |
| LONG TERM HIGH VOL | 48 | 235,200 | KD 40+, Vol ≥ 1,000 — need authority first |
| LOW PRIORITY | 268 | 60,180 | Everything else |
| **TOTAL** | **737** | **589,230** | |

**Key finding:** 282 keywords (QUICK WIN + EASY PICKUP) have KD ≤ 20 and represent 188,440/month of search volume. These are winnable with content improvements alone — no backlinks required.

---

### TOP 20 QUICK WINS (Highest Priority Score)

Priority Score = `(Volume × Click_Potential%) / (KD + 1)`

| Score | Keyword | Volume/mo | KD | Target Page |
|-------|---------|-----------|----|-------------|
| 729 | pro rata salary calculator | 8,100 | 9 | /pro-rata |
| 524 | pro rata calculator | 9,900 | 16 | /pro-rata |
| 349 | 40000 after tax | 6,600 | 16 | /salary/40000-after-tax |
| 349 | 40k after tax | 6,600 | 16 | /salary/40000-after-tax |
| 313 | 50k after tax uk | 6,600 | 18 | /salary/50000-after-tax |
| 304 | 40k after tax uk | 5,400 | 15 | /salary/40000-after-tax |
| 286 | 30k after tax uk | 5,400 | 16 | /salary/30000-after-tax |
| 264 | nhs salary calculator | 4,400 | 14 | /nhs (NEW PAGE) |
| 249 | 50k after tax | 3,600 | 12 | /salary/50000-after-tax |
| 238 | nhs take home pay calculator | 6,600 | 24 | /nhs (NEW PAGE) |
| 233 | 30000 after tax | 4,400 | 16 | /salary/30000-after-tax |
| 233 | 30000 after tax uk | 4,400 | 16 | /salary/30000-after-tax |
| 222 | salary take home calculator | 12,100 | 48 | /take-home |
| 211 | 60000 after tax uk | 2,900 | 14 | /salary/60000-after-tax |
| 211 | 40000 after tax uk | 2,900 | 15 | /salary/40000-after-tax |
| 194 | inside ir35 calculator | 5,400 | 13 | /ir35 |
| 176 | 50000 after tax | 2,400 | 11 | /salary/50000-after-tax |
| 170 | 25000 after tax uk | 2,900 | 14 | /salary/25000-after-tax |
| 168 | ir35 calculator | 4,400 | 16 | /ir35 |
| 165 | 45000 after tax uk | 2,400 | 12 | /salary/45000-after-tax |

---

### NEW PAGE OPPORTUNITIES

Pages that don't exist yet but have significant keyword volume:

| New Page | Keywords | Total Volume/mo | Avg KD | Status |
|----------|----------|-----------------|--------|--------|
| **/bonus** — Bonus Tax Calculator | 93 | 48,600 | 41 | **HIGH PRIORITY** — biggest new page opportunity |
| **/salary-sacrifice** — Generic Calculator | 9 | 13,750 | 21 | Expand existing /salary-sacrifice/electric-car |
| **/nhs** — NHS Pay Calculator | 4 | 11,200 | 13 | **EASY WIN** — low KD, high volume |
| **/umbrella** — Umbrella Company Calculator | 16 | 5,340 | 11 | **EASIEST WIN** — very low KD |
| **/day-rate** — Day Rate Calculator | 4 | 2,060 | 18 | Quick build |

**Combined new page volume: 80,950/month** — that's 20x our current total traffic from just 5 new pages.

---

### EXISTING PAGE KEYWORD VOLUME

How much search volume each existing tool page can capture:

| Page | Keywords | Volume/mo | Top Keyword |
|------|----------|-----------|-------------|
| /take-home | 263 | 243,330 | "uk salary calculator" (40,500) |
| /salary/X-after-tax | 77 | 93,110 | "40000 after tax" (6,600) |
| /hourly | 49 | 53,830 | "figure salary to hourly" (2,400) |
| /bonus (NEW) | 82 | 43,310 | "bonus tax calculator" (2,400) |
| /pro-rata | 14 | 27,870 | "pro rata calculator" (9,900) |
| /ir35 | 17 | 15,730 | "inside ir35 calculator" (5,400) |
| /salary-sacrifice | 9 | 13,750 | "salary sacrifice calculator" (8,100) |
| /nhs (NEW) | 4 | 11,200 | "nhs take home pay calculator" (6,600) |
| /contractor/take-home | 22 | 7,490 | "contractor calculator" (2,400) |
| /umbrella (NEW) | 13 | 4,800 | "umbrella company calculator" (1,300) |
| /dividend | 12 | 3,780 | "tax and dividend calculator" (1,000) |
| /day-rate (NEW) | 3 | 1,800 | "day rate calculator" (1,300) |
| /two-jobs | 7 | 1,570 | "do you get taxed more on second job" (480) |

---

### PRIORITY ACTION PLAN (Updated)

#### PHASE 1 — Quick Wins (This Week)
1. Build `/nhs` page — NHS Pay Calculator (11,200/mo volume, KD 13)
2. Build `/umbrella` page — Umbrella Company Calculator (5,340/mo, KD 11)
3. Build `/day-rate` page — Day Rate Calculator (2,060/mo, KD 18)
4. Optimize `/pro-rata` page title + H1 for "pro rata salary calculator" (8,100/mo, KD 9)
5. Optimize `/ir35` page for "inside ir35 calculator" (5,400/mo, KD 13)
6. Add FAQ schema to all tool pages

#### PHASE 2 — Medium Priority (Next 2 Weeks)
7. Build `/bonus` page — Bonus Tax Calculator (48,600/mo, KD 41 — harder but massive volume)
8. Expand `/salary-sacrifice/electric-car` to generic `/salary-sacrifice` (13,750/mo, KD 21)
9. Optimize all salary landing pages for "[X]k after tax" keywords
10. Internal linking overhaul between all tool pages

#### PHASE 3 — Authority Building (Ongoing)
11. Backlink campaign for /take-home and /pro-rata (highest volume pages)
12. Content depth improvements on homepage
13. Target "salary calculator" head terms (40,500/mo, KD 61 — needs authority)

---

### RAW DATA

- `data/semrush-2026-06-09/keywords_deduped_780.csv` — all 780 unique keywords with volume, KD, CPC, intent
- `data/semrush-2026-06-09/quick_wins_kd_under_30.csv` — 447 keywords with KD < 30
- `data/semrush-2026-06-09/keyword_mapping.csv` — keyword-to-page mapping with match types

---

*Next entry: After Phase 1 new pages are built.*
