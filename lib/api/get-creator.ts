import { connection } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Creator } from "@/lib/api/types";

export async function getCreatorBySlug(slug: string): Promise<Creator | null> {
  await connection();
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("creator_profiles")
    .select("id, slug, name, bio, niche_tags, country, follower_count, price_per_post, avatar_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    bio: data.bio ?? "",
    niche_tags: data.niche_tags ?? [],
    country: data.country ?? "",
    follower_count: data.follower_count ?? 0,
    price_per_post: Number(data.price_per_post ?? 0),
    avatar_url: data.avatar_url ?? "",
    sample_posts: [],
  };
}
