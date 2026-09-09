-- Persist creator My-card section order / visibility / custom blocks.

alter table public.creator_profiles
  add column if not exists profile_layout jsonb;

comment on column public.creator_profiles.profile_layout is
  'Creator card editor layout: { order: string[], hidden: string[], custom: { id, title, body }[] }';
