import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { CampaignListItem } from "@/lib/api/types";

function iso(value: string | null | undefined): string {
  if (!value) {
    return new Date(0).toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

export async function listCampaignsForCompany(companyId: string): Promise<CampaignListItem[]> {
  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("campaigns")
    .select("id, objective, status, created_at")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    objective: row.objective ?? "",
    status: row.status ?? "draft",
    created_at: iso(row.created_at),
  }));
}
