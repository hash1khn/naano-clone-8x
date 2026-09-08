import { ensureCreatorProfile } from "@/lib/auth/oauth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body as Record<string, unknown>;

  if (typeof email !== "string" || email.length === 0) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "password is required" }, { status: 400 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const admin = createAdminSupabaseClient();

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user || !data.session) {
      return NextResponse.json(
        { error: signInError?.message ?? "Login failed" },
        { status: 401 },
      );
    }

    const { data: profile, error: profileError } = await admin
      .from("users")
      .select("id, email, role, first_name, last_name")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json(
        { error: "Account is incomplete. Please register again." },
        { status: 409 },
      );
    }

    if (profile.role === "creator") {
      try {
        await ensureCreatorProfile(data.user, {
          firstName: profile.first_name,
          lastName: profile.last_name,
        });
      } catch {
        // Profile backfill failure should not block login; marketplace data may be empty.
      }
    }

    return NextResponse.json({
      user: { id: profile.id, email: profile.email, role: profile.role },
      session: data.session,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
