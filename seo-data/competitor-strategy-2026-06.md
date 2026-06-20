# Competitor Strategy Teardown & Action Plan
**Based on Semrush UK data, June 2026. Companion to `semrush-keyword-archive-2026-06.md`.**

---

## The core insight

You are not competing in one race. You're competing in ~80 micro-races (keyword clusters), and you can win the small ones now while slowly building toward the big ones.

The head terms ("salary calculator" 450k/mo, "tax calculator" 246k/mo) are owned by DR 55–78 incumbents and won't move without backlinks. **But the long-tail and the NHS/teacher/pro-rata clusters are Competition 0.00 and winnable on content alone.** That's the entire near-term strategy: harvest the uncontested volume while authority slowly builds.

---

## What each competitor is doing right

### thesalarycalculator.co.uk (DR 55, 583k traffic, 19,133 keywords)
- **Single dominant tool** ranking for "salary calculator" + "the salary calculator" (8,100/mo navigational — people search the brand name directly).
- Massive keyword footprint from one well-optimised calculator that ranks for thousands of "X salary" variations.
- **What to copy:** their breadth of programmatic coverage. We already do this with 581 salary pages — we just need them to rank, which needs authority.
- **What we beat them on:** content depth (67 articles vs ~15), modern UX, calculator variety, 2026/27 currency.

### listentotaxman.com (DR 42, 159k traffic)
- Brand is a *navigational* search term: "listen to taxman" 33,100/mo, "listentotaxman" 12,100/mo. That's 45k/mo of pure brand searches — the holy grail of SEO moats.
- Old domain (20+ years) with deep trust signals for YMYL.
- **What to copy:** nothing replicable short-term (brand + age can't be shortcut). **Lesson:** brand search is the long game. Every Reddit mention, every shared calculator link slowly builds "uknetpay" as a branded query.

### mypaycalculator.co.uk (DR ~25, 34k traffic) — THE TEMPLATE
- Closest to our authority level and the clearest blueprint.
- Wins almost entirely on **NHS and teacher calculator queries** — both Competition 0.00 clusters.
- DR only ~25, proving these clusters need modest authority.
- **What to copy:** exactly what we did this week — build dedicated NHS and teacher calculators. We now compete directly.

### uksalarycalculator.io (DR 5 — SAME AS US — 31k traffic, 4,352 keywords)
- **This is the existence proof.** DR 5, yet 31,889 monthly visits.
- They rank through sheer volume of targeted pages + clean technical SEO, NOT authority.
- **What to copy:** their playbook IS our playbook. Volume of well-targeted, genuinely useful pages. We have more pages (682 routes) and better content — we should overtake them within 6–9 months as our pages mature in the index.

---

## The 3-horizon plan

### Horizon 1 — NOW to 3 months: Harvest uncontested volume (no links needed)
Every target here is Competition < 0.05. Pure content/technical play.

1. ✅ NHS cluster (70k+/mo, Comp 0.00) — /nhs calc + nhs-pay-bands article DONE
2. ✅ Teacher cluster (40k+/mo, Comp <0.10) — /teacher calc + article DONE
3. ✅ Pro rata cluster (40k+/mo, Comp <0.03) — /pro-rata optimised + article DONE
4. ✅ "X after tax" salary pages (60k+/mo, Comp <0.01) — template fixed DONE
5. ⬜ Build standalone NI calculator ("national insurance calculator" 8,100, Comp 0.00)
6. ⬜ Build minimum wage / NLW 2026 page (37k+/mo combined, Comp 0.00)
7. ⬜ Expand average-salary into a pillar (250k+/mo combined variants, Comp 0.00)
8. ⬜ Add "tax code checker" tool or guide (8,100, Comp 0.02)

**Expected result:** as these 682 pages mature in Google's index (typically 3–6 months for a young domain), the Comp-0.00 clusters should start ranking page 1. Target: 300–800 clicks/day by month 3 on these alone.

### Horizon 2 — 3 to 9 months: Build authority signals
The Comp-0.00 wins generate the proof; now earn links and brand.

1. **Reddit r/UKPersonalFinance** — genuine helpful posts (compliant — no promotion, written in your voice). Drives brand search + referral.
2. **One high-DA editorial link** — MoneySavingExpert, Which?, or Reed. This is the single highest-leverage action. One MSE mention moves every page up 8–12 positions.
3. **Brand-building** — every shared calculator link compounds "uknetpay" as a navigational query (the listentotaxman moat).
4. **ProductHunt / directory launches** — DR 90 links + launch traffic.

### Horizon 3 — 9 to 18 months: Contest the head terms
Once DR climbs to ~15–25 (mypaycalculator territory) via Horizon 2 links, the head terms become reachable.

- "uk salary calculator" (40,500/mo) — currently ~pos 22; reachable at DR 20+
- "salary calculator uk" (90,500/mo) — the prize
- At pos 3 for the main head term, that's ~4,000 clicks/day from one query — more than the entire 10k goal.

---

## Why traffic projections were revised UP

Earlier projections under-weighted the long-tail and over-focused on the single head term. The portfolio reality:
- ~470,000 monthly searches across 80+ clusters
- ~740,000/mo of that is Competition < 0.05 (winnable without links)
- 682 indexed pages, each targeting distinct terms

**No backlinks:** ~2,500–3,500/day by May 2027 (portfolio maturity on low-comp terms alone)
**5–10 quality links:** ~5,000–7,500/day
**1 MSE/Which? link + Reddit presence:** ~9,000–12,000/day ✓ hits goal

The floor moved from ~1,700 to ~2,500–3,500 once the full Comp-0.00 portfolio was modelled correctly.

---

## Standing reminders (operational)

- Semrush `get_report_schema` must be called before `execute_report`.
- Semrush burns API units fast — `phrase_related` with `display_limit: 100` is the most efficient single pull. Filtered `domain_organic` for competitor gap analysis is second priority.
- Ahrefs free tier only exposes `public-domain-rating-free` (DR lookups). Everything else needs paid.
- This week's data is archived in `semrush-keyword-archive-2026-06.md` — re-pull only to refresh volumes annually or check new clusters.
