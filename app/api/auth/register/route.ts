import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type Role = "brand" | "creator";

function isRole(value: unknown): value is Role {
  return value === "brand" || value === "creator";
}

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

  const { email, password, role } = body as Record<string, unknown>;

  if (typeof email !== "string" || email.length === 0) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "password is required" }, { status: 400 });
  }
  if (!isRole(role)) {
    return NextResponse.json({ error: 'role must be "brand" or "creator"' }, { status: 400 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const admin = createAdminSupabaseClient();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    const authUser = signUpData.user;
    if (!authUser) {
      return NextResponse.json({ error: "Registration failed" }, { status: 400 });
    }

    // Duplicate emails can return a user with no identities; do not insert or delete.
    if (!authUser.identities || authUser.identities.length === 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const { error: insertError } = await admin.from("users").insert({
      id: authUser.id,
      email: authUser.email ?? email,
      role,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      // Already has a public.users row — do not roll back auth.
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 });
      }

      // signUp already created auth.users; delete it so the email can be retried.
      const { error: deleteError } = await admin.auth.admin.deleteUser(authUser.id);
      if (deleteError) {
        return NextResponse.json(
          {
            error:
              "Registration failed after account creation and could not be rolled back. Try logging in, or contact support.",
          },
          { status: 500 },
        );
      }

      return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }

    return NextResponse.json({
      user: { id: authUser.id, email: authUser.email ?? email, role },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
