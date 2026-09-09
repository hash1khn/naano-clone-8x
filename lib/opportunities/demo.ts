export type DemoOpportunity = {
  campaignId: string;
  createdAt: string;
  campaignName: string;
  brand: string;
  website: string | null;
  excerpt: string;
  applied: boolean;
  booked: boolean;
  applicationMode: "naano" | "external_sourcing";
  externalPartnerName: string | null;
  externalMinimumFollowers: number | null;
  logo: string | null;
  tags: string[];
  geo: string[];
  briefAvailable: boolean;
  fit: number;
  matchPct: number | null;
};

export const DEMO_OPPORTUNITIES: DemoOpportunity[] = [
  {
    campaignId: "f4458d6d-883b-42e7-9e44-009472208e8b",
    createdAt: "2026-07-11T18:46:46.061222+00:00",
    campaignName: "Main campaign",
    brand: "Premium Inboxes",
    website: "https://premiuminboxes.com/",
    excerpt:
      "Drive signups. Get the reader to the pricing page / infrastructure calculator and start with 30 inboxes. Primary CTA: “Get your inboxes live in under 6 hours”.",
    applied: false,
    booked: false,
    applicationMode: "naano",
    externalPartnerName: null,
    externalMinimumFollowers: null,
    logo: "https://unavatar.io/premiuminboxes.com",
    tags: ["SaaS", "Software", "Sales", "Marketing"],
    geo: [
      "Europe",
      "North America",
      "Latin America",
      "Asia",
      "Africa",
      "Oceania",
      "Middle East",
      "Worldwide",
    ],
    briefAvailable: true,
    fit: 1,
    matchPct: 100,
  },
  {
    campaignId: "fbbb6f26-e121-463e-bb68-fb0c24c9a0e9",
    createdAt: "2026-07-05T14:29:48.383273+00:00",
    campaignName: "Main campaign",
    brand: "OrbiSearch",
    website: "https://orbisearch.com/",
    excerpt:
      "Generate qualified clicks to OrbiSearch and drive people to sign up and try the tool (100 free lookups / 500 free validations upon signup).",
    applied: false,
    booked: false,
    applicationMode: "naano",
    externalPartnerName: null,
    externalMinimumFollowers: null,
    logo: null,
    tags: ["SaaS", "Software", "Sales", "AI"],
    geo: [
      "Europe",
      "North America",
      "Latin America",
      "Asia",
      "Oceania",
      "Middle East",
      "Worldwide",
    ],
    briefAvailable: true,
    fit: 1,
    matchPct: 100,
  },
];

export function opportunityTone(o: Pick<DemoOpportunity, "campaignId" | "brand">) {
  const raw = `${o.campaignId}${o.brand}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return (hash % 6) + 1;
}

export function opportunityFitClass(value: number | null | undefined) {
  const n = Number(value) || 0;
  if (n >= 70) {
    return "";
  }
  if (n >= 40) {
    return " is-mid";
  }
  return " is-low";
}

export function brandInitials(brand: string) {
  const parts = brand.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "B") + (parts[1]?.[0] ?? "")).toUpperCase();
}
