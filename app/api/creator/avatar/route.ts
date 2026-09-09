import { NextResponse } from "next/server";
import { getDashboardUser } from "@/lib/auth/session";
import { recommendedPrice, isImportOk, isImportPaused } from "@/lib/creator/onboarding";
import { getCreatorProfile } from "@/lib/creator/require-onboarding";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const BUCKET = "avatars";
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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

  const profile = await getCreatorProfile(user.id);
  if (!profile) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Use a JPEG, PNG, WebP, or GIF image" }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 4MB" }, { status: 400 });
  }

  const admin = createAdminSupabaseClient();
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/gif" ? "gif" : "jpg";
  const path = `${user.id}/avatar-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await admin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: true,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message || "Upload failed" }, { status: 500 });
  }

  const { data: publicData } = admin.storage.from(BUCKET).getPublicUrl(path);
  const avatarUrl = publicData.publicUrl;

  const { error: updateError } = await admin
    .from("creator_profiles")
    .update({ avatar_url: avatarUrl })
    .eq("user_id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message || "Could not save avatar" }, { status: 500 });
  }

  const next = await getCreatorProfile(user.id);
  if (!next) {
    return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
  }
  return NextResponse.json(payload(next));
}
