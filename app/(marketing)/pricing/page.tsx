import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { PricingCards } from "@/components/marketing/PricingCards";
import { HOME_FAQ, HOME_PLANS } from "@/lib/marketing/placeholder";

export default function PricingPage() {
  return (
    <>
      <h1>Pricing</h1>
      <PricingCards plans={HOME_PLANS} variant="detailed" />
      <FAQAccordion items={HOME_FAQ} />
    </>
  );
}
