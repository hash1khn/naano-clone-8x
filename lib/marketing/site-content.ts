import type { PricingPlan } from "@/components/marketing/PricingCards";

// Content below is copied from a scrape of the real naano.com production
// site (index.html, agencies.html, pricing.md, llms.txt), Sep 2026.

export const TRUSTED_LOGOS = [
  { name: "BlogSEO", src: "/lp/logo-blogseo.png" },
  { name: "lemlist", src: "/lp/logo-lemlist.png" },
  { name: "folk", src: "/lp/logo-folk.png" },
  { name: "Leadbay", src: "/lp/logo-leadbay.png" },
  { name: "Ringover", src: "/lp/logo-ringover.png" },
  { name: "Attio", src: "/lp/logo-attio.jpg" },
  { name: "La Growth Machine", src: "/lp/logo-lagrowthmachine.png" },
  { name: "gojiberry", src: "/lp/logo-gojiberry.png" },
  { name: "ChatSEO", src: "/lp/logo-chatseo.png" },
  { name: "Abyssale", src: "/lp/logo-abyssale.png" },
];

export const MARKETPLACE_STATS = [
  { label: "Specialist B2B voices, ready to collaborate.", value: "3,000+ vetted creators" },
  { label: "Local expertise with genuinely global reach.", value: "Across 100 countries" },
  { label: "Audience fit comes before follower count.", value: "96% AI & SaaS creator match" },
];

export const HOME_STEPS = [
  {
    title: "Find creators your buyers trust",
    description: "Rank creators by audience fit and category relevance, not follower count.",
  },
  {
    title: "Build a campaign brief in minutes",
    description: "AI-assisted objectives, key messages, creator guidelines and tracking links.",
  },
  {
    title: "Manage every collaboration",
    description: "Track every deal from draft to scheduled, live and delivered in one board.",
  },
  {
    title: "Track reach, clicks, and leads",
    description: "Attributed pipeline, views and leads tied back to the exact post that drove them.",
  },
  {
    title: "Pay creators without the admin",
    description: "Contracts, invoices and payouts handled automatically via Stripe Connect.",
  },
];

export const PROOF_STATS = [
  { label: "Impressions generated", value: "5M+" },
  { label: "Leads generated", value: "30K+" },
  { label: "Creators on Naano", value: "2,000+" },
  { label: "Posts published", value: "5K+" },
];

export const SAMPLE_HIGHLIGHT_POSTS = [
  {
    name: "Thomas Higadère",
    role: "Creator · B2B & AI · 34K followers",
    hook: "How AI changed our prospecting workflow for wealth managers and private bankers.",
    impressions: "42.8K",
    clicks: "312",
    leads: "18",
  },
  {
    name: "Robin Tempe",
    role: "Creator · Sales & AI · 12K followers",
    hook: "I run my entire prospecting workflow through an AI. Here is how.",
    impressions: "9K",
    clicks: "100",
    leads: "50",
  },
  {
    name: "Eric Djavid",
    role: "Sales Leader · B2B · 40K followers",
    hook: "Most sales teams spend 80% of their time on the wrong leads. Here is how I changed that.",
    impressions: "20K",
    clicks: "350",
    leads: "80",
  },
  {
    name: "Marina Panova",
    role: "Content Creator · B2B · 34K followers",
    hook: "How I build my 30-day LinkedIn content system, the exact playbook.",
    impressions: "100K",
    clicks: "1,600",
    leads: "320",
  },
];

export const HOME_PLANS: PricingPlan[] = [
  {
    name: "Self-Serve",
    price: "€0 / month",
    features: [
      "Creator marketplace access",
      "AI-powered brief creation",
      "Track clicks, companies and pipeline",
      "Automatic creator payouts",
    ],
  },
  {
    name: "Managed Campaigns",
    price: "€700 / month",
    features: [
      "Campaign strategy and positioning",
      "Creator sourcing and coordination",
      "Brief creation and campaign launch",
      "Reporting and optimisation",
    ],
  },
];

export const HOME_FAQ = [
  {
    question: "What is Naano?",
    answer:
      "Naano is a B2B LinkedIn creator marketplace: companies discover and book vetted creators for sponsored LinkedIn campaigns, each at a fixed price per post set by the creator. The marketplace spans creators from niche voices with around 1,000 followers to established B2B creators with audiences of several hundred thousand.",
  },
  {
    question: "How does Naano find the right creators?",
    answer:
      "Our matching engine scores every creator on audience fit, category relevance and engagement quality across LinkedIn, X and YouTube, so you rank creators by who actually reaches your buyers, not by follower count.",
  },
  {
    question: "Which networks do you support?",
    answer:
      "LinkedIn, X and YouTube today, with more on the way. You can compare creators and track performance across every network in one place.",
  },
  {
    question: "How does per-post pricing work?",
    answer:
      "Campaigns start from €20 per published post, you only pay for posts that go live, with no retainer. Prefer a hands-off setup? Done for you adds our team executing everything end to end.",
  },
  {
    question: "How does attribution work?",
    answer:
      "Naano places a tracking pixel at every stage of the funnel, so each click, lead, pipeline and revenue is tied back to the exact creator and post that drove it.",
  },
  {
    question: "Do you handle creator payouts?",
    answer:
      "Yes. Approve content and pay every creator in one click, securely via Stripe Connect, invoices and approvals are handled for you.",
  },
  {
    question: "What's the difference between Free and Done for you?",
    answer:
      "Free gives your team the platform to source creators and run simple campaigns yourselves. Done for you adds hands-on execution by the Naano team, sourcing, briefs, reporting and optimisation.",
  },
  {
    question: "Can I upgrade or cancel anytime?",
    answer: "Absolutely. Plans are month-to-month, you can upgrade, downgrade or cancel whenever you like.",
  },
];

export const CASE_STUDY_TESTIMONIAL = {
  quote:
    "Naano became one of our fastest acquisition channels. We know exactly what every creator brings.",
  author: "Vincent Josse",
  role: "CEO & Founder, BlogSEO",
  posterSrc: "/lp/blogseo-vincent-video-poster.png",
  duration: "2:40",
  stats: [
    { label: "Creators activated", value: "9" },
    { label: "Qualified clicks", value: "2,940" },
    { label: "Trials started", value: "512" },
  ],
};

// Real vertical slugs from naano.com/llms.txt ("By vertical" section).
export const VERTICALS = [
  "sales-tech",
  "revops",
  "devtools",
  "product",
  "hr-tech",
  "fintech",
  "marketing-ops",
  "vertical-saas",
] as const;

export type Vertical = (typeof VERTICALS)[number];

export function isVertical(value: string): value is Vertical {
  return (VERTICALS as readonly string[]).includes(value as Vertical);
}
