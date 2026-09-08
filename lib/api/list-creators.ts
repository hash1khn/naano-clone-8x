import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { CreatorListItem } from "@/lib/api/types";

export type CreatorListFilters = {
  niche?: string | null;
  country?: string | null;
  min_followers?: string | null;
  max_followers?: string | null;
};

export async function listCreators(filters: CreatorListFilters = {}): Promise<CreatorListItem[]> {
  const admin = createAdminSupabaseClient();
  let query = admin
    .from("creator_profiles")
    .select("id, slug, name, niche_tags, country, follower_count, price_per_post, avatar_url")
    .order("created_at", { ascending: false })
    .limit(24);

  if (filters.niche) {
    query = query.contains("niche_tags", [filters.niche]);
  }
  if (filters.country) {
    query = query.eq("country", filters.country);
  }
  if (filters.min_followers) {
    const min = Number(filters.min_followers);
    if (!Number.isNaN(min)) {
      query = query.gte("follower_count", min);
    }
  }
  if (filters.max_followers) {
    const max = Number(filters.max_followers);
    if (!Number.isNaN(max)) {
      query = query.lte("follower_count", max);
    }
  }

  const { data, error } = await query;
  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    niche_tags: row.niche_tags ?? [],
    country: row.country ?? "",
    follower_count: row.follower_count ?? 0,
    price_per_post: Number(row.price_per_post ?? 0),
    avatar_url: row.avatar_url ?? "",
  }));
}
