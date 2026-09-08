import { NextRequest, NextResponse } from "next/server";
import {
  dashboardPath,
  ensurePublicUser,
  getAuthOrigin,
  getPublicUserRole,
  isAppRole,
  safeNextPath,
} from "@/lib/auth/oauth";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

/** Finish first-time OAuth when the user still needs to pick creator vs brand. */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const origin = getAuthOrigin(request);
  const roleParam = url.searchParams.get("role");
  const next = safeNextPath(url.searchParams.get("next"));

  if (!isAppRole(roleParam)) {
    return NextResponse.redirect(new URL("/register?complete=1", origin));
  }

  const pending = NextResponse.redirect(origin);
  const supabase = createRouteSupabaseClient(request, pending, origin);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(new URL("/login?reauth=1", origin));
  }

  let role;
  try {
    const existing = await getPublicUserRole(user.id);
    role = await ensurePublicUser(user, existing ?? roleParam);
  } catch {
    return NextResponse.redirect(new URL("/register?complete=1&error=oauth", origin));
  }

  const destination = next ?? dashboardPath(role);
  const response = NextResponse.redirect(new URL(destination, origin));
  pending.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });
  return response;
}
