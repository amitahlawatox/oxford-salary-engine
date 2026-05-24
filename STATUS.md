# uknetpay.co.uk — Week 3 Status Report
### Advisor Board Review + Tech Lead Response
**Date:** Saturday 24 May 2026  
**Site age:** 44 days (first indexed 10 Apr 2026)  
**Goal:** 10,000 daily users  

---

## 1. Where We Are Right Now — Raw Numbers

| Metric | 7 May (week 0) | 14 May (week 1) | 24 May (week 3) | Trend |
|---|---|---|---|---|
| Daily impressions | 30–55 | 500–1,552 | 980–1,702 | ✅ Growing |
| Daily clicks | ~1 | 2–8 | 1–5 (avg 3) | 🟡 Flat |
| Pages indexed | 17 | 551 | 547 | 🟡 Stable |
| CTR | 0.4% | 0.2% | 0.13–0.38% | 🔴 Declining |
| Avg position | 19 | 19 | 19–44 | 🔴 Diluted by new pages |
| GA4 active users (28d) | 6 | 6 | 7 | 🔴 Essentially flat |
| Articles | 25 | 40 | 43 | ✅ Growing |
| Sitemap URLs | 183 | 641 | 652 | ✅ Growing |

---

## 2. Advisor Board Recommendations — Verified Against Data

### Claim 1: "average-salary-uk-2026 pulled 1,306 impressions at position 4.86"
- **GSC data:** 1,306 impressions, 7 clicks, 0.54% CTR, position 4.86
- **VERIFIED ✅** — numbers are exactly correct
- **My addition:** 0.54% CTR at position 4.86 is below average. A position 5 page should deliver 3–5% CTR. The title and description could be stronger, but the real issue is we rank for many long-tail variations of "average salary" where we appear lower.

### Claim 2: "salary calculator" stuck at position 63.46
- **GSC data:** 56 impressions, 0 clicks, position 63.46
- **VERIFIED ✅** — exactly correct

### Claim 3: "uk salary calculator" stuck at position 47.53
- **GSC data:** 34 impressions, 0 clicks, position 47.53
- **VERIFIED ✅** — exactly correct

### Claim 4: "take home pay calculator" stuck at position 51.10
- **GSC data:** 51 impressions, 0 clicks, position 51.10
- **VERIFIED ✅** — exactly correct

### Claim 5: "Google is treating programmatic application pages as thin content because they lack internal link weight"
- **PARTIALLY DISAGREE ⚠️**
- The salary pages are NOT thin content — they have prerendered HTML with unique titles, meta descriptions, schema markup, and full calculation breakdowns. Many salary pages are ranking at positions 1–10 already (e.g., £73,500 at position 2.06, £86,500 at position 1.8).
- The real reason the TOOL pages rank at position 50–75 is **domain authority = zero**. This is a 44-day-old domain with zero external backlinks competing against thesalarycalculator.co.uk (DA 60+), listentotaxman.com (DA 50+), and gov.uk (DA 95). No amount of internal linking moves "salary calculator" from position 63 to position 5 without backlinks.
- **However** — the advisor is right that internal linking is weak. More internal links from articles to tools WILL help, just not enough to close a 60-position gap alone.

---

## 3. Advisor's Three Recommendations — My Assessment

### Recommendation 1: "Bento-Style Mini Calculator" inside average-salary article
**AGREE ✅ — this is a smart tactical move**

Why it works:
- The average salary article is our #1 page (1,306 impressions, position 4.86)
- If a user lands on that article and sees an embedded calculator, they interact with it without navigating away
- This increases engagement time (Google measures this), reduces bounce rate (currently tracking at 0% for this page in GA4 which seems suspicious), and creates a conversion path
- It also sends a signal to Google that this URL is highly interactive, not just editorial

What I'll build:
- A compact interactive salary calculator component (enter salary → see take-home) embedded directly in the article body
- Links from the mini-calc to /take-home for the full tool
- This should also be replicated on every city article (Manchester, London, Birmingham, etc.)

### Recommendation 2: "Strategic Sidebar" with deep internal links in regional hubs
**AGREE ✅ — but I'd do it differently**

The advisor says "sidebar." I would not build a literal sidebar — that's a design pattern that Google has learned to devalue (sidebar links carry less weight than in-content links). Instead:

What I'll build:
- Contextual deep links woven INTO the article body text (not a sidebar widget)
- At the bottom of each city article: a "calculate your exact take-home in [city]" section with direct links to the /take-home tool AND 3–5 relevant salary pages (e.g., Manchester article links to /salary/35000-after-tax, /salary/40000-after-tax, /salary/50000-after-tax)
- Cross-links between city articles ("See also: Average salary in London, Leeds, Birmingham")
- This passes PageRank through contextual, in-content links — much more valuable than sidebar navigation

### Recommendation 3: "Anchor the Legal Shield within tool blocks"
**ALREADY DONE ✅**

This was completed in the YMYL Security Sprint:
- `ResultDisclaimer` component hard-coded into every result card on all 13 pages (12 tools + salary page)
- Statutory text: "Simulation only. Illustrative estimate based on standard 2026/27 HMRC rates. Not tax or financial advice."
- `ShareSummary` appends disclaimer to all shared/copied text
- Footer disclaimer on every page site-wide
- No further action needed

---

## 4. What the Advisor Missed — Three Critical Issues

### Issue 1: www redirect is STILL broken (splitting domain authority in half)
**This is arguably the most damaging technical problem right now.**

GSC data shows non-www URLs still getting impressions:
| URL | Impressions | Position |
|---|---|---|
| `uknetpay.co.uk/insights/pension-auto-enrolment-2026` | 193 | 6.10 |
| `uknetpay.co.uk/insights/scottish-income-tax-bands-2026-27` | 62 | 69.52 |
| `uknetpay.co.uk/reverse` | 23 | 27.65 |
| `http://uknetpay.co.uk/` | 16 | 57.19 |
| `uknetpay.co.uk/guides/april-2026-guide` | 8 | 6.75 |

Google is treating `uknetpay.co.uk` and `www.uknetpay.co.uk` as two different websites. Every link, every impression, every ranking signal is being split between them. This is like running two shops with the same stock — neither gets the full footfall.

**Root cause:** The vercel.json redirect I added on May 14 may not be triggering correctly, or Vercel's redirect handling has a gap. This needs to be investigated and fixed at the Vercel/DNS level, not just vercel.json.

**Fix required:**
- Verify the www redirect is actually returning 301 (not 302)
- Check Vercel domain settings — both `uknetpay.co.uk` and `www.uknetpay.co.uk` must be configured, with non-www redirecting to www
- Submit the non-www property separately in Google Search Console and set the canonical domain preference

### Issue 2: Employer NI article — 840 impressions, 0 clicks, position 8.49
**This is the single biggest missed opportunity in the entire site.**

At position 8.49, expected CTR is 1–2%. With 840 impressions that's 8–17 clicks we're losing per week from this one page. The title was fixed on May 14 but Google has not re-crawled it yet (or the fix didn't deploy correctly).

**Action:** Verify the deployed HTML at `www.uknetpay.co.uk/insights/employer-ni-guide-2026` has the updated title. If yes, request re-indexing in GSC. If not, the build may have failed.

### Issue 3: GA4 is tracking almost exclusively international users
**The GA4 data is showing 7 users in 28 days, with cities: Delhi, Seoul, Imus (Philippines), Bangar (Brunei). Zero UK cities.**

This contradicts the GSC data which shows UK-focused queries and UK-relevant content. Either:
- The GA4 tag (`G-YP9EYMGCSY`) was recently changed and UK tracking data is lost in the transition
- UK users have higher ad-blocker / consent-rejection rates, so GA4 undercounts them
- The consent banner is blocking GA4 for most users (analytics is off by default)

**Action:** Check whether the GA4 property `G-YP9EYMGCSY` is the correct active property. The original property was `G-VL1CMWKWY1`, then changed to `G-MRDZN56TZN`, then to `G-YP9EYMGCSY` — three changes in 10 days. This may have caused configuration issues.

---

## 5. Honest Timeline Assessment

### The advisor did not address timeline. Here is my honest assessment:

**Current pace:** ~3 clicks/day average, growing slowly

**The math:**
- To reach 10K clicks/day, we need to rank top 3 for at least 10 queries with 50,000+ monthly volume
- "salary calculator uk" alone has ~100,000 monthly searches. Position 3 = ~5% CTR = 5,000 clicks/day from that one term
- But getting from position 63 to position 3 requires domain authority jump from ~5 to ~40+
- That requires 50–100 quality backlinks from DA 40+ sites
- At an active outreach rate of 5–10 links per month, that's 6–12 months

| Scenario | Timeline to 10K/day | What it requires |
|---|---|---|
| Content only, no outreach | 2.5–3 years | Passive organic compounding |
| Active link building (5–10/month) | 14–18 months | Weekly outreach to finance/HR publishers |
| PR hit + partnerships | 10–12 months | One major press mention + a job-site partnership |
| Current trajectory (as-is) | 3+ years | No link building, just content |

**My honest recommendation:** the 12-month target is achievable but ONLY with active link building starting this week. Without it, we're looking at 2.5–3 years.

---

## 6. Complete Action Plan — What I Will Do

### Tier 1: Urgent fixes (this week)

| Action | Why | Impact |
|---|---|---|
| Fix www redirect at DNS/Vercel level | Google sees two sites — halving our authority | High — fixes the single biggest technical issue |
| Verify employer-ni article title deployed correctly | 840 impressions, 0 clicks at pos 8.49 — losing 8–17 clicks/week | High — could add 1–2 clicks/day immediately |
| Audit GA4 property — confirm G-YP9EYMGCSY is correct | Can't make decisions without accurate data | Critical — flying blind otherwise |
| Verify all prerendered HTML includes the new GA4 tag | Prerender runs at build time — old tag may be baked in | Critical |

### Tier 2: Advisor recommendations (next 2 weeks)

| Action | Advisor's name | My implementation |
|---|---|---|
| Embed mini calculator in average-salary article | "Bento-Style Mini Calculator" | Compact interactive salary input → take-home output, embedded directly in article body. Links to /take-home for full tool. Replicate on all 5 city articles. |
| Deep internal linking from articles to tools | "Strategic Sidebar" | Contextual in-body links (NOT sidebar). Each article links to 2–3 tools + 3–5 relevant salary pages. Cross-links between city articles. |
| Legal disclaimers in tool blocks | "Legal Shield" | Already done — no action needed |

### Tier 3: What the advisor should have recommended (the missing piece)

| Action | Why | Timeline |
|---|---|---|
| Write and send 10 outreach emails to UK finance/HR publishers | Domain authority is the real bottleneck — not internal linking | CEO must send this week |
| Targets: AccountingWEB, HR Magazine, Totaljobs blog, Reed blog, CIPD, MoneySavingExpert, The Money Edit, Personnel Today, This Is Money, SmallBusiness.co.uk | Offer uknetpay salary data as a citable source | One link from any of these = measurable ranking improvement |
| I will draft all 10 emails | CEO just needs to send from their domain email | 20 minutes of CEO time |

### Tier 4: Content expansion (ongoing)

| Action | Impact |
|---|---|
| 5 more city articles: Glasgow, Liverpool, Sheffield, Nottingham, Cardiff | Each targets 1,000–3,000 monthly searches. Manchester is already proving this works (position 3.67). |
| Hourly rate salary pages: £8/hr–£150/hr | 145 new pages targeting "£X per hour after tax" |
| "Average salary Scotland 2026" dedicated article | 11 impressions at position 10 already — needs its own page |
| "Average salary Northern Ireland 2026" | 4 impressions at position 10.25 — early signal |

---

## 7. Where the Advisor is Right and Where They're Wrong

### Right about:
- ✅ The data points (all verified to the decimal)
- ✅ Internal linking is weak and needs improvement
- ✅ Embedding a calculator in the salary article is a strong move
- ✅ Regional hubs should link to tools to pass authority
- ✅ The domain foundation is solid and crawlers are reading it correctly

### Wrong or incomplete about:
- ❌ "Google treats programmatic pages as thin content" — salary pages are ranking at positions 1–10 already; the tool pages are low because of domain authority, not content quality
- ❌ Does not mention backlinks — this is the #1 bottleneck and no structural change fixes it
- ❌ Does not mention the www redirect splitting authority — this is the most damaging active technical issue
- ❌ Does not mention the employer-ni CTR crisis (840 impressions, 0 clicks)
- ❌ Does not mention the GA4 tracking gap
- ❌ Implies these three changes will "turn impressions into thousands of daily clicks" — this overpromises. These changes will help but cannot overcome a domain authority deficit alone
- ❌ Does not address timeline honestly

---

## 8. What I Need From the CEO

| Priority | Action | Time needed | Impact |
|---|---|---|---|
| 🔴 Critical | Check which GA4 property is the real one (G-VL1CMWKWY1 vs G-MRDZN56TZN vs G-YP9EYMGCSY) | 5 min | We're flying blind |
| 🔴 Critical | Check Vercel domain settings — is non-www configured to redirect to www? | 5 min | Fixes authority split |
| 🔴 Critical | Send outreach emails to 5 finance/HR publishers (I'll draft them) | 20 min | The single biggest lever for growth |
| 🟡 Important | Submit sitemap in GSC again (after www fix) | 2 min | Ensures Google sees latest content |
| 🟡 Important | Apply for AdSense | 10 min | Revenue starts flowing once approved |

---

## 9. Bottom Line for the Board

The site is performing well for 44 days old. Impressions at 1,300–1,700/day means Google has accepted the site and is showing it. That is genuinely good.

But impressions without clicks is like a shop with great window displays that nobody walks into. The front door (the main calculator) is hidden on page 6 of Google. Nobody finds it there.

The advisor's recommendations (mini calculator embed, deep linking) are correct tactical moves that will improve engagement and help pass authority to the tool pages. I will build both.

But the strategic reality remains: without external backlinks, these changes alone will improve CTR on existing traffic but cannot move us from position 60 to position 5 for high-volume terms. That jump requires domain authority that only comes from other websites linking to us.

**Three things will happen this week:**
1. I will fix the www redirect, verify GA4, and fix the employer-ni deployment
2. I will build the mini calculator embed and internal linking improvements
3. I will draft the 10 outreach emails — the CEO needs to send them

---

*Report prepared: Saturday 24 May 2026*  
*Next report: Wednesday 28 May 2026*  
*Tech Head & SEO Manager*
