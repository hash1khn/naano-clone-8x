# Naano Clone — Backend Spec

## Stack
Supabase (Postgres + Auth + Storage) + Next.js API routes / Server Actions. Stripe Connect for payouts.

## Auth
- Roles: `brand`, `creator` (stored on `users` table, set at registration)
- Supabase Auth (email/password minimum; OAuth optional/stretch)
- Routes consumed by frontend: `/register?role=influencer` → creator signup, `/register?role=saas` → brand signup

## Schema

```sql
users
  id uuid pk
  email text
  role text  -- 'brand' | 'creator'
  created_at timestamp

companies
  id uuid pk
  user_id uuid fk -> users.id
  name text
  plan text  -- 'self_serve' | 'managed'
  created_at timestamp

creator_profiles
  id uuid pk
  user_id uuid fk -> users.id
  slug text unique          -- feeds /creators/[slug]
  name text
  bio text
  niche_tags text[]
  country text
  follower_count int
  price_per_post numeric
  avatar_url text
  created_at timestamp

campaigns
  id uuid pk
  company_id uuid fk -> companies.id
  objective text
  key_messages text
  guidelines text
  status text  -- 'draft' | 'active' | 'closed'
  created_at timestamp

briefs                      -- public/open version of a campaign, browsable by creators
  id uuid pk
  campaign_id uuid fk -> campaigns.id
  is_public boolean
  created_at timestamp

deals                       -- a.k.a. "collaboration"
  id uuid pk
  campaign_id uuid fk -> campaigns.id
  creator_id uuid fk -> creator_profiles.id
  price numeric
  status text  -- 'draft' | 'scheduled' | 'live' | 'delivered'
  tracking_link_id uuid fk -> tracking_links.id
  approved_at timestamp nullable
  created_at timestamp

tracking_links
  id uuid pk
  deal_id uuid fk -> deals.id
  slug text unique
  clicks int default 0

posts
  id uuid pk
  deal_id uuid fk -> deals.id
  linkedin_url text
  impressions int
  clicks int
  leads int
  attributed_pipeline_value numeric
  created_at timestamp

payouts
  id uuid pk
  creator_id uuid fk -> creator_profiles.id
  deal_id uuid fk -> deals.id
  amount numeric
  status text  -- 'scheduled' | 'paid'
  stripe_transfer_id text nullable
  created_at timestamp

messages
  id uuid pk
  sender_id uuid fk -> users.id
  recipient_id uuid fk -> users.id
  deal_id uuid fk -> deals.id nullable
  body text
  created_at timestamp
```

## API endpoints (or Server Actions — pick one pattern, stay consistent)

### Auth
- `POST /api/auth/register` — { email, password, role }
- `POST /api/auth/login`

### Marketplace (brand-facing)
- `GET /api/creators?niche=&country=&min_followers=&max_followers=` — list/filter
- `GET /api/creators/:slug` — single profile (also used by public `/creators/[slug]` page)

### Campaigns (brand-facing)
- `POST /api/campaigns` — create
- `GET /api/campaigns` — list for logged-in company
- `PATCH /api/campaigns/:id`

### Briefs (public + creator-facing)
- `GET /api/briefs` — public open briefs (feeds `/briefs` and creator `#opportunities`)
- `POST /api/briefs/:id/apply` — creator applies

### Deals / Collaborations
- `POST /api/deals` — brand creates a deal with a creator
- `GET /api/deals?role=brand|creator` — list, filtered by logged-in user's role
- `PATCH /api/deals/:id/status` — move through draft→scheduled→live→delivered
- `POST /api/deals/:id/approve` — brand approves submitted post → triggers payout

### Posts / Attribution
- `POST /api/deals/:id/post` — creator submits the published LinkedIn URL
- `GET /api/deals/:id/results` — impressions/clicks/leads/pipeline for one deal
- `GET /api/companies/:id/results` — aggregate results dashboard data

### Payments
- `POST /api/payouts/:id/release` — called internally on approval; creates Stripe transfer
- `GET /api/creators/:id/payouts` — payout history for `#earnings`

### Messages
- `GET /api/messages?deal_id=` or `?with=user_id`
- `POST /api/messages`

## Business logic notes
- **Approval gates payout.** `deals.status` moves to `delivered` only after `approve` is called; `approve` is what should trigger the Stripe transfer creation.
- Tracking link clicks should increment on every request to a redirect route (e.g. `/t/:slug` → increments `tracking_links.clicks`, then 302s to the real LinkedIn post).
- Seed data: generate ~15-20 fake creator_profiles for local dev/demo before wiring up brand-side browsing.
