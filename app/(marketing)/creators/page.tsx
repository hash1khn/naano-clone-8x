import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { PricingCards } from "@/components/marketing/PricingCards";
import { ResultsGrid } from "@/components/marketing/ResultsGrid";
import { VideoCaseStudy } from "@/components/marketing/VideoCaseStudy";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { HOME_FAQ, HOME_LOGOS, HOME_PLANS, HOME_STATS, HOME_STEPS } from "@/lib/marketing/placeholder";

export default function CreatorsPage() {
  return (
    <>
      <Hero audience="creator" />
      <LogoMarquee logos={HOME_LOGOS} />
      <HowItWorks steps={HOME_STEPS} />
      <VideoCaseStudy caption="Creator-angled case study placeholder" />
      <ResultsGrid stats={HOME_STATS} />
      <PricingCards plans={HOME_PLANS} variant="summary" />
      <TestimonialCard
        quote="Placeholder creator testimonial."
        author="Placeholder creator"
        role="Creator"
      />
      <FAQAccordion items={HOME_FAQ} />
    </>
  );
}
