# UK Net Pay — SEO & Web Status Log

Append-only. Newest entry at the top. Read this at the start of every session.

---

## 2026-07-01 — Default light mode (PR #25, merged b380ceb5aca3)

### Change
User feedback: site feels more authentic in light mode. Set light as default for all new visitors.

### Files changed
**src/hooks/useTheme.ts**
- `getSavedChoice()` now returns `"light"` instead of `"system"` when no localStorage value exists
- SSR/prerender fallback also changed from `"system"` to `"light"`
- Existing users with a stored preference (light/dark/system) are completely unaffected

**index.html**
- Anti-flash inline script simplified: dark class now only applied if `localStorage.theme === 'dark'`
- Removed `window.matchMedia('(prefers-color-scheme:dark)')` fallback
- New visitors on dark-mode OS devices will now see light mode by default
- The dark mode toggle still works perfectly — users can still switch

### Behaviour after this change
- New visitor (no localStorage): always light mode ✓
- Existing user who chose dark: still dark (localStorage preserved) ✓
- Existing user who chose light: still light ✓
- Existing user on "system": now resolves to light instead of following OS ✓

### Vercel deployment
PR #25, squash-merged as b380ceb5aca3. Production deploy dpl_GevoDw2Bxw5T6gnPqzN936Q8ieYM queued.

---

## 2026-07-01 — Reddit abandoned, LinkedIn pivot

Reddit auto-removes every post: new account + zero karma + content pattern = triple block.
Fix: stop attempting Reddit until August. LinkedIn launched instead (no karma/age requirements).
Post 1 drafted: teacher pay take-home data. Post 2: NHS AfC band take-home.

---

## 2026-07-01 — 5 outreach emails drafted
1. This Is Money: editorial@thisismoney.co.uk
2. AccountingWEB: richard.hattersley@accountingweb.co.uk
3. HR Magazine: charissa.king@markallengroup.com
4. People Management: sam.forsdick@wonderly.agency
5. Reed: press@reed.co.uk

---

## 2026-06-30 — Bulk content sprint (PR #24, merged c5ab944704c4)
All 71 articles updatedISO 2026-06-30. Birmingham + Edinburgh CTR title fixes.
Pro-rata 3->15 FAQs. NHS 3->10 FAQs. New teaching-assistant-salary-uk-2026 article.

## 2026-06-30 — FAQ expansion + pay table injection (PR #23, merged 567940805fbc)
Teacher 3->12 FAQs. Accountant + GP CTR titles. Prerender pay table static injection.

---

## Open issues
1. Confirm which outreach emails were sent. Log replies immediately.
2. Merge PR #22 (AdSense ad units) — hold until AdSense approval email confirmed.
3. LinkedIn: post teacher pay data today, NHS Thursday. 2-3x per week.
4. Reddit: DO NOT ATTEMPT until August.
5. Monitor Birmingham/Edinburgh/pro-rata ranking changes from 7 July onwards.
6. Revoke GitHub token ghp_oGt1eC1... — used and shared in chat. Revoke at GitHub Settings > Developer settings > Personal access tokens.
