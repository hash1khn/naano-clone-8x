import { ApifyClient } from "apify-client";
import { countryFromLocation } from "@/lib/creator/onboarding";

const DEFAULT_ACTOR_ID = "automation-lab/linkedin-profile-scraper";

export type ApifyLinkedInItem = {
  name?: string | null;
  linkedinUrl?: string | null;
  headline?: string | null;
  location?: string | null;
  about?: string | null;
  followerCount?: number | null;
  profileImageUrl?: string | null;
  error?: string | null;
};

export type MappedLinkedInProfile = {
  name: string;
  bio: string;
  avatar_url: string | null;
  country: string | null;
  follower_count: number;
  linkedin_url: string;
};

export function normalizeLinkedInUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProto);
    if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) {
      return null;
    }
    const match = url.pathname.match(/\/in\/([^/?#]+)\/?/i);
    const slug = match?.[1] ? decodeURIComponent(match[1]) : "";
    if (!slug || slug.length < 2 || slug.includes(" ")) {
      return null;
    }
    return `https://www.linkedin.com/in/${slug}/`;
  } catch {
    return null;
  }
}

export function mapApifyItem(
  item: ApifyLinkedInItem | null | undefined,
  fallbackUrl: string,
): MappedLinkedInProfile | null {
  if (!item || item.error || !item.name?.trim()) {
    return null;
  }
  const headline = item.headline?.trim() || item.about?.trim() || "";
  const followers =
    typeof item.followerCount === "number"
      ? Math.round(item.followerCount)
      : Number(item.followerCount) > 0
        ? Math.round(Number(item.followerCount))
        : 0;
  return {
    name: item.name.trim(),
    bio: headline,
    avatar_url: item.profileImageUrl?.trim() || null,
    country: countryFromLocation(item.location),
    follower_count: followers,
    linkedin_url: normalizeLinkedInUrl(item.linkedinUrl || fallbackUrl) ?? fallbackUrl,
  };
}

function resolveActorId(): string {
  const raw = process.env.APIFY_LINKEDIN_ACTOR_ID?.trim();
  // Accept username/actor-name only. Run IDs like hqF6PbNMsLt4eHSX7 are not actors.
  if (raw && raw.includes("/") && !raw.includes(" ")) {
    return raw;
  }
  return DEFAULT_ACTOR_ID;
}

export async function scrapeLinkedInProfile(linkedinUrl: string): Promise<ApifyLinkedInItem> {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    throw new Error("APIFY_TOKEN is not configured");
  }

  const actorId = resolveActorId();
  const client = new ApifyClient({ token });
  const run = await client.actor(actorId).call(
    { profileUrls: [linkedinUrl], maxProfiles: 1 },
    { waitSecs: 90 },
  );

  if (run.status && run.status !== "SUCCEEDED") {
    return { linkedinUrl, error: `Apify run ${run.status}` };
  }

  const datasetId = run?.defaultDatasetId;
  if (!datasetId) {
    throw new Error("Apify run did not return a dataset");
  }

  const { items } = await client.dataset(datasetId).listItems({ limit: 1 });
  const first = items[0] as ApifyLinkedInItem | undefined;
  if (!first) {
    return { linkedinUrl, error: "No profile data returned" };
  }
  return first;
}
