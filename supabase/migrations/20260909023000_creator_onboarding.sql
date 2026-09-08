-- Creator marketplace onboarding (LinkedIn URL + completion gate).

alter table public.creator_profiles
  add column if not exists linkedin_url text,
  add column if not exists onboarding_completed_at timestamptz;

-- Existing profiles that already look marketplace-ready should not be gated.
update public.creator_profiles
set onboarding_completed_at = coalesce(created_at, now())
where onboarding_completed_at is null
  and country is not null
  and coalesce(price_per_post, 0) > 0
  and niche_tags is not null
  and cardinality(niche_tags) > 0;
