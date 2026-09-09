export const CREATOR_ONBOARDING_PATH = "/creator/onboarding";
export const CREATOR_INDUSTRIES = [
  "AI",
  "CRM",
  "Cybersecurity",
  "B2B",
  "B2C",
  "SaaS",
  "Software",
  "Sales",
  "Marketing",
  "SEO",
  "Outreach",
  "Creative",
  "Productivity",
  "Fintech",
  "HealthTech",
  "EdTech",
  "Growth / GTM",
  "HR",
  "E-commerce",
  "Developer Tools",
  "Data / Analytics",
  "Customer Support",
  "Design",
  "Real Estate / PropTech",
  "LegalTech",
] as const;

export type CreatorIndustry = (typeof CREATOR_INDUSTRIES)[number];

export const COUNTRIES: { name: string; code: string }[] = [
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Denmark", code: "DK" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Netherlands", code: "NL" },
  { name: "Nigeria", code: "NG" },
  { name: "Norway", code: "NO" },
  { name: "Pakistan", code: "PK" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Singapore", code: "SG" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
];

export type CreatorProfileLayoutCustom = {
  id: string;
  title: string;
  body: string;
};

export type CreatorProfileLayout = {
  order: string[];
  hidden: string[];
  custom: CreatorProfileLayoutCustom[];
};

export type OnboardingProfile = {
  id: string;
  slug: string | null;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  country: string | null;
  follower_count: number;
  niche_tags: string[];
  price_per_post: number;
  linkedin_url: string | null;
  onboarding_completed_at: string | null;
  profile_layout: CreatorProfileLayout | null;
};

const DEFAULT_SECTION_ORDER = ["about", "audience", "pricing"] as const;

export function emptyProfileLayout(): CreatorProfileLayout {
  return { order: [...DEFAULT_SECTION_ORDER], hidden: [], custom: [] };
}

export function normalizeProfileLayout(value: unknown): CreatorProfileLayout | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const row = value as Record<string, unknown>;
  const order = Array.isArray(row.order)
    ? row.order.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
  const hidden = Array.isArray(row.hidden)
    ? row.hidden.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
  const custom = Array.isArray(row.custom)
    ? row.custom
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const block = item as Record<string, unknown>;
          if (typeof block.id !== "string" || !block.id.trim()) return null;
          if (typeof block.title !== "string" || !block.title.trim()) return null;
          return {
            id: block.id.trim(),
            title: block.title.trim(),
            body: typeof block.body === "string" ? block.body : "",
          };
        })
        .filter((item): item is CreatorProfileLayoutCustom => Boolean(item))
    : [];

  const known = new Set<string>([...DEFAULT_SECTION_ORDER, ...custom.map((item) => `custom:${item.id}`)]);
  const cleanedOrder = order.filter((key) => known.has(key) || key.startsWith("custom:"));
  for (const key of DEFAULT_SECTION_ORDER) {
    if (!cleanedOrder.includes(key)) cleanedOrder.push(key);
  }
  for (const block of custom) {
    const key = `custom:${block.id}`;
    if (!cleanedOrder.includes(key)) cleanedOrder.push(key);
  }

  return {
    order: cleanedOrder,
    hidden: hidden.filter((key) => cleanedOrder.includes(key)),
    custom,
  };
}

export function isCreatorIndustry(value: string): value is CreatorIndustry {
  return (CREATOR_INDUSTRIES as readonly string[]).includes(value);
}

export function isCreatorOnboardingComplete(profile: OnboardingProfile | null): boolean {
  return Boolean(profile?.onboarding_completed_at);
}

export function recommendedPrice(followers: number): number {
  const count = Number.isFinite(followers) && followers > 0 ? followers : 0;
  return Math.max(80, Math.round((count * 0.187) / 10) * 10);
}

export function countryFromLocation(location: string | null | undefined): string | null {
  if (!location) {
    return null;
  }
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const candidates = [...parts].reverse();
  for (const part of candidates) {
    const match = COUNTRIES.find((country) => country.name.toLowerCase() === part.toLowerCase());
    if (match) {
      return match.name;
    }
  }
  for (const country of COUNTRIES) {
    if (location.toLowerCase().includes(country.name.toLowerCase())) {
      return country.name;
    }
  }
  return parts.at(-1) ?? null;
}

export function countryCode(name: string | null | undefined): string | null {
  if (!name) {
    return null;
  }
  const trimmed = name.trim();
  if (trimmed.length === 2 && /^[a-zA-Z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  return COUNTRIES.find((country) => country.name.toLowerCase() === trimmed.toLowerCase())?.code ?? null;
}

export function flagEmoji(code: string | null | undefined): string | null {
  if (!code || code.length !== 2) {
    return null;
  }
  const upper = code.toUpperCase();
  return String.fromCodePoint(127397 + upper.charCodeAt(0), 127397 + upper.charCodeAt(1));
}

export function formatFollowerCount(count: number): string {
  if (!count || count <= 0) {
    return "—";
  }
  if (count < 1000) {
    return String(count);
  }
  const thousands = count / 1000;
  const rounded = thousands >= 10 ? Math.round(thousands) : Math.round(thousands * 10) / 10;
  return `${String(rounded).replace(/\.0$/, "")}K`;
}

export function formatExactFollowers(count: number): string {
  if (!count || count <= 0) {
    return "";
  }
  return count.toLocaleString("en-US");
}

export function isImportOk(profile: Pick<OnboardingProfile, "linkedin_url" | "bio">): boolean {
  return Boolean(profile.linkedin_url) && profile.bio !== null;
}

export function isImportPaused(profile: Pick<OnboardingProfile, "linkedin_url" | "bio">): boolean {
  return Boolean(profile.linkedin_url) && profile.bio === null;
}
