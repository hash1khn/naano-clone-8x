# Naano Clone — API Contract (shared reference for frontend + backend)

Keep this in sync if either side changes shape. This is the single source of truth both Cursor sessions (frontend pass, backend pass) should reference so they don't drift.

## Auth
```
POST /api/auth/register
  body: { email: string, password: string, role: "brand" | "creator" }
  returns: { user: { id, email, role } }

POST /api/auth/login
  body: { email: string, password: string }
  returns: { user: { id, email, role }, session }

GET /api/auth/oauth/start?provider=google|linkedin_oidc&role?=brand|creator&next?=
  → 302 to the provider (Supabase OAuth)

GET /api/auth/callback?code=
  → exchanges the OAuth code, upserts public.users, 302 to /brand or /creator
```

## Creators / Marketplace
```
GET /api/creators?niche=&country=&min_followers=&max_followers=
  returns: { creators: [{ id, slug, name, niche_tags, country, follower_count, price_per_post, avatar_url }] }

GET /api/creators/:slug
  returns: { id, slug, name, bio, niche_tags, country, follower_count, price_per_post, avatar_url, sample_posts: [...] }

PATCH /api/creators/:id   (self only)
  body: { bio?, niche_tags?, price_per_post?, avatar_url? }
```

## Campaigns
```
POST /api/campaigns
  body: { objective, key_messages, guidelines }
  returns: { id, status: "draft" }

GET /api/campaigns
  returns: { campaigns: [{ id, objective, status, created_at }] }

PATCH /api/campaigns/:id
  body: { objective?, key_messages?, guidelines?, status? }
```

## Briefs (public open campaigns)
```
GET /api/briefs
  returns: { briefs: [{ id, campaign_id, objective_summary, created_at }] }

POST /api/briefs/:id/apply   (creator only)
  returns: { deal_id }
```

## Deals / Collaborations
```
POST /api/deals
  body: { campaign_id, creator_id, price }
  returns: { id, status: "draft" }

GET /api/deals?role=brand|creator
  returns: { deals: [{ id, campaign_id, creator_id, price, status, tracking_link, created_at }] }

PATCH /api/deals/:id/status
  body: { status: "draft" | "scheduled" | "live" | "delivered" }

POST /api/deals/:id/approve   (brand only — triggers payout)
  returns: { deal_id, approved_at, payout: { id, status } }
```

## Posts / Attribution
```
POST /api/deals/:id/post   (creator submits published post)
  body: { linkedin_url }
  returns: { post_id }

GET /api/deals/:id/results
  returns: { impressions, clicks, leads, attributed_pipeline_value }

GET /api/companies/:id/results
  returns: { total_impressions, total_clicks, total_leads, total_pipeline_value, trend: [{ date, value }] }
```

## Payouts
```
GET /api/creators/:id/payouts
  returns: { payouts: [{ id, deal_id, amount, status, created_at }] }
```

## Messages
```
GET /api/messages?deal_id=  OR  ?with=user_id
  returns: { messages: [{ id, sender_id, recipient_id, body, created_at }] }

POST /api/messages
  body: { recipient_id, deal_id?, body }
```

## Tracking redirect (not JSON — actual redirect route)
```
GET /t/:slug
  → increments tracking_links.clicks, 302 redirects to the real destination URL
```
