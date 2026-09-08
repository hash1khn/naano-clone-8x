import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { PricingCards } from "@/components/marketing/PricingCards";
import { HOME_FAQ } from "@/lib/marketing/site-content";

// Content copied from the real naano.com/pricing.md (machine-readable pricing), Sep 2026.
const DETAILED_PLANS = [
  {
    name: "Self-Serve",
    price: "€0 / month",
    features: [
      "No retainer, no minimum spend",
      "Full access to the creator marketplace (2,000+ vetted creators across LinkedIn, X and YouTube)",
      "AI-powered brief creation",
      "Click, lead and pipeline tracking per post and per creator",
      "Automatic creator payouts via Stripe Connect",
      "Creator cost: from €20 per published post, shown before booking",
      "Support: self-serve platform, help center and email support",
      "Billing: month-to-month, cancel anytime",
    ],
  },
  {
    name: "Managed Campaigns",
    price: "€700 / month",
    features: [
      "Campaign strategy and positioning",
      "Creator sourcing and coordination",
      "Brief creation and campaign launch",
      "Reporting and optimisation, run end to end by the Naano team",
      "Creator cost: same per-post pricing as Self-Serve, from €20 per post",
      "Support: dedicated Naano team, book a campaign call to start",
      "Billing: month-to-month, cancel anytime, separate from campaign spend",
    ],
  },
];

const BILLING_STEPS = [
  "You choose a plan: Self-Serve (€0/month) or Managed Campaigns (€700/month).",
  "You (or the Naano team, on Managed) source creators and create briefs. Each creator's post price (from €20) is shown before you book it.",
  "The creator publishes the post. You review and approve the content.",
  "Once approved, the creator is paid automatically via Stripe Connect. Naano handles invoices and approval records.",
  "There is no cost per click, impression, or lead, pricing is flat per published post.",
  "Both plans are month-to-month. You can upgrade, downgrade, or cancel at any time.",
];

const REFERENCE_NUMBERS = [
  { label: "Impressions delivered", value: "5M+" },
  { label: "Leads generated", value: "30K+" },
  { label: "Vetted creators", value: "2,000+" },
  { label: "Posts published", value: "5K+" },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-[1504px] px-6 py-16">
        <p className="text-sm tracking-wide text-muted uppercase">Pricing</p>
        <h1 className="font-heading text-4xl text-ink">Start free. Upgrade when you want your time back.</h1>
        <p className="mt-2 max-w-2xl text-copy">
          Naano is a B2B LinkedIn creator marketplace based in Paris. Brands run sponsored-post campaigns with
          vetted LinkedIn (and X, YouTube) creators. Creator campaigns cost from €20 per published post on both
          plans.
        </p>
      </section>

      <PricingCards plans={DETAILED_PLANS} variant="detailed" />

      <section className="mx-auto max-w-[1504px] px-6 py-16">
        <h2 className="font-heading text-3xl text-ink">How billing works</h2>
        <ol className="mt-6 flex flex-col gap-3">
          {BILLING_STEPS.map((step, index) => (
            <li key={step} className="flex gap-3 text-copy">
              <span className="text-muted">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1504px] px-6 py-16">
        <h2 className="font-heading text-3xl text-ink">Reference numbers</h2>
        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {REFERENCE_NUMBERS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl text-ink">{stat.value}</p>
              <p className="text-copy">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQAccordion heading="Frequently asked questions" items={HOME_FAQ} />

      <section className="mx-auto max-w-[1504px] px-6 py-16">
        <p className="text-copy">
          Prefer to talk it through? <Link href="/book" className="text-blue">Book a campaign call</Link> or reach
          us at info@naano.com.
        </p>
      </section>
    </MarketingShell>
  );
}
