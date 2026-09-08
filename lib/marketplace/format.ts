import type { Creator, CreatorListItem, SamplePost } from "@/lib/api/types";

const AVATAR_TONES = [
  ["#5B8DEF", "#3B6BD6"],
  ["#6C7AE0", "#4A57C5"],
  ["#3BA3C7", "#2B7FA3"],
  ["#5E9B78", "#3F7A5A"],
  ["#D08A4A", "#B56F32"],
  ["#C56B8A", "#A34E6C"],
] as const;

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷",
  France: "🇫🇷",
  US: "🇺🇸",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  GB: "🇬🇧",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
  IN: "🇮🇳",
  India: "🇮🇳",
  DE: "🇩🇪",
  Germany: "🇩🇪",
  ES: "🇪🇸",
  Spain: "🇪🇸",
  IT: "🇮🇹",
  Italy: "🇮🇹",
  NL: "🇳🇱",
  Netherlands: "🇳🇱",
  BE: "🇧🇪",
  Belgium: "🇧🇪",
  PT: "🇵🇹",
  Portugal: "🇵🇹",
  CA: "🇨🇦",
  Canada: "🇨🇦",
  AU: "🇦🇺",
  Australia: "🇦🇺",
  AE: "🇦🇪",
  UAE: "🇦🇪",
  "United Arab Emirates": "🇦🇪",
  SG: "🇸🇬",
  Singapore: "🇸🇬",
  IE: "🇮🇪",
  Ireland: "🇮🇪",
  CH: "🇨🇭",
  Switzerland: "🇨🇭",
  SE: "🇸🇪",
  Sweden: "🇸🇪",
  NO: "🇳🇴",
  Norway: "🇳🇴",
  DK: "🇩🇰",
  Denmark: "🇩🇰",
  PL: "🇵🇱",
  Poland: "🇵🇱",
  BR: "🇧🇷",
  Brazil: "🇧🇷",
};

export function compactNumber(value: number, locale: string): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "—";
  }
  const abs = Math.abs(value);
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: abs >= 1000 ? 1 : 0 });
  if (abs >= 1_000_000) {
    return `${formatter.format(value / 1_000_000)}M`;
  }
  if (abs >= 1000) {
    return `${formatter.format(value / 1000)}K`;
  }
  return formatter.format(value);
}

export function formatEuro(value: number, locale: string): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "—";
  }
  return `${Math.round(value).toLocaleString(locale)} €`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function countryFlag(country: string): string {
  const trimmed = country.trim();
  if (!trimmed) {
    return "";
  }
  return COUNTRY_FLAGS[trimmed] || COUNTRY_FLAGS[trimmed.toUpperCase()] || "";
}

export function roleLabel(creator: CreatorListItem, fallback: string): string {
  const tags = creator.niche_tags.filter(Boolean).slice(0, 2);
  return tags.length ? tags.join(" · ") : fallback;
}

export function skyTone(key: string): number {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (Math.abs(hash) % 6) + 1;
}

export function avatarTone(key: string): readonly [string, string] {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

export type ParsedSamplePost = {
  text: string;
  url?: string;
  postedAt?: string;
  impressions?: number;
  likes?: number;
  comments?: number;
  shares?: number;
};

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function parseSamplePosts(posts: SamplePost[]): ParsedSamplePost[] {
  return posts
    .map((post) => {
      const text =
        asString(post.text_content) ||
        asString(post.text) ||
        asString(post.body) ||
        asString(post.linkedin_url) ||
        "";
      return {
        text,
        url: asString(post.linkedin_url) || asString(post.linkedin_post_url) || asString(post.url),
        postedAt: asString(post.posted_at) || asString(post.created_at),
        impressions: asNumber(post.impressions) ?? asNumber(post.estimated_views),
        likes: asNumber(post.likes) ?? asNumber(post.public_reactions_count),
        comments: asNumber(post.comments) ?? asNumber(post.public_comments_count),
        shares: asNumber(post.shares) ?? asNumber(post.reposts_count),
      };
    })
    .filter((post) => post.text || post.url);
}

export function mergeCreator(listItem: CreatorListItem, detail: Creator | null): Creator {
  if (!detail) {
    return {
      ...listItem,
      bio: "",
      sample_posts: [],
    };
  }
  return detail;
}
