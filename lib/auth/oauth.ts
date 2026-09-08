import type { User } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const OAUTH_ROLE_COOKIE = "oauth_role";
export const PRODUCTION_APP_ORIGIN = "https://naano-clone-8x.vercel.app";

export type AppRole = "brand" | "creator";
export type OAuthProvider = "google" | "linkedin_oidc";

function firstHeader(request: NextRequest, name: string): string | null {
  const value = request.headers.get(name);
  if (!value) {
    return null;
  }
  return value.split(",")[0]?.trim() || null;
}

function isLocalHost(host: string): boolean {
  const hostname = host.split(":")[0];
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function allowedAuthHosts(): Set<string> {
  const hosts = new Set(["localhost", "127.0.0.1", "naano-clone-8x.vercel.app"]);
  if (process.env.VERCEL_URL) {
    hosts.add(process.env.VERCEL_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    hosts.add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      hosts.add(new URL(siteUrl).host);
    } catch {
      // ignore invalid SITE_URL
    }
  }
  return hosts;
}

export function getAuthOrigin(request: NextRequest): string {
  const forwardedHost = firstHeader(request, "x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? request.nextUrl.host;
  const hostname = host.split(":")[0];
  const forwardedProto = firstHeader(request, "x-forwarded-proto");
  const proto = forwardedProto ?? (isLocalHost(host) ? "http" : "https");
  const allowed = allowedAuthHosts();

  if (isLocalHost(host) || allowed.has(host) || allowed.has(hostname)) {
    return `${proto}://${host}`;
  }

  if (process.env.VERCEL && hostname.endsWith(".vercel.app")) {
    return `https://${host}`;
  }

  return request.nextUrl.origin.startsWith("http://localhost")
    ? request.nextUrl.origin
    : PRODUCTION_APP_ORIGIN;
}

export function isAppRole(value: string | null | undefined): value is AppRole {
  return value === "brand" || value === "creator";
}

export function isOAuthProvider(value: string | null): value is OAuthProvider {
  return value === "google" || value === "linkedin_oidc";
}

export function safeNextPath(value: string | null): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return null;
  }
  return value;
}

export function dashboardPath(role: AppRole): "/brand" | "/creator" {
  return role === "creator" ? "/creator" : "/brand";
}

export async function ensurePublicUser(authUser: User, fallbackRole: AppRole): Promise<AppRole> {
  const admin = createAdminSupabaseClient();
  const email = authUser.email;
  if (!email) {
    throw new Error("OAuth account has no email");
  }

  const { data: existing, error: lookupError } = await admin
    .from("users")
    .select("id, role")
    .eq("id", authUser.id)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (existing?.role === "creator" || existing?.role === "brand") {
    return existing.role;
  }

  const { error: insertError } = await admin.from("users").insert({
    id: authUser.id,
    email,
    role: fallbackRole,
    created_at: new Date().toISOString(),
  });

  if (insertError && insertError.code !== "23505") {
    throw new Error(insertError.message);
  }

  if (insertError?.code === "23505") {
    const { data: raced } = await admin.from("users").select("role").eq("id", authUser.id).maybeSingle();
    if (raced?.role === "creator" || raced?.role === "brand") {
      return raced.role;
    }
  }

  return fallbackRole;
}
