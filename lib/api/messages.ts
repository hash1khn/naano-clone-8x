import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getAccessibleDeal, otherPartyUserId } from "@/lib/api/list-deals";
import type { Message } from "@/lib/api/types";
import type { DashboardUser } from "@/lib/auth/session";

function iso(value: string | null | undefined): string {
  if (!value) {
    return new Date(0).toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function toMessage(row: {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string | null;
  created_at: string | null;
}): Message {
  return {
    id: row.id,
    sender_id: row.sender_id,
    recipient_id: row.recipient_id,
    body: row.body ?? "",
    created_at: iso(row.created_at),
  };
}

async function resolveUserId(candidate: string): Promise<string | null> {
  const admin = createAdminSupabaseClient();
  const { data: user } = await admin.from("users").select("id").eq("id", candidate).maybeSingle();
  if (user) {
    return user.id;
  }
  const { data: profile } = await admin.from("creator_profiles").select("user_id").eq("id", candidate).maybeSingle();
  return profile?.user_id ?? null;
}

export async function listMessagesForDeal(user: DashboardUser, dealId: string): Promise<Message[] | "forbidden"> {
  const deal = await getAccessibleDeal(user, dealId);
  if (!deal) {
    return "forbidden";
  }

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("messages")
    .select("id, sender_id, recipient_id, body, created_at")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: true });
  if (error || !data) {
    return [];
  }
  return data.map(toMessage);
}

export async function listMessagesWithUser(user: DashboardUser, withUserId: string): Promise<Message[]> {
  const admin = createAdminSupabaseClient();
  const [sent, received] = await Promise.all([
    admin
      .from("messages")
      .select("id, sender_id, recipient_id, body, created_at")
      .eq("sender_id", user.id)
      .eq("recipient_id", withUserId),
    admin
      .from("messages")
      .select("id, sender_id, recipient_id, body, created_at")
      .eq("sender_id", withUserId)
      .eq("recipient_id", user.id),
  ]);
  const rows = [...(sent.data ?? []), ...(received.data ?? [])];
  rows.sort((a, b) => iso(a.created_at).localeCompare(iso(b.created_at)));
  return rows.map(toMessage);
}

export async function sendMessage(
  user: DashboardUser,
  input: { recipient_id: string; deal_id?: string; body: string },
): Promise<{ message: Message } | { error: string; status: number }> {
  const body = input.body.trim();
  if (!body) {
    return { error: "body is required", status: 400 };
  }

  const recipientId = await resolveUserId(input.recipient_id);
  if (!recipientId) {
    return { error: "recipient_id is invalid", status: 400 };
  }
  if (recipientId === user.id) {
    return { error: "recipient_id must be another user", status: 400 };
  }

  let dealId: string | null = input.deal_id ?? null;
  if (dealId) {
    const deal = await getAccessibleDeal(user, dealId);
    if (!deal) {
      return { error: "Forbidden", status: 403 };
    }
    const otherId = await otherPartyUserId(user, deal);
    if (!otherId || otherId !== recipientId) {
      return { error: "recipient_id does not match this deal", status: 400 };
    }
  }

  const admin = createAdminSupabaseClient();
  const row = {
    id: crypto.randomUUID(),
    sender_id: user.id,
    recipient_id: recipientId,
    deal_id: dealId,
    body,
    created_at: new Date().toISOString(),
  };
  const { data, error } = await admin
    .from("messages")
    .insert(row)
    .select("id, sender_id, recipient_id, body, created_at")
    .single();
  if (error || !data) {
    return { error: error?.message ?? "Failed to send message", status: 500 };
  }
  return { message: toMessage(data) };
}
