# Naano Clone — Frontend Spec

> **Every page below is scaffolded as an unstyled functional skeleton first.** Correct route, correct data-fetching, correct component structure and props — zero visual design decisions. Real HTML/CSS gets dropped in per-page afterward, once supplied. Do not invent colors, spacing, fonts, or layout beyond basic semantic HTML + flex/grid for structural correctness.

## Marketing routes (public)

| Route | Data needed | Key components (structure only) |
|---|---|---|
| `/` | none (static copy) | Header, Hero, LogoMarquee, HowItWorks, VideoCaseStudy, ResultsGrid, PricingCards, FAQAccordion, Footer |
| `/creators` | none | same shared components, creator-angled copy |
| `/agencies` | none | same shared components, agency-angled copy |
| `/pricing` | none | PricingCards (detailed), FAQAccordion |
| `/about` | none | founder bios |
| `/help` | none | static content |
| `/privacy`, `/terms` | none | static content |
| `/book` | none | third-party scheduling embed |
| `/blog` | list of posts | BlogCardGrid |
| `/blog/[slug]` | single post | BlogPostBody |
| `/creators/[slug]` | `GET /api/creators/:slug` | ProfileHeader, MediaKitStats, SamplePosts |
| `/case-studies/blogseo` | none (static for now) | CaseStudyTemplate |
| `/for/[vertical]` | none (static per-vertical copy) | same landing template, 8 verticals |
| `/free-tools`, `/free-tools/[tool]` | none / calculator logic client-side | CalculatorForm |
| `/reports`, `/benchmarks/q2-2026` | none | static/gated content |
| `/selection` | form submit → lead capture endpoint | LeadForm |
| `/briefs` | `GET /api/briefs` | BriefCardList (public, no auth) |

## Auth routes

| Route | Data needed | Notes |
|---|---|---|
| `/login` | `POST /api/auth/login` | supports `?reauth=1` |
| `/register` | `POST /api/auth/register` | role selector shown in-form |
| `/register?role=influencer` | same | role pre-set to creator |
| `/register?role=saas` | same | role pre-set to brand |

## App — `/brand` (single page, tab state = `window.location.hash`)

Structure: one `BrandDashboardLayout` with a `Sidebar`/`TabNav` and a content area that swaps components based on hash — not 9 routes.

| Hash | Component | Data needed |
|---|---|---|
| `#overview` | `OverviewPanel` | `GET /api/companies/:id/results` (summary) |
| `#marketplace` | `MarketplacePanel` | `GET /api/creators?filters` |
| `#campaigns` | `CampaignsListPanel` | `GET /api/campaigns` |
| `#campaign-new` | `CampaignBriefForm` | `POST /api/campaigns` |
| `#collaborations` | `CollaborationsBoard` | `GET /api/deals?role=brand`, `PATCH /api/deals/:id/status`, `POST /api/deals/:id/approve` |
| `#results` | `ResultsDashboard` | `GET /api/companies/:id/results` (detailed + chart) |
| `#messages` | `MessagesPanel` | `GET/POST /api/messages` |
| `#billing` | `BillingPanel` | company.plan, invoices (stub if no real Stripe billing) |
| `#integrations` | `IntegrationsPanel` | static stub list w/ "Connect" buttons, no real OAuth needed for MVP |

## App — `/creator` (single page, tab state = `window.location.hash`)

| Hash | Component | Data needed |
|---|---|---|
| `#home` | `CreatorHomePanel` | incoming deal requests, recent earnings summary |
| `#profile` | `ProfileEditForm` | `GET/PATCH` own `creator_profiles` row |
| `#opportunities` | `OpportunitiesList` | `GET /api/briefs` |
| `#collabs` | `CollabsList` | `GET /api/deals?role=creator` |
| `#analytics` | `AnalyticsPanel` | own posts' impressions/clicks/leads |
| `#community` | `CommunityPanel` | stub — placeholder for MVP |
| `#earnings` | `EarningsPanel` | `GET /api/creators/:id/payouts` |
| `#messages` | `MessagesPanel` | same component as brand side, reused |
| `#integrations` | `IntegrationsPanel` | stub |

## Shared components (used across marketing + app)

- `Header` / `Footer`
- `LogoMarquee`
- `TestimonialCard`
- `StatBlock`
- `FAQAccordion`
- `PricingCard`
- `Sidebar` / `TabNav` (app shell only)
- `DealStatusBadge` (Draft/Scheduled/Live/Delivered)
- `MessageThread`

## Build order (frontend only, assumes backend/API already stubbed or mocked)

1. Shared components (empty/structural)
2. Auth pages
3. Marketing homepage + `/creators` (reuse components)
4. `/creators/[slug]` template
5. Brand dashboard shell + `#marketplace` + `#campaign-new`
6. Brand `#collaborations` + `#results`
7. Creator dashboard shell + `#home` + `#opportunities` + `#collabs` + `#earnings`
8. Messages (shared component, both sides)
9. Everything else (billing, integrations, blog, free-tools) only if time remains
