import { NextResponse } from "next/server";
import { getDashboardUser } from "@/lib/auth/session";
import { isCreatorIndustry, isImportOk, isImportPaused, recommendedPrice } from "@/lib/creator/onboarding";
import { getCreatorProfile } from "@/lib/creator/require-onboarding";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const PROFILE_SELECT =
  "id, name, bio, avatar_url, country, follower_count, niche_tags, price_per_post, linkedin_url, onboarding_completed_at";

function payload(profile: NonNullable<Awaited<ReturnType<typeof getCreatorProfile>>>) {
  return {
    profile,
    recommended_price: recommendedPrice(profile.follower_count),
    import_ok: isImportOk(profile),
    import_paused: isImportPaused(profile),
  };
}

export async function GET() {
  const user = await getDashboardUser();
  if (!user || user.role !== "creator") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getCreatorProfile(user.id);
  if (!profile) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }

  return NextResponse.json(payload(profile));
}

export async function PATCH(request: Request) {
  const user = await getDashboardUser();
  if (!user || user.role !== "creator") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { country, niche_tags, price_per_post, complete } = body as Record<string, unknown>;
  const patch: Record<string, unknown> = {};

  if (country !== undefined) {
    if (country !== null && typeof country !== "string") {
      return NextResponse.json({ error: "country is invalid" }, { status: 400 });
    }
    patch.country = typeof country === "string" && country.trim() ? country.trim() : null;
  }

  if (niche_tags !== undefined) {
    if (!Array.isArray(niche_tags) || niche_tags.some((tag) => typeof tag !== "string")) {
      return NextResponse.json({ error: "niche_tags is invalid" }, { status: 400 });
    }
    const tags = [...new Set(niche_tags.map((tag) => tag.trim()).filter(Boolean))];
    if (tags.length > 3) {
      return NextResponse.json({ error: "Pick up to 3 industries" }, { status: 400 });
    }
    if (!tags.every(isCreatorIndustry)) {
      return NextResponse.json({ error: "niche_tags contains an unknown industry" }, { status: 400 });
    }
    patch.niche_tags = tags;
  }

  if (price_per_post !== undefined) {
    const price = typeof price_per_post === "number" ? price_per_post : Number(price_per_post);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "price_per_post is invalid" }, { status: 400 });
    }
    patch.price_per_post = price;
  }

  const admin = createAdminSupabaseClient();
  const current = await getCreatorProfile(user.id);
  if (!current) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }

  if (complete === true) {
    const nextCountry = (patch.country as string | null | undefined) ?? current.country;
    const nextTags = (patch.niche_tags as string[] | undefined) ?? current.niche_tags;
    const nextPrice = (patch.price_per_post as number | undefined) ?? current.price_per_post;
    if (!nextCountry || nextTags.length < 1 || !(nextPrice > 0)) {
      return NextResponse.json(
        { error: "Country, at least one industry, and a price are required to finish" },
        { status: 400 },
      );
    }
    patch.onboarding_completed_at = new Date().toISOString();
    if (patch.price_per_post === undefined) {
      patch.price_per_post = nextPrice;
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(payload(current));
  }

  const { data, error } = await admin
    .from("creator_profiles")
    .update(patch)
    .eq("user_id", user.id)
    .select(PROFILE_SELECT)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Update failed" }, { status: 500 });
  }

  const profile = await getCreatorProfile(user.id);
  if (!profile) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }
  return NextResponse.json(payload(profile));
}
