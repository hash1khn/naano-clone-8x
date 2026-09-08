# Naano Clone — Project Conventions

Reference this file at the start of every agent session. Do not deviate from these without asking first.

## Stack (fixed, do not swap)
- Next.js (App Router) + React + Tailwind
- Supabase — Postgres + Auth + Storage
- Stripe Connect for payouts (test mode / mocked equivalent if time-boxed)
- Recharts for `#results` / `#analytics` charts
- Deploy target: Vercel

## Source of truth documents
- `docs/naano-clone-plan-FINAL.md` — product understanding, priorities, build order
- `docs/naano-backend-spec.md` — schema + endpoint list + business logic
- `docs/naano-api-contract.md` — pinned request/response shapes, both sides must match this exactly
- `docs/naano-frontend-spec.md` — routes, component tree, structure only

## Hard rules
1. Never invent new API routes, fields, or table columns not present in the docs above. If something seems missing, ask before improvising.
2. Always check `docs/naano-api-contract.md` before changing any endpoint's request/response shape. If a change is needed, update the contract file explicitly and say so.
3. Frontend pages are built as unstyled structural skeletons first — correct routing, correct data-fetching, correct component/prop structure, semantic HTML + minimal flex/grid only. No colors, spacing, or layout decisions beyond structural correctness until real HTML/CSS is supplied per page.
4. Dashboard tabs (`/brand`, `/creator`) are one page each with tab state synced to `window.location.hash` — not separate routes.
5. Business logic: `deals.status` only moves to `delivered` via the `/approve` endpoint, which is also what triggers payout creation. Don't shortcut this sequence.
6. Before any non-trivial task, output a short plan (components/state/API calls touched) and wait for approval before writing code.
7. After any meaningful diff, briefly state what changed and confirm it matches the relevant spec file, flagging any deviation.
8. Show diffs before running migrations.

## Session start checklist
- State which spec doc(s) this session is scoped to.
- Confirm the one deliverable this session is building (not "the dashboard" — the specific endpoint/panel/page).
