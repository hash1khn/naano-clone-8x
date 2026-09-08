import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { AppRole } from "@/lib/auth/oauth";
import {
  CREATOR_ONBOARDING_PATH,
  isCreatorOnboardingComplete,
  type OnboardingProfile,
} from "@/lib/creator/onboarding";

function asProfile(row: Record<string, unknown>): OnboardingProfile {
  return {
    id: String(row.id),
    name: typeof row.name === "string" && row.name.trim() ? row.name : "Creator",
    bio: typeof row.bio === "string" ? row.bio : null,
    avatar_url: typeof row.avatar_url === "string" ? row.avatar_url : null,
    country: typeof row.country === "string" ? row.country : null,
    follower_count: typeof row.follower_count === "number" ? row.follower_count : Number(row.follower_count ?? 0) || 0,
    niche_tags: Array.isArray(row.niche_tags) ? row.niche_tags.filter((tag): tag is string => typeof tag === "string") : [],
    price_per_post: Number(row.price_per_post ?? 0) || 0,
    linkedin_url: typeof row.linkedin_url === "string" ? row.linkedin_url : null,
    onboarding_completed_at: typeof row.onboarding_completed_at === "string" ? row.onboarding_completed_at : null,
  };
}

export async function getCreatorProfile(userId: string): Promise<OnboardingProfile | null> {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("creator_profiles")
    .select(
      "id, name, bio, avatar_url, country, follower_count, niche_tags, price_per_post, linkedin_url, onboarding_completed_at",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }
  return asProfile(data);
}

export async function postAuthPathForUser(userId: string, role: AppRole): Promise<string> {
  if (role !== "creator") {
    return "/brand";
  }
  const profile = await getCreatorProfile(userId);
  return isCreatorOnboardingComplete(profile) ? "/creator" : `${CREATOR_ONBOARDING_PATH}?step=2`;
}
