import { NextRequest, NextResponse } from "next/server";
import {
  OAUTH_ROLE_COOKIE,
  getAuthOrigin,
  isAppRole,
  isOAuthProvider,
  safeNextPath,
} from "@/lib/auth/oauth";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const origin = getAuthOrigin(request);
  const provider = url.searchParams.get("provider");

  if (!isOAuthProvider(provider)) {
    return NextResponse.redirect(new URL("/login?error=oauth", origin));
  }

  const redirectTo = new URL("/api/auth/callback", origin);
  const next = safeNextPath(url.searchParams.get("next"));
  if (next) {
    redirectTo.searchParams.set("next", next);
  }

  const pending = NextResponse.redirect(origin);
  const supabase = createRouteSupabaseClient(request, pending, origin);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo.toString(),
      queryParams:
        provider === "google"
          ? {
              access_type: "offline",
              prompt: "select_account",
            }
          : undefined,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(new URL("/login?error=oauth", origin));
  }

  const response = NextResponse.redirect(data.url);
  pending.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  const role = url.searchParams.get("role");
  if (isAppRole(role)) {
    response.cookies.set(OAUTH_ROLE_COOKIE, role, {
      path: "/",
      maxAge: 60 * 10,
      sameSite: "lax",
      httpOnly: true,
      secure: origin.startsWith("https"),
    });
  }

  return response;
}
