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

export function appRoleFromRegisterParam(role: string | undefined): AppRole | null {
  if (role === "influencer" || role === "creator") {
    return "creator";
  }
  if (role === "saas" || role === "brand") {
    return "brand";
  }
  return null;
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

function displayNameFromAuthUser(authUser: User, email: string): string {
  const meta = authUser.user_metadata ?? {};
  const fullName = typeof meta.full_name === "string" ? meta.full_name.trim() : "";
  if (fullName) {
    return fullName;
  }
  const first = typeof meta.first_name === "string" ? meta.first_name.trim() : "";
  const last = typeof meta.last_name === "string" ? meta.last_name.trim() : "";
  const combined = [first, last].filter(Boolean).join(" ");
  if (combined) {
    return combined;
  }
  const local = email.split("@")[0]?.trim();
  return local || "Creator";
}

function slugBaseFromName(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "creator";
}

/** Creates a marketplace profile if this creator does not already have one. */
export async function ensureCreatorProfile(
  authUser: User,
  options?: { firstName?: string | null; lastName?: string | null },
): Promise<void> {
  const admin = createAdminSupabaseClient();
  const { data: existing, error: lookupError } = await admin
    .from("creator_profiles")
    .select("id")
    .eq("user_id", authUser.id)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }
  if (existing) {
    return;
  }

  const email = authUser.email ?? "";
  const named =
    [options?.firstName, options?.lastName].filter(Boolean).join(" ").trim() ||
    displayNameFromAuthUser(authUser, email);
  const base = slugBaseFromName(named);
  const avatar =
    typeof authUser.user_metadata?.avatar_url === "string"
      ? authUser.user_metadata.avatar_url
      : typeof authUser.user_metadata?.picture === "string"
        ? authUser.user_metadata.picture
        : null;

  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = attempt === 0 ? "" : `-${crypto.randomUUID().slice(0, 8)}`;
    const slug = `${base}${suffix}`;
    const { error: insertError } = await admin.from("creator_profiles").insert({
      id: crypto.randomUUID(),
      user_id: authUser.id,
      slug,
      name: named,
      bio: null,
      niche_tags: [],
      country: null,
      follower_count: 0,
      price_per_post: 0,
      avatar_url: avatar,
      created_at: new Date().toISOString(),
    });

    if (!insertError) {
      return;
    }
    // Unique slug collision — retry with a suffix.
    if (insertError.code === "23505") {
      continue;
    }
    throw new Error(insertError.message);
  }

  throw new Error("Could not allocate a unique creator slug");
}

export async function getPublicUserRole(authUserId: string): Promise<AppRole | null> {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.from("users").select("role").eq("id", authUserId).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  if (data?.role === "creator" || data?.role === "brand") {
    return data.role;
  }
  return null;
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
    if (existing.role === "creator") {
      await ensureCreatorProfile(authUser);
    }
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

  let role: AppRole = fallbackRole;
  if (insertError?.code === "23505") {
    const { data: raced } = await admin.from("users").select("role").eq("id", authUser.id).maybeSingle();
    if (raced?.role === "creator" || raced?.role === "brand") {
      role = raced.role;
    }
  }

  if (role === "creator") {
    await ensureCreatorProfile(authUser);
  }

  return role;
}
