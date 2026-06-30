# UK Net Pay — SEO & Web Status Log

Append-only. Newest entry at the top. Read this file first at the start of every session before doing anything else — it tells you exactly what changed, why, and what's still open.

---

## 2026-06-30 — FAQ expansion + teacher pay table injection (PR #23, merged)

### Session trigger
Amit uploaded 3 fresh GSC exports (7-day, 24h, 28-day windows, all ending 27/28 Jun 2026).

### What the data showed
- 7-day clicks: 158, up 4.4x from the prior 7-day period (36)
- 7-day impressions: 17,379, up 2.5x (~6,900 prior)
- Average position over the last 3 days: 12.9, improved from 33.2 on 21 Jun — a 20-place jump in 5 days
- Peak day: 44 clicks on 26 Jun
- Traffic concentration risk confirmed: `teacher-salary-uk-2026` alone drove 91 of 158 clicks this week (57.6%)
- 3 page-1 articles ranking but getting zero clicks: accountant-salary-uk-2026 (pos 6.1, 185 impressions), gp-doctor-salary-uk-2026 (pos 9.5, 260 impressions), average-salary-birmingham-2026 (pos 8.1, 213 impressions)
- www vs non-www split confirmed costing ~5,745 impressions (14% of 28-day total) — still unresolved, see Open Issues below
- Domain Rating: still 0 per Ahrefs — unchanged, still the primary growth ceiling
- pro-rata page: 990 impressions / 28d, 1 click, position 75 — content is too thin to compete

### Changes shipped
**PR #23, squash-merged to main as commit `567940805fbc1e3eeef004fe9b68a3e759d501e3`. Vercel production deploy confirmed READY (dpl_77syU9Vp3bx8UaxjVsBsexH5NNsK).**

`src/content/articles/data.tsx`
- `teacher-salary-uk-2026`: FAQs expanded 3 → 12, now covering the exact query patterns showing up in GSC ("teacher pay scale 2026-27", "proposed teacher pay scale 26 27", M3/M6 take-home, TPS pension tiers, Scotland comparison). Keywords list expanded to match. `updatedISO` set to 2026-06-29.
- `teacher-pay-scale-2026-27`: FAQs expanded 3 → 7, added explicit "proposed 2026/27 award" FAQ since that query has a 25% CTR and nobody else covers the announcement angle well. `updatedISO` set to 2026-06-29.
- `accountant-salary-uk-2026`: title and meta description rewritten for CTR (added "Take-Home Pay at Every Level"), FAQs expanded 2 → 6.
- `gp-doctor-salary-uk-2026`: title and meta description rewritten for CTR (added "Exact Take-Home"), FAQs expanded 1 → 5.

`scripts/prerender.ts`
- Teacher articles (`teacher-salary-uk-2026`, `teacher-pay-scale-2026-27`) now get a dedicated static HTML block injected at prerender time: full M1–U3 pay table plus a "proposed 2026/27" paragraph, so Googlebot sees this content without executing JS. Previously these pages only got the excerpt + FAQ block like every other article.

### Current file SHAs (as of this merge — will go stale on next edit, always re-fetch)
- `src/content/articles/data.tsx`: `eea5228a9a49d5a532ffc075627982383c95dbbb`
- `scripts/prerender.ts`: `97d80bc023ae1a59aec0ba9ddbf0ffcf4e016d51`
- Latest main commit: `567940805fbc1e3eeef004fe9b68a3e759d501e3`

### Open issues — not touched this session
1. **www vs non-www canonical split** — 453 www-prefixed URLs still indexed separately, diluting authority. Needs a canonical-tag audit across prerender output plus a GSC removals request for the www host. Highest-priority unresolved item.
2. **Pro-rata page rebuild** — position 75 with near-1,000 monthly impressions is a content-quality problem, not a technical one. Needs a full rewrite: clear definition, worked examples, embedded calculator, FAQ schema — same treatment that worked on the teacher article.
3. **PR #22 (AdSense ad units)** — was open as of session start, unrelated to this sprint. Check status next session.
4. **Backlink outreach** — 5 templates built (AccountingWEB, HR Magazine, This Is Money, People Management, Reed). None confirmed sent. Still the single highest-leverage lever for fixing Domain Rating 0.

### Next session priorities, in order
1. Confirm the CTR fix on accountant/GP/Birmingham pages is working — needs 5–7 days of GSC data post-deploy before this is measurable, so don't check before ~5 July.
2. www/non-www canonical fix.
3. Pro-rata page rebuild.
4. Send the backlink outreach emails — they've been sitting built but unsent for too long.

### Operational notes for next session
- Proven push pattern (works, reuse it): create branch from latest main SHA → PUT to Contents API per file with current blob SHA → open PR → squash-merge via PUT `/pulls/{n}/merge`. Vercel auto-deploys main on merge; always check `Vercel:list_deployments` afterward to confirm `state: READY` rather than assuming the push succeeded — don't sugarcoat a build failure if one shows up.
- A GitHub PAT was pasted directly in chat twice this session for this push. It's done its job — recommend Amit revokes/rotates it from GitHub → Settings → Developer settings → Personal access tokens once he's reviewed this merge, and issues a fresh one only when next session actually needs to push. No need to keep a long-lived token sitting in chat history.
- Today's actual date per system clock is Tuesday 30 June 2026; the GSC export and `updatedISO` values reference 27–29 June since that's what the data covers — don't treat that as a logging error in future sessions.

---
