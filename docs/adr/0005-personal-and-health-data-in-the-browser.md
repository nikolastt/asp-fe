# 0005 — Personal and health data in the browser

Status: accepted (2026-10-30)

The front-end side of asp-api ADR-0010. Food diaries, measurements, checklist answers and profiles are
health data (sensitive under LGPD). The browser shows them; it never keeps or leaks them.

- **Nothing in browser storage**: no `localStorage`, `sessionStorage` or `indexedDB` (lint), and no
  Query cache persister. The cache lives in memory and dies with the tab. The session is an httpOnly
  cookie (asp-api ADR-0004), so no token is ever readable by JavaScript.
- **URLs carry IDs, never personal data**: search params and paths hold `athleteId`, statuses and
  filters, never a name, email or free-text health content. URLs end up in history, logs and referrers.
- **No `console`** in app code (lint). Error screens show the problem's `code` mapped to Portuguese copy,
  never the raw response body.
- **Third-party scripts** (analytics, monitoring, chat widgets) need an ADR first, stating what they
  receive; by default they get no personal data.
