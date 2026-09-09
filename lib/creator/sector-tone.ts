const TONES = {
  ai: { bg: "#F3E8FD", fg: "#8B3DD9" },
  mkt: { bg: "#FDE8F1", fg: "#D6356F" },
  sales: { bg: "#E8F0FD", fg: "#1D5BF5" },
  saas: { bg: "#E4F7EC", fg: "#12A150" },
  gtm: { bg: "#FEF3E0", fg: "#D97706" },
  soft: { bg: "#E7F5F4", fg: "#0E8C84" },
  fin: { bg: "#EDEAFB", fg: "#5B4BC4" },
  creative: { bg: "#FDEEE8", fg: "#D2541E" },
} as const;

type ToneKey = keyof typeof TONES;

const ALIASES: Record<string, ToneKey> = {
  ai: "ai",
  "artificial intelligence": "ai",
  data: "ai",
  analytics: "ai",
  marketing: "mkt",
  mkt: "mkt",
  seo: "mkt",
  content: "mkt",
  media: "mkt",
  "media / content": "mkt",
  sales: "sales",
  outreach: "sales",
  outbound: "sales",
  crm: "sales",
  revops: "sales",
  saas: "saas",
  b2b: "saas",
  "e-commerce": "saas",
  ecommerce: "saas",
  software: "soft",
  gtm: "gtm",
  growth: "gtm",
  "growth / gtm": "gtm",
  product: "gtm",
  soft: "soft",
  devtools: "soft",
  "developer tools": "soft",
  engineering: "soft",
  cybersecurity: "soft",
  security: "soft",
  fin: "fin",
  fintech: "fin",
  finance: "fin",
  legal: "fin",
  legaltech: "fin",
  creative: "creative",
  design: "creative",
  hr: "creative",
  education: "creative",
  health: "creative",
  healthtech: "creative",
};

const FALLBACK_KEYS = Object.keys(TONES) as ToneKey[];

export function sectorTone(label: string): { bg: string; fg: string } {
  const key = String(label || "")
    .trim()
    .toLowerCase();
  const mapped = ALIASES[key];
  if (mapped) {
    return TONES[mapped];
  }
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (31 * hash + key.charCodeAt(i)) >>> 0;
  }
  return TONES[FALLBACK_KEYS[hash % FALLBACK_KEYS.length]];
}
