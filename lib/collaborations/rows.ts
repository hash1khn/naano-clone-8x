import type { CampaignListItem, CreatorListItem, DealListItem } from "@/lib/api/types";
import { compactNumber } from "@/lib/marketplace/format";
import type { CollaborationsCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

export type CollabTab = "all" | "active" | "received" | "invited" | "action" | "completed";

export type CollabStatusKey = "await" | "accepted" | "live" | "done" | "draft" | "app";

export type CollabRole = "brand" | "creator";

export type CollabRow = {
  id: string;
  kind: "booking" | "application";
  creatorId: string;
  campaignId: string;
  name: string;
  avatar: string;
  followers: string;
  campaign: string;
  statusKey: CollabStatusKey;
  dealStatus: string;
  next: string | null;
  due: string;
  amount: string;
  priceCents: number;
  committed: boolean;
  updated: string;
  updatedIso: string;
  trackingLink: string;
};

const ACTIVE: Record<string, true> = { accepted: true, draft: true, live: true };
const COMPLETED: Record<string, true> = { done: true };

function mapStatus(dealStatus: string): CollabStatusKey {
  switch (dealStatus) {
    case "scheduled":
      return "accepted";
    case "live":
      return "live";
    case "delivered":
      return "done";
    case "draft":
    default:
      return "await";
  }
}

function chipMeta(statusKey: CollabStatusKey, copy: CollaborationsCopy) {
  switch (statusKey) {
    case "await":
      return { label: copy.stAwait, bg: "#E9EDF4", fg: "#474E63" };
    case "accepted":
      return { label: copy.stAccepted, bg: "#E6F4F1", fg: "#0F766E" };
    case "live":
      return { label: copy.stLive, bg: "#E6F4F1", fg: "#0F766E" };
    case "done":
      return { label: copy.stDone, bg: "#E8F5E9", fg: "#166534" };
    case "draft":
      return { label: copy.stDraft, bg: "#EAF0FF", fg: "#1D5BF5" };
    case "app":
      return { label: copy.stApp, bg: "#FEF3E2", fg: "#B45309" };
  }
}

function nextAction(statusKey: CollabStatusKey, copy: CollaborationsCopy): string | null {
  switch (statusKey) {
    case "await":
      return copy.nextAwait;
    case "accepted":
      return copy.nextAccepted;
    case "draft":
      return copy.nextDraft;
    case "live":
      return copy.nextLive;
    case "app":
      return copy.nextApp;
    default:
      return null;
  }
}

function formatUpdated(iso: string, locale: Locale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  const loc = locale === "fr" ? "fr-FR" : "en-GB";
  return date.toLocaleDateString(loc, { day: "numeric", month: "short" });
}

function formatAmount(price: number, locale: Locale) {
  if (!Number.isFinite(price) || price <= 0) {
    return "—";
  }
  const loc = locale === "fr" ? "fr-FR" : "en-GB";
  return `€${Math.round(price).toLocaleString(loc)}`;
}

export function dealToCollabRow(
  deal: DealListItem,
  creatorsById: Map<string, CreatorListItem>,
  campaignsById: Map<string, CampaignListItem>,
  copy: CollaborationsCopy,
  locale: Locale,
  role: CollabRole = "brand",
): CollabRow {
  const creator = creatorsById.get(deal.creator_id);
  const campaign = campaignsById.get(deal.campaign_id);
  const statusKey = mapStatus(deal.status);
  const price = Number(deal.price ?? 0);
  const campaignLabel =
    campaign?.objective?.trim() || deal.campaign_objective?.trim() || copy.campaignFallback;

  const peer =
    role === "creator"
      ? {
          name: deal.company_name?.trim() || copy.brandFallback,
          avatar: "",
          followers: "—",
        }
      : {
          name: creator?.name || copy.creatorFallback,
          avatar: creator?.avatar_url || "",
          followers: creator ? compactNumber(creator.follower_count, locale === "fr" ? "fr-FR" : "en-US") : "—",
        };

  return {
    id: deal.id,
    kind: "booking",
    creatorId: deal.creator_id,
    campaignId: deal.campaign_id,
    name: peer.name,
    avatar: peer.avatar,
    followers: peer.followers,
    campaign: campaignLabel,
    statusKey,
    dealStatus: deal.status,
    next: nextAction(statusKey, copy),
    due: "—",
    amount: formatAmount(price, locale),
    priceCents: Math.round(price * 100),
    committed: statusKey !== "await" && statusKey !== "app",
    updated: formatUpdated(deal.created_at, locale),
    updatedIso: deal.created_at,
    trackingLink: deal.tracking_link || "",
  };
}

export function collabChip(statusKey: CollabStatusKey, copy: CollaborationsCopy) {
  return chipMeta(statusKey, copy);
}

export function needsBrandAction(row: CollabRow) {
  return row.kind === "booking" && (row.statusKey === "draft" || row.dealStatus === "live");
}

export function isActive(row: CollabRow) {
  return !!ACTIVE[row.statusKey] || needsBrandAction(row);
}

export function isSentInvitation(row: CollabRow) {
  return row.statusKey === "await";
}

export function isApplication(row: CollabRow) {
  return row.kind === "application" && row.statusKey === "app";
}

export function isCompleted(row: CollabRow) {
  return !!COMPLETED[row.statusKey];
}

export function filterCollabRows(rows: CollabRow[], tab: CollabTab) {
  switch (tab) {
    case "active":
      return rows.filter(isActive);
    case "received":
      return rows.filter(isApplication);
    case "invited":
      return rows.filter(isSentInvitation);
    case "action":
      return rows.filter(needsBrandAction);
    case "completed":
      return rows.filter(isCompleted);
    default:
      return rows;
  }
}

export function nextDealStatus(current: string): "scheduled" | "live" | "delivered" | null {
  if (current === "draft") return "scheduled";
  if (current === "scheduled") return "live";
  if (current === "live") return "delivered";
  return null;
}
