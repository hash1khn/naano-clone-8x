# Naano.com — Final Clone Plan

## 0. What Naano actually is (confirmed, from Naano's own `llms.txt`)

- **Category:** B2B LinkedIn creator marketplace — companies book vetted LinkedIn creators for sponsored posts.
- **Founded:** 2025, Paris. Founders: Thomas Marcelle (CEO), Alexis Jarre (CMO), Justine Namour (CTO).
- **Scale:** 2,000+ registered/vetted creators, ~1,000 to ~500,000 followers, organized by vertical (sales, RevOps, devtools, HR-tech, product, marketing-ops, fintech, vertical SaaS).
- **Pricing model:** flat fee per post, set by each creator, **from €20/post**. No CPC/CPM/retainer lock-in.
  - **Self-Serve** — €0/month platform fee, you pay per post you book.
  - **Managed** — €700/month, Naano's team sources creators, writes briefs, runs the campaign end-to-end.
- **Payments:** Stripe Connect. Brand approves the submitted post → post goes live → payout auto-releases to the creator. Contracts/invoices handled in-platform.
- **Core value prop:** trace attributed clicks → leads → pipeline back to each individual post (this is the thing that makes it more than a generic influencer directory).
- **Tech signals:** Next.js frontend (`/_next/image`), Supabase-hosted assets (`api.naano.xyz/storage/v1/...`).

---

## 1. Full site map

### A. Marketing / landing pages (public, no login)

| Path | Purpose |
|---|---|
| `/` | Homepage — "For companies" |
| `/creators` | Landing page — "For creators" |
| `/agencies` | Landing page — "For agencies" |
| `/pricing` | Standalone pricing page (Self-Serve vs Managed, full FAQ) |
| `/about` | Founders/company page |
| `/book` | Scheduling embed for campaign strategy calls |
| `/help` | Help center |
| `/privacy`, `/terms` | Legal |
| `/case-studies/blogseo` | Case study detail page (template — likely reused per client later) |
| `/selection` | **Missed in your list** — free, human-built creator shortlist tool, delivered in 48h, no account needed. This is a lead-gen funnel: visitor submits their niche/criteria, gets a curated list back. Worth cloning as a lightweight lead-capture form even without the backend logic. |
| `/reports` | Gated report/benchmark hub (first-party pricing + performance data) |
| `/benchmarks/q2-2026` | Specific quarterly benchmark report page |
| `/linkedin-creator-marketplace` | SEO category page — also positions Naano vs LinkedIn's own native Creator Marketplace |
| `/best-b2b-influencer-marketing-platforms-2026` | Ranked comparison page (Naano vs Favikon, Kolsquare, Upfluence, Traackr, Skeepers) |
| `/meilleures-plateformes-influence-marketing-b2b-2026` | French-language mirror of the above (confirms partial i18n) |
| `/for/sales-tech`, `/for/revops`, `/for/devtools`, `/for/product`, `/for/hr-tech`, `/for/fintech`, `/for/marketing-ops`, `/for/vertical-saas` | **8 vertical-specific landing pages**, one shared template with per-vertical CPL/copy swapped in |
| `/free-tools` | Index of free calculators |
| `/free-tools/linkedin-creator-worth-calculator` | Calculator |
| `/free-tools/linkedin-engagement-rate-calculator` | Calculator |
| `/free-tools/sponsored-post-delivery-odds-estimator` | Calculator |
| `/free-tools/creator-campaign-budget-planner` | Calculator |
| `/blog` | Blog index — 60+ posts, actively published (several from the last week) |
| `/blog/[slug]` | ~60 individual posts — build **one template**, don't hand-build each |
| `/creators/[slug]` | ~400 **public creator profile pages** — bio, niche, stats, sample posts, rate. Build **one dynamic template**. |
| `/briefs` | Updated same-day as of writing — likely a **public feed of open campaign briefs** for creators to browse without logging in. Worth checking once it stops timing out; may be a genuinely important discovery surface separate from the gated marketplace. |
| `/llms.txt` | Plain-text machine-readable company/product summary |
| `/pricing.md` | Markdown mirror of the pricing page, for AI agents |

### B. Auth

| Path | Purpose |
|---|---|
| `/login` (`?reauth=1` variant) | Sign in |
| `/register` | Sign up, role picked inside the flow |
| `/register?role=influencer` | Sign up pre-set to **creator** |
| `/register?role=saas` | Sign up pre-set to **brand** |

### C. App — Brand dashboard (`/brand`, tab state via URL hash)

One shell, tabs switched client-side — **not separate server routes**:

| Hash | Tab | Function |
|---|---|---|
| `#overview` | Overview | Home/summary dashboard — likely top-line stats (active campaigns, spend, pipeline), recent activity |
| `#marketplace` | Marketplace | Browse/filter/search the 2,000+ creators, view fit score, view rate |
| `#campaigns` | Campaigns | List of the brand's campaigns and their status |
| `#campaign-new` | New campaign | The brief builder — objectives, key messages, guidelines, AI-assisted drafting |
| `#collaborations` | Collaborations | Per-creator deal tracking — Draft → Scheduled → Live → Delivered, content approval step |
| `#results` | Results | Attribution dashboard — impressions, clicks, leads, pipeline €, trend |
| `#messages` | Messages | Direct messaging with creators (in-app inbox) |
| `#billing` | Billing | Plan (Self-Serve/Managed), payment method, invoices, per-campaign spend |
| `#integrations` | Integrations | Likely CRM/analytics connections (for pipeline attribution — e.g. HubSpot/Salesforce/Stripe) |

### D. App — Creator dashboard (`/creator`, tab state via URL hash)

| Hash | Tab | Function |
|---|---|---|
| `#home` | Home | Overview — incoming requests, active deals, recent earnings |
| `#profile` | Profile | Editable public profile (feeds `/creators/[slug]`), media kit, rate card |
| `#opportunities` | Opportunities | Browsable brand deals/briefs to apply to or get matched with |
| `#collabs` | Collabs | Active/past collaborations and their status |
| `#analytics` | Analytics | Own post performance — impressions, clicks, leads generated |
| `#community` | Community | Likely a creator-only space (forum/Slack-style, or just social proof/leaderboard) |
| `#earnings` | Earnings | Payout history, pending payouts, Stripe Connect account status |
| `#messages` | Messages | In-app inbox with brands |
| `#integrations` | Integrations | Possibly LinkedIn account connection (to auto-pull post stats) |

> **Architecture note:** because both dashboards use `#hash` tabs rather than distinct routes, plan to build each as a single React client component with local tab state synced to `window.location.hash`, not as 9 separate Next.js pages. This is faster to build *and* matches the original more closely.

---

## 2. Core functionality to replicate (priority-ranked)

### Tier 1 — the actual product (build these first, even minimally)
1. **Two-role auth** — brand vs creator, selectable at `/register?role=...`
2. **Creator marketplace browse** (brand side) — list/filter creators, show fit score, show flat per-post price
3. **Campaign brief creation** — form with objectives/messages/guidelines (AI-assist can be stubbed)
4. **Collaboration pipeline** — Draft → Scheduled → Live → Delivered, with an approval gate before payout
5. **Attribution tracking** — unique tracking link per deal/post → clicks → (fake) leads → pipeline €, shown on a results dashboard
6. **Payments** — Stripe Connect payout triggered on approval (can mock the Stripe call in a 12h build, but keep the approval → payout sequence intact, since that's a specific, checkable design decision)
7. **Creator public profile page** (`/creators/[slug]`) — this is both marketing (SEO) and product (media kit)

### Tier 2 — real but lower-signal for a judge
8. In-app messaging (brand ↔ creator)
9. Billing/plan management (Self-Serve €0 vs Managed €700)
10. Creator "opportunities" feed / open briefs (`/briefs`, `#opportunities`)
11. Integrations tab (can be a stub screen with logos + "connect" buttons)

### Tier 3 — content/growth engine (skip unless time remains)
12. Blog + blog template
13. Free tools/calculators
14. Gated reports/benchmarks
15. `/selection` lead-gen tool
16. Vertical landing pages (`/for/*`)
17. `/llms.txt`, `/pricing.md`

---

## 3. Data model

- **User** — role: `brand` | `creator`, auth provider, profile
- **CreatorProfile** — user_id, name, slug, bio, niche tags, country, follower_count, price_per_post, media kit fields
- **Company** — user_id, name, plan (`self_serve` | `managed`), billing info
- **Campaign** — company_id, objective, key_messages, guidelines, status
- **Deal** (a.k.a. Collaboration) — campaign_id, creator_id, price, deliverables, status (`draft`|`scheduled`|`live`|`delivered`), tracking_link_id
- **Brief** — public/open version of a campaign creators can browse (`/briefs`, `#opportunities`)
- **Post** — deal_id, linkedin_url, impressions, clicks, leads, attributed_pipeline_value
- **Payout** — creator_id, deal_id, amount, status (`scheduled`|`paid`), stripe_transfer_id
- **Message** — sender_id, recipient_id, deal_id (optional), body, timestamp

---

## 4. Suggested tech stack

- **Frontend:** Next.js (App Router) + React + Tailwind
- **Dashboard tabs:** client component + `window.location.hash` sync (matches discovered architecture)
- **Backend/DB/Auth:** Supabase (Postgres + Auth + Storage) — matches observed asset URLs
- **Payments:** Stripe Connect (Express accounts for creators), or a mocked equivalent if time-boxed
- **Charts:** Recharts, for the results/analytics tabs
- **Deploy:** Vercel

---

## 5. 12-hour build plan

| Time | Focus |
|---|---|
| 0:00–0:45 | Sign up as both a creator and a brand, walk every flow end-to-end, screenshot everything. Confirm `/brand` and `/creator` tab contents directly instead of inferring. Start `.agent-logs/` capture — must pass before writing code. |
| 0:45–1:15 | Supabase schema (section 3) + Next.js scaffold + deploy pipeline live from minute one |
| 1:15–2:00 | Auth: `/login`, `/register`, `/register?role=...` |
| 2:00–3:30 | Marketing shell: `/`, `/creators`, header/footer, shared components (logo marquee, testimonial cards, FAQ accordion, pricing cards) — this is what a judge sees first and it's fast to get looking right |
| 3:30–4:15 | `/creators/[slug]` dynamic profile template (seed ~10–20 fake creators) |
| 4:15–6:00 | Brand dashboard shell + `#marketplace` (browse/filter) + `#campaign-new` (brief form) |
| 6:00–7:30 | `#collaborations` pipeline (Draft→Live) with approval step + `#results` attribution dashboard (fake but wired-up data) |
| 7:30–8:30 | Creator dashboard: `#home`, `#opportunities`, `#collabs`, `#earnings` |
| 8:30–9:15 | Payments: Stripe Connect test-mode payout on approval, or a clearly-mocked equivalent |
| 9:15–10:00 | `#messages` (both sides) — simplest possible working chat |
| 10:00–10:45 | Polish pass: `/pricing`, `/about`, empty states, mobile check |
| 10:45–11:30 | Deploy final, smoke-test every flow live (not localhost) |
| 11:30–12:00 | Record Loom walkthrough, write up live link + repo link in the "links" field, final `.agent-logs/` commit |

---

## 6. Open items to verify once you're logged in / pages load

- Exact `#overview`, `#billing`, `#integrations`, `#community` tab contents — these are the least certain items in the whole plan since they weren't visible in any public page.
- `/briefs` and `/selection` were timing out — check them directly; `/briefs` in particular may be a public discovery page worth cloning as a real feature, not just an app tab.
- Whether `/agencies` follows the same template as `/` and `/creators` (very likely, but unconfirmed).
