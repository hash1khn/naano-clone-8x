import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { PricingCards } from "@/components/marketing/PricingCards";
import { ResultsGrid } from "@/components/marketing/ResultsGrid";
import { VideoCaseStudy } from "@/components/marketing/VideoCaseStudy";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { HOME_FAQ, HOME_LOGOS, HOME_PLANS, HOME_STATS, HOME_STEPS } from "@/lib/marketing/placeholder";

export default function HomePage() {
  return (
    <>
      <Hero audience="brand" />
      <LogoMarquee logos={HOME_LOGOS} />
      <HowItWorks steps={HOME_STEPS} />
      <VideoCaseStudy caption="Case study video placeholder" />
      <ResultsGrid stats={HOME_STATS} />
      <PricingCards plans={HOME_PLANS} variant="summary" />
      <TestimonialCard
        quote="Placeholder testimonial quote."
        author="Placeholder author"
        role="Placeholder role"
      />
      <FAQAccordion items={HOME_FAQ} />
    </>
  );
}
