import { notFound } from "next/navigation";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PricingCards } from "@/components/marketing/PricingCards";
import { ResultsGrid } from "@/components/marketing/ResultsGrid";
import {
  HOME_FAQ,
  HOME_PLANS,
  HOME_STATS,
  HOME_STEPS,
  VERTICALS,
  isVertical,
} from "@/lib/marketing/placeholder";

export function generateStaticParams() {
  return VERTICALS.map((vertical) => ({ vertical }));
}

export default async function VerticalPage({ params }: PageProps<"/for/[vertical]">) {
  const { vertical } = await params;

  if (!isVertical(vertical)) {
    notFound();
  }

  return (
    <>
      <h1>For {vertical}</h1>
      <Hero audience="brand" />
      <HowItWorks steps={HOME_STEPS} />
      <ResultsGrid stats={HOME_STATS} />
      <PricingCards plans={HOME_PLANS} variant="summary" />
      <FAQAccordion items={HOME_FAQ} />
    </>
  );
}
