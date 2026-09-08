import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function requireSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return { url, anonKey };
}

export async function createServerSupabaseClient() {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

export function createRouteSupabaseClient(
  request: NextRequest,
  response: NextResponse,
  origin: string,
) {
  const { url, anonKey } = requireSupabaseEnv();

  return createServerClient(url, anonKey, {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      secure: origin.startsWith("https"),
    },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, {
            ...options,
            sameSite: "lax",
            secure: origin.startsWith("https"),
            path: options?.path ?? "/",
          });
        });
      },
    },
  });
}

