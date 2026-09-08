import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export type CompanyResults = {
  total_impressions: number;
  total_clicks: number;
  total_leads: number;
  total_pipeline_value: number;
  trend: { date: string; value: number }[];
};

export const EMPTY_COMPANY_RESULTS: CompanyResults = {
  total_impressions: 0,
  total_clicks: 0,
  total_leads: 0,
  total_pipeline_value: 0,
  trend: [],
};

export async function getCompanyResults(companyId: string): Promise<CompanyResults> {
  const admin = createAdminSupabaseClient();
  const { data: campaigns } = await admin.from("campaigns").select("id").eq("company_id", companyId);
  const campaignIds = (campaigns ?? []).map((row) => row.id);
  if (campaignIds.length === 0) {
    return EMPTY_COMPANY_RESULTS;
  }

  const { data: deals } = await admin.from("deals").select("id").in("campaign_id", campaignIds);
  const dealIds = (deals ?? []).map((row) => row.id);
  if (dealIds.length === 0) {
    return EMPTY_COMPANY_RESULTS;
  }

  const { data: posts } = await admin
    .from("posts")
    .select("impressions, clicks, leads, attributed_pipeline_value, created_at")
    .in("deal_id", dealIds);

  const rows = posts ?? [];
  const totals = rows.reduce(
    (acc, row) => {
      acc.total_impressions += row.impressions ?? 0;
      acc.total_clicks += row.clicks ?? 0;
      acc.total_leads += row.leads ?? 0;
      acc.total_pipeline_value += Number(row.attributed_pipeline_value ?? 0);
      const date = (row.created_at ?? "").slice(0, 10);
      if (date) {
        acc.byDate.set(date, (acc.byDate.get(date) ?? 0) + (row.impressions ?? 0));
      }
      return acc;
    },
    {
      total_impressions: 0,
      total_clicks: 0,
      total_leads: 0,
      total_pipeline_value: 0,
      byDate: new Map<string, number>(),
    },
  );

  return {
    total_impressions: totals.total_impressions,
    total_clicks: totals.total_clicks,
    total_leads: totals.total_leads,
    total_pipeline_value: totals.total_pipeline_value,
    trend: [...totals.byDate.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({ date, value })),
  };
}

export async function companyOwnedByUser(companyId: string, userId: string): Promise<boolean> {
  const admin = createAdminSupabaseClient();
  const { data } = await admin.from("companies").select("id").eq("id", companyId).eq("user_id", userId).maybeSingle();
  return Boolean(data);
}
