import { NextResponse } from "next/server";
import { mapApifyItem, normalizeLinkedInUrl, scrapeLinkedInProfile } from "@/lib/apify/linkedin-profile";
import { getDashboardUser } from "@/lib/auth/session";
import { isImportOk, isImportPaused, recommendedPrice } from "@/lib/creator/onboarding";
import { getCreatorProfile } from "@/lib/creator/require-onboarding";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const maxDuration = 120;

function payload(profile: NonNullable<Awaited<ReturnType<typeof getCreatorProfile>>>) {
  return {
    profile,
    recommended_price: recommendedPrice(profile.follower_count),
    import_ok: isImportOk(profile),
    import_paused: isImportPaused(profile),
  };
}

export async function POST(request: Request) {
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

  const linkedinRaw =
    typeof body === "object" && body !== null && "linkedin_url" in body
      ? (body as { linkedin_url?: unknown }).linkedin_url
      : null;
  if (typeof linkedinRaw !== "string") {
    return NextResponse.json({ error: "linkedin_url is required" }, { status: 400 });
  }

  const linkedinUrl = normalizeLinkedInUrl(linkedinRaw);
  if (!linkedinUrl) {
    return NextResponse.json({ error: "Enter a public LinkedIn profile URL (linkedin.com/in/…)." }, { status: 400 });
  }

  const admin = createAdminSupabaseClient();
  const existing = await getCreatorProfile(user.id);
  if (!existing) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }

  await admin.from("creator_profiles").update({ linkedin_url: linkedinUrl }).eq("user_id", user.id);

  try {
    const item = await scrapeLinkedInProfile(linkedinUrl);
    const mapped = mapApifyItem(item, linkedinUrl);
    if (!mapped) {
      const profile = await getCreatorProfile(user.id);
      return NextResponse.json(
        {
          error: "import_paused",
          code: "import_paused",
          ...(profile ? payload(profile) : {}),
        },
        { status: 502 },
      );
    }

    const { error } = await admin
      .from("creator_profiles")
      .update({
        name: mapped.name,
        bio: mapped.bio,
        avatar_url: mapped.avatar_url ?? existing.avatar_url,
        country: mapped.country ?? existing.country,
        follower_count: mapped.follower_count,
        linkedin_url: mapped.linkedin_url,
      })
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message, code: "import_paused" }, { status: 502 });
    }

    const profile = await getCreatorProfile(user.id);
    if (!profile) {
      return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
    }
    return NextResponse.json(payload(profile));
  } catch (error) {
    console.error("LinkedIn import failed", error);
    const profile = await getCreatorProfile(user.id);
    return NextResponse.json(
      {
        error: "import_paused",
        code: "import_paused",
        ...(profile ? payload(profile) : {}),
      },
      { status: 502 },
    );
  }
}
