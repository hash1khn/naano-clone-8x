import { NextRequest, NextResponse } from "next/server";
import {
  OAUTH_ROLE_COOKIE,
  dashboardPath,
  ensurePublicUser,
  getAuthOrigin,
  isAppRole,
  safeNextPath,
} from "@/lib/auth/oauth";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const origin = getAuthOrigin(request);
  const code = url.searchParams.get("code");
  const providerError = url.searchParams.get("error");
  const fail = () => NextResponse.redirect(new URL("/login?error=oauth", origin));

  if (providerError || !code) {
    return fail();
  }

  const pending = NextResponse.redirect(origin);
  const supabase = createRouteSupabaseClient(request, pending, origin);
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return fail();
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return fail();
  }

  const cookieRole = request.cookies.get(OAUTH_ROLE_COOKIE)?.value;
  const fallbackRole = isAppRole(cookieRole) ? cookieRole : "brand";

  let role;
  try {
    role = await ensurePublicUser(user, fallbackRole);
  } catch {
    return fail();
  }

  const next = safeNextPath(url.searchParams.get("next")) ?? dashboardPath(role);
  const response = NextResponse.redirect(new URL(next, origin));
  pending.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });
  response.cookies.set(OAUTH_ROLE_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: origin.startsWith("https"),
  });
  return response;
}
