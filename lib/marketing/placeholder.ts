import type { PricingPlan } from "@/components/marketing/PricingCards";

export const HOME_LOGOS = [
  { name: "Logo A" },
  { name: "Logo B" },
  { name: "Logo C" },
];

export const HOME_STEPS = [
  { title: "Step one", description: "Placeholder step one copy." },
  { title: "Step two", description: "Placeholder step two copy." },
  { title: "Step three", description: "Placeholder step three copy." },
];

export const HOME_STATS = [
  { label: "Placeholder metric", value: "0" },
  { label: "Placeholder metric two", value: "0" },
  { label: "Placeholder metric three", value: "0" },
];

export const HOME_PLANS: PricingPlan[] = [
  {
    name: "Self-serve",
    price: "Placeholder",
    features: ["Placeholder feature one", "Placeholder feature two"],
  },
  {
    name: "Managed",
    price: "Placeholder",
    features: ["Placeholder feature one", "Placeholder feature two"],
  },
];

export const HOME_FAQ = [
  { question: "Placeholder question one?", answer: "Placeholder answer one." },
  { question: "Placeholder question two?", answer: "Placeholder answer two." },
];

export const VERTICALS = [
  "saas",
  "fintech",
  "healthcare",
  "ecommerce",
  "cybersecurity",
  "ai",
  "marketing",
  "hr",
] as const;

export type Vertical = (typeof VERTICALS)[number];

export function isVertical(value: string): value is Vertical {
  return (VERTICALS as readonly string[]).includes(value);
}

export const FREE_TOOLS = [
  { slug: "roi-calculator", name: "ROI calculator" },
  { slug: "follower-value", name: "Follower value" },
  { slug: "campaign-budget", name: "Campaign budget" },
] as const;

export type FreeToolSlug = (typeof FREE_TOOLS)[number]["slug"];

export function isFreeToolSlug(value: string): value is FreeToolSlug {
  return FREE_TOOLS.some((tool) => tool.slug === value);
}

export type PlaceholderPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body: string;
};

// TODO: replace with a real data source once a blog endpoint is added to docs/naano-api-contract.md.
export const PLACEHOLDER_POSTS: PlaceholderPost[] = [
  {
    slug: "placeholder-post",
    title: "Placeholder post title",
    excerpt: "Placeholder excerpt.",
    publishedAt: "2026-01-01",
    body: "Placeholder post body.",
  },
  {
    slug: "second-placeholder-post",
    title: "Second placeholder post",
    excerpt: "Second placeholder excerpt.",
    publishedAt: "2026-02-01",
    body: "Second placeholder post body.",
  },
];
