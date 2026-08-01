-- Run this in Supabase SQL Editor if the tables already exist but the site shows 0 rows.
-- It grants Supabase's public/authenticated roles access to the tables; RLS policies
-- still decide which rows/actions are allowed.

grant usage on schema public to anon, authenticated;

grant select on
  public.students,
  public.alumni,
  public.achievements,
  public.journals
to anon, authenticated;

grant insert, update, delete on
  public.students,
  public.alumni,
  public.achievements,
  public.journals
to authenticated;

