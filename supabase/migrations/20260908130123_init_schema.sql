-- Schema from docs/naano-backend-spec.md. Columns only as specified.

create table users (
  id uuid primary key,
  email text,
  role text, -- 'brand' | 'creator'
  created_at timestamp
);

create table companies (
  id uuid primary key,
  user_id uuid references users (id),
  name text,
  plan text, -- 'self_serve' | 'managed'
  created_at timestamp
);

create table creator_profiles (
  id uuid primary key,
  user_id uuid references users (id),
  slug text unique, -- feeds /creators/[slug]
  name text,
  bio text,
  niche_tags text[],
  country text,
  follower_count int,
  price_per_post numeric,
  avatar_url text,
  created_at timestamp
);

create table campaigns (
  id uuid primary key,
  company_id uuid references companies (id),
  objective text,
  key_messages text,
  guidelines text,
  status text, -- 'draft' | 'active' | 'closed'
  created_at timestamp
);

-- public/open version of a campaign, browsable by creators
create table briefs (
  id uuid primary key,
  campaign_id uuid references campaigns (id),
  is_public boolean,
  created_at timestamp
);

-- a.k.a. "collaboration"
-- tracking_link_id FK added after tracking_links (circular reference)
create table deals (
  id uuid primary key,
  campaign_id uuid references campaigns (id),
  creator_id uuid references creator_profiles (id),
  price numeric,
  status text, -- 'draft' | 'scheduled' | 'live' | 'delivered'
  tracking_link_id uuid,
  approved_at timestamp, -- nullable
  created_at timestamp
);

create table tracking_links (
  id uuid primary key,
  deal_id uuid references deals (id),
  slug text unique,
  clicks int default 0
);

alter table deals
  add constraint deals_tracking_link_id_fkey
  foreign key (tracking_link_id) references tracking_links (id);

create table posts (
  id uuid primary key,
  deal_id uuid references deals (id),
  linkedin_url text,
  impressions int,
  clicks int,
  leads int,
  attributed_pipeline_value numeric,
  created_at timestamp
);

create table payouts (
  id uuid primary key,
  creator_id uuid references creator_profiles (id),
  deal_id uuid references deals (id),
  amount numeric,
  status text, -- 'scheduled' | 'paid'
  stripe_transfer_id text, -- nullable
  created_at timestamp
);

create table messages (
  id uuid primary key,
  sender_id uuid references users (id),
  recipient_id uuid references users (id),
  deal_id uuid references deals (id), -- nullable
  body text,
  created_at timestamp
);
