-- Email signup profile fields collected on /register.

alter table public.users
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists heard_about text;
