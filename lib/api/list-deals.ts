import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getCompanyForUser, type DashboardUser } from "@/lib/auth/session";
import type { DealListItem } from "@/lib/api/types";

type DealRow = {
  id: string;
  campaign_id: string;
  creator_id: string;
  price: number | string | null;
  status: string | null;
  tracking_link_id: string | null;
  created_at: string | null;
};

function iso(value: string | null | undefined): string {
  if (!value) {
    return new Date(0).toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

async function trackingSlugsByDealId(dealIds: string[]): Promise<Map<string, string>> {
  const slugs = new Map<string, string>();
  if (dealIds.length === 0) {
    return slugs;
  }

  const admin = createAdminSupabaseClient();
  const { data } = await admin.from("tracking_links").select("deal_id, slug").in("deal_id", dealIds);
  for (const row of data ?? []) {
    if (row.deal_id && row.slug) {
      slugs.set(row.deal_id, row.slug);
    }
  }
  return slugs;
}

function toDeal(row: DealRow, slugs: Map<string, string>): DealListItem {
  return {
    id: row.id,
    campaign_id: row.campaign_id,
    creator_id: row.creator_id,
    price: Number(row.price ?? 0),
    status: row.status ?? "draft",
    tracking_link: slugs.get(row.id) ?? "",
    created_at: iso(row.created_at),
  };
}

export async function listDealsForUser(user: DashboardUser): Promise<DealListItem[]> {
  const admin = createAdminSupabaseClient();

  if (user.role === "brand") {
    const company = await getCompanyForUser(user.id);
    if (!company) {
      return [];
    }
    const { data: campaigns } = await admin.from("campaigns").select("id").eq("company_id", company.id);
    const campaignIds = (campaigns ?? []).map((row) => row.id);
    if (campaignIds.length === 0) {
      return [];
    }
    const { data, error } = await admin
      .from("deals")
      .select("id, campaign_id, creator_id, price, status, tracking_link_id, created_at")
      .in("campaign_id", campaignIds)
      .order("created_at", { ascending: false });
    if (error || !data) {
      return [];
    }
    const slugs = await trackingSlugsByDealId(data.map((row) => row.id));
    return data.map((row) => toDeal(row, slugs));
  }

  const { data: profile } = await admin.from("creator_profiles").select("id").eq("user_id", user.id).maybeSingle();
  if (!profile) {
    return [];
  }
  const { data, error } = await admin
    .from("deals")
    .select("id, campaign_id, creator_id, price, status, tracking_link_id, created_at")
    .eq("creator_id", profile.id)
    .order("created_at", { ascending: false });
  if (error || !data) {
    return [];
  }
  const slugs = await trackingSlugsByDealId(data.map((row) => row.id));
  return data.map((row) => toDeal(row, slugs));
}

export async function getAccessibleDeal(user: DashboardUser, dealId: string): Promise<DealRow | null> {
  const admin = createAdminSupabaseClient();
  const { data: deal, error } = await admin
    .from("deals")
    .select("id, campaign_id, creator_id, price, status, tracking_link_id, created_at")
    .eq("id", dealId)
    .maybeSingle();
  if (error || !deal) {
    return null;
  }

  if (user.role === "brand") {
    const company = await getCompanyForUser(user.id);
    if (!company) {
      return null;
    }
    const { data: campaign } = await admin
      .from("campaigns")
      .select("id")
      .eq("id", deal.campaign_id)
      .eq("company_id", company.id)
      .maybeSingle();
    return campaign ? deal : null;
  }

  const { data: profile } = await admin
    .from("creator_profiles")
    .select("id")
    .eq("user_id", user.id)
    .eq("id", deal.creator_id)
    .maybeSingle();
  return profile ? deal : null;
}

export async function otherPartyUserId(user: DashboardUser, deal: DealRow): Promise<string | null> {
  const admin = createAdminSupabaseClient();
  if (user.role === "brand") {
    const { data } = await admin.from("creator_profiles").select("user_id").eq("id", deal.creator_id).maybeSingle();
    return data?.user_id ?? null;
  }

  const { data: campaign } = await admin.from("campaigns").select("company_id").eq("id", deal.campaign_id).maybeSingle();
  if (!campaign) {
    return null;
  }
  const { data: company } = await admin.from("companies").select("user_id").eq("id", campaign.company_id).maybeSingle();
  return company?.user_id ?? null;
}
