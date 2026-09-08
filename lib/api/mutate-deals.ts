import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getAccessibleDeal } from "@/lib/api/list-deals";
import { getCompanyForUser, type DashboardUser } from "@/lib/auth/session";

const STATUS_FLOW = ["draft", "scheduled", "live", "delivered"] as const;
export type DealStatus = (typeof STATUS_FLOW)[number];

export function isDealStatus(value: string): value is DealStatus {
  return (STATUS_FLOW as readonly string[]).includes(value);
}

export async function createDeal(
  user: DashboardUser,
  input: { campaign_id: string; creator_id: string; price: number },
): Promise<{ id: string; status: "draft" } | { error: string; status: number }> {
  if (user.role !== "brand") {
    return { error: "Forbidden", status: 403 };
  }
  const company = await getCompanyForUser(user.id);
  if (!company) {
    return { error: "Company required", status: 400 };
  }

  const admin = createAdminSupabaseClient();
  const { data: campaign } = await admin
    .from("campaigns")
    .select("id")
    .eq("id", input.campaign_id)
    .eq("company_id", company.id)
    .maybeSingle();
  if (!campaign) {
    return { error: "Campaign not found", status: 404 };
  }

  const { data: creator } = await admin.from("creator_profiles").select("id").eq("id", input.creator_id).maybeSingle();
  if (!creator) {
    return { error: "Creator not found", status: 404 };
  }

  const { data, error } = await admin
    .from("deals")
    .insert({
      campaign_id: input.campaign_id,
      creator_id: input.creator_id,
      price: input.price,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message || "Failed to create deal", status: 500 };
  }
  return { id: data.id, status: "draft" };
}

export async function updateDealStatus(
  user: DashboardUser,
  dealId: string,
  status: DealStatus,
): Promise<{ id: string; status: DealStatus } | { error: string; status: number }> {
  const deal = await getAccessibleDeal(user, dealId);
  if (!deal) {
    return { error: "Not found", status: 404 };
  }

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.from("deals").update({ status }).eq("id", dealId).select("id, status").single();
  if (error || !data) {
    return { error: error?.message || "Failed to update status", status: 500 };
  }
  return { id: data.id, status: (data.status as DealStatus) || status };
}

export async function approveDeal(
  user: DashboardUser,
  dealId: string,
): Promise<
  | { deal_id: string; approved_at: string; payout: { id: string; status: string } }
  | { error: string; status: number }
> {
  if (user.role !== "brand") {
    return { error: "Forbidden", status: 403 };
  }
  const deal = await getAccessibleDeal(user, dealId);
  if (!deal) {
    return { error: "Not found", status: 404 };
  }

  const admin = createAdminSupabaseClient();
  const approvedAt = new Date().toISOString();
  const { error: dealError } = await admin
    .from("deals")
    .update({ status: "delivered", approved_at: approvedAt })
    .eq("id", dealId);
  if (dealError) {
    return { error: dealError.message, status: 500 };
  }

  const amount = Number(deal.price ?? 0);
  const { data: payout, error: payoutError } = await admin
    .from("payouts")
    .insert({
      creator_id: deal.creator_id,
      deal_id: dealId,
      amount,
      status: "scheduled",
    })
    .select("id, status")
    .single();

  if (payoutError || !payout) {
    return {
      deal_id: dealId,
      approved_at: approvedAt,
      payout: { id: "", status: "scheduled" },
    };
  }

  return {
    deal_id: dealId,
    approved_at: approvedAt,
    payout: { id: payout.id, status: payout.status ?? "scheduled" },
  };
}
