# UK Net Pay — SEO & Web Status Log

Append-only. Newest entry at the top. Read this file first at the start of every session.

---

## 2026-06-30 — Bulk content sprint (PR #24, merged c5ab944704c4)

### Context
AdSense under review. ~30 clicks/day trending up. Canonical/www issue confirmed self-resolving — sitemap clean (681 non-www URLs), Google already showing non-www URLs only.

### Changes shipped
1. All 71 articles: updatedISO -> 2026-06-30 (freshness signal)
2. average-salary-birmingham-2026: CTR title + desc rewrite, 2->6 FAQs (pos 8.09, 213 impr, 0 clicks)
3. average-salary-edinburgh-2026: CTR title + desc rewrite, 2->6 FAQs (pos 7.49, 254 impr, 0 clicks)
4. what-does-pro-rata-mean-uk: 3->15 FAQs — worked examples, leave, sick pay, pensions (pos 75, 990 impr, 1 click)
5. nhs-pay-bands-2026-27: 3->10 FAQs covering pay rise status, band take-homes, pensions (18k/mo volume)
6. NEW teaching-assistant-salary-uk-2026: 9 FAQs, L1-HLTA pay table, term-time vs FTE, LGPS pension

### AdSense note
Do NOT merge PR #22 (ad units) until AdSense approval email arrives. Review is based on PR #21 state.

### File SHAs (main at c5ab944704c4)
- data.tsx: fetch fresh from API (changes each commit)
- prerender.ts: 97d80bc023ae1a59aec0ba9ddbf0ffcf4e016d51 (unchanged)
- Latest main commit: c5ab944704c4

### Next session priorities
1. SEND backlink outreach emails — most overdue action, only fix for DR 0
2. Merge PR #22 once AdSense approved
3. Monitor Birmingham/Edinburgh/pro-rata position improvements (allow 5-7 days)
4. New articles: NHS pay rise 2026/27, supply teacher salary, civil servant salary

---

## 2026-06-30 — FAQ expansion + teacher pay table injection (PR #23, merged 567940805fbc)

GSC data showed 44 clicks on 26 Jun, 158 clicks last 7 days (4.4x growth). Teacher article at pos 7.9 driving 57% of traffic.

Changes: teacher 3->12 FAQs, teacher-pay-scale 3->7 FAQs, accountant CTR title, GP CTR title, prerender.ts pay table injection.

---
