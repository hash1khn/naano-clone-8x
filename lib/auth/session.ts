import { redirect } from "next/navigation";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/auth/oauth";

export type DashboardUser = {
  id: string;
  email: string;
  role: AppRole;
  first_name: string | null;
  last_name: string | null;
};

export type DashboardCompany = {
  id: string;
  name: string | null;
  plan: string | null;
};

export async function getDashboardUser(): Promise<DashboardUser | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("users")
    .select("id, email, role, first_name, last_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data || (data.role !== "brand" && data.role !== "creator")) {
    return null;
  }

  return {
    id: data.id,
    email: data.email ?? user.email ?? "",
    role: data.role,
    first_name: data.first_name,
    last_name: data.last_name,
  };
}

export async function requireBrandUser(): Promise<DashboardUser> {
  const user = await getDashboardUser();
  if (!user) {
    redirect("/login?reauth=1");
  }
  if (user.role !== "brand") {
    redirect("/creator");
  }
  return user;
}

export async function requireCreatorUser(): Promise<DashboardUser> {
  const user = await getDashboardUser();
  if (!user) {
    redirect("/login?reauth=1");
  }
  if (user.role !== "creator") {
    redirect("/brand");
  }
  return user;
}

export async function getCompanyForUser(userId: string): Promise<DashboardCompany | null> {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("companies")
    .select("id, name, plan")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export function workspaceLabel(company: DashboardCompany | null, email: string): string {
  if (company?.name) {
    return company.name;
  }
  const domain = email.split("@")[1];
  return domain || email;
}
