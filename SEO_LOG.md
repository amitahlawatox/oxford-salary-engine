# SEO_LOG.md — UKNet Pay Strategic Audit Log

---

## Entry: 2026-06-09 — Chief SEO & Monetization Audit (Baseline)

### Status: EARLY-STAGE GROWTH — 2.6 clicks/day vs. 10,000/day target

---

### DATA SNAPSHOT (Search Console, 3 months: Apr 9 – Jun 7, 2026)

| Metric | Value |
|--------|-------|
| Total clicks (3mo) | 98 |
| Total impressions (3mo) | 31,256 |
| Overall CTR | 0.31% |
| Avg daily clicks | 2.6 |
| Avg daily impressions (recent) | ~700 |
| Indexed pages | 732 |
| Not indexed pages | 892 |
| "Discovered – not indexed" | 501 |
| Pages with redirect issues | 208 |
| Canonical conflicts | 158 |
| Top page (insights/average-salary-uk-2026) | 23 clicks, pos 5.56 |
| Main tool page (/) | 4 clicks, pos 57.46 |
| UK traffic share | 78/98 clicks (79.6%) |
| Mobile vs Desktop | 65 vs 33 clicks |

### KEY KEYWORD POSITIONS (3-month avg)

| Keyword | Impressions | Position | Clicks |
|---------|-------------|----------|--------|
| salary calculator | 98 | 68.7 | 0 |
| take home pay calculator | 96 | 58.6 | 0 |
| uk salary calculator | 91 | 57.7 | 0 |
| average uk salary 2026 | 135 | 5.0 | 0 |
| uk tax calculator 2026 | 73 | 9.9 | 0 |
| reverse salary calculator | 62 | 9.7 | 0 |
| net pay calculator | 64 | 45.5 | 1 |

### MARKET SIZE (SEMrush verified, UK monthly volumes)

| Keyword cluster | Monthly UK searches |
|----------------|-------------------|
| "take home pay calculator" | 301,000 |
| "salary calculator" | 450,000 |
| "salary calculator uk" | 90,500 |
| "tax calculator" | 246,000 |
| Long-tail salary/pension/childcare | ~200,000 |
| **Aggregate addressable** | **~1.3M searches/mo** |

### INDEXING HEALTH

- 732 pages indexed, 892 blocked/pending
- 501 pages in "Discovered – currently not indexed" limbo
- 208 redirect chain errors (likely www/non-www or old URL patterns)
- 158 canonical conflicts (Google chose different canonical)
- Net: Google is only serving ~45% of the site

### COVERAGE GROWTH TRAJECTORY

- Apr 10: 2 indexed → May 5: 551 indexed → Jun 1: 732 indexed
- Impressions surged from 0 to 2,307/day peak (May 19) then settled to ~700/day
- This is classic "new site sandbox" behavior — Google is still evaluating

---

### AUDIT FINDINGS

**Note:** `SEO_LOG.md` did not previously exist in this repo. `seo_skills.py` also does not exist yet (unlike the uk-mortgage-compass repo). These need to be created for automated auditing.

**Structural SEO issues identified from code review:**
1. Main calculator pages (/, /hourly, /pro-rata, /childcare, /ir35) rank at position 50-90 — effectively invisible
2. Insights/editorial pages rank well (pos 4-10) but tool pages do not
3. 501 programmatic salary pages still in "Discovered – not indexed" — Google hasn't allocated crawl budget
4. www vs non-www duplication (both versions appearing in Search Console)
5. Redirect chain issues (208 pages) likely from previous hotfix removing apex→www redirect

---

### STRATEGIC REPORT

#### Q1: WHY ARE WE STUCK?

**Root causes (in severity order):**

1. **Domain Authority = Zero.** Site launched ~8 weeks ago. No backlinks. Google's sandbox period for new finance domains is 3-6 months minimum. You're in month 2.

2. **Crawl Budget Starvation.** 501 pages "Discovered – not indexed" means Google found your sitemap URLs but hasn't bothered crawling them yet. With 1,600+ pages and zero authority, Google is rationing crawl budget heavily.

3. **Redirect/Canonical Chaos.** 208 redirect errors + 158 canonical conflicts = Google is confused about which URL is canonical. The previous hotfix removing apex→www redirect left orphaned redirect chains.

4. **Tool Pages Have No Topical Authority Signal.** Your /take-home, /hourly, /pro-rata pages rank at position 57-93 because they're thin tool pages with no supporting content cluster linking to them. Compare: your insights articles (which have 1,500+ words of contextual content) rank at position 4-10.

5. **No Internal Link Architecture.** Programmatic /salary/XXXXX-after-tax pages likely have minimal internal links pointing to the main calculator. They should funnel authority upward.

#### Q2: IS 10K DAILY USERS MATHEMATICALLY REALISTIC?

**Short answer: Yes, but not in 6 months. Realistic in 18-24 months.**

The math:
- Total addressable UK salary/tax keyword market: ~1.3M searches/month = ~43,000/day
- 10k/day = 23% market share of all UK salary calculator searches
- thesalarycalculator.co.uk (the current #1) gets ~300k visits/month = ~10k/day

**So you're essentially asking: "Can we become thesalarycalculator.co.uk?"**

It's possible because:
- The incumbent is dated (old design, no mobile-first, no privacy story)
- Your content quality is higher (proper 2026/27 rates, Scottish bands, salary sacrifice)
- Your programmatic pages (700+ salary-specific landing pages) are a legitimate moat

It's difficult because:
- thesalarycalculator.co.uk has 15+ years of domain authority
- listentotaxman.com, moneysavingexpert.com, and gov.uk also compete
- You need ~50-100 quality backlinks before Google trusts your calculations

**Realistic trajectory:**
- Month 6 (Dec 2026): 50-100 clicks/day (if indexing issues fixed)
- Month 12 (Jun 2027): 500-1,000 clicks/day (if backlink campaign works)
- Month 18 (Dec 2027): 2,000-5,000 clicks/day
- Month 24 (Jun 2028): 8,000-12,000 clicks/day (target zone)

#### Q3: PRIVACY REVENUE ENGINE — £10k/month Blueprint

**Target: £33.33 RPM on 300,000 monthly visits**

Given your zero-cookie constraint, here's the realistic revenue stack:

| Channel | RPM contribution | Monthly revenue at 300k visits | Timeline |
|---------|-----------------|-------------------------------|----------|
| Carbon Ads / EthicalAds | £4-8 RPM | £1,200-2,400 | Month 6+ |
| IFA/Accountancy sponsorship slots | £10-15 RPM | £3,000-4,500 | Month 12+ |
| White-label widget licensing | £8-12 RPM (equivalent) | £2,400-3,600 | Month 18+ |
| Affiliate (pensions, ISAs) | £5-8 RPM | £1,500-2,400 | Month 12+ |
| **Blended total** | **£27-43 RPM** | **£8,100-12,900** | **Month 24** |

**Critical path to £10k/month:**
1. Carbon Ads alone won't do it — they pay £2-4 CPM for finance audiences (contextual)
2. The real money is B2B: recruitment agencies and IFAs will pay £500-2,000/month for a "Powered by UKNetPay" calculator widget on their site
3. One mid-tier recruitment agency deal (£1,500/month) = 4,500 Carbon Ads impressions worth of revenue
4. Target: 3-5 white-label clients at £1,000-2,000/month = £5,000-10,000/month baseline before ads

**Most realistic path:** White-label licensing + 2-3 IFA sponsorships hits £10k before pure advertising ever could.

#### Q4: THE 2-YEAR ROADMAP

**Q3 2026 (NOW → Sep):**
- [ ] Fix 208 redirect chain errors (www/non-www consolidation)
- [ ] Fix 158 canonical conflicts
- [ ] Create `seo_skills.py` automated audit script for this repo
- [ ] Submit URL inspection for top 50 "Discovered – not indexed" pages
- [ ] Build 10 HARO/digital PR backlinks to /insights/ articles
- [ ] Add FAQ schema + HowTo schema to ALL tool pages
- [ ] Internal linking: every /salary/X-after-tax page must link to /take-home

**Q4 2026 (Oct → Dec):**
- [ ] Target: 500+ indexed pages, 50-100 clicks/day
- [ ] Launch Carbon Ads integration (privacy-first, no cookies)
- [ ] Create "Employer NI Calculator" and "Salary Sacrifice Calculator" as separate tools (high-volume queries you're missing)
- [ ] Pitch 5 IFA firms for £500/month sponsorship slots
- [ ] Build 20+ backlinks via guest posts on HR/payroll blogs

**Q1 2027 (Jan → Mar):**
- [ ] Target: 200-500 clicks/day
- [ ] Launch white-label API documentation
- [ ] Sign first 2 recruitment agency white-label clients
- [ ] Add "Compare Salary By City" tool (captures "average salary [city]" queries)
- [ ] Implement breadcrumb schema across all programmatic pages

**Q2 2027 (Apr → Jun):**
- [ ] Target: 500-1,000 clicks/day (tax year changeover traffic spike)
- [ ] Sign 3-5 white-label clients (£5,000-10,000/month revenue)
- [ ] Launch Chrome extension (like mytakehome.co.uk competitor)
- [ ] Push into Scottish-specific tax content (underserved niche)

**Q3 2027 → Q2 2028:**
- [ ] Scale to 2,000-5,000 clicks/day
- [ ] Expand tool suite: IR35, Dividend, EV salary sacrifice calculators as standalone SEO targets
- [ ] Build authority with .ac.uk/edu backlinks (Oxford methodology angle)
- [ ] Target £10k/month revenue milestone

---

### BLUNT BOTTOM LINE

You're at 2.6 clicks/day trying to reach 10,000. That's a 3,846x multiplier. The market size supports it (43k searches/day in your space), but you're fighting 15-year-old incumbents with zero domain authority.

**The good news:** Your content is genuinely better than thesalarycalculator.co.uk. Your programmatic pages are a real moat. The privacy angle is differentiated.

**The bad news:** You have 208 broken redirects, 501 unindexed pages, and zero backlinks. Google doesn't trust you yet — and it won't for another 4-6 months minimum.

**Priority #1 right now:** Fix the technical crawl issues (redirects + canonicals). Every day those 501 pages sit in "Discovered – not indexed" is a day of lost compounding.

---

*Audit performed: 2026-06-09 | Data sources: Google Search Console (3mo + 7d + 24h), Coverage report, SEMrush competitor data*
