import { NextRequest, NextResponse } from "next/server";
import {
  OAUTH_ROLE_COOKIE,
  ensurePublicUser,
  getAuthOrigin,
  getPublicUserRole,
  isAppRole,
  safeNextPath,
} from "@/lib/auth/oauth";
import { postAuthPathForUser } from "@/lib/creator/require-onboarding";
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
  const intendedRole = isAppRole(cookieRole) ? cookieRole : null;

  let role;
  try {
    const existingRole = await getPublicUserRole(user.id);
    if (existingRole) {
      role = await ensurePublicUser(user, existingRole);
    } else if (intendedRole) {
      role = await ensurePublicUser(user, intendedRole);
    } else {
      // Session exists but no app role yet — ask the user (do not silently create a brand).
      const next = safeNextPath(url.searchParams.get("next"));
      const completeUrl = new URL("/register", origin);
      completeUrl.searchParams.set("complete", "1");
      if (next) {
        completeUrl.searchParams.set("next", next);
      }
      const response = NextResponse.redirect(completeUrl);
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
  } catch {
    return fail();
  }

  const next = safeNextPath(url.searchParams.get("next")) ?? (await postAuthPathForUser(user.id, role));
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
