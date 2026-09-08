import { PricingCard } from "@/components/shared/PricingCard";

export type PricingPlan = {
  name: string;
  price: string;
  features: string[];
};

export type PricingCardsProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  plans: PricingPlan[];
  variant: "summary" | "detailed";
};

export function PricingCards({ eyebrow, heading, description, plans, variant }: PricingCardsProps) {
  return (
    <section id="pricing" className="mx-auto max-w-[1504px] px-6 py-16">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      {heading ? <h2 className="font-heading text-3xl text-ink">{heading}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-copy">{description}</p> : null}
      <div className="mt-8 flex flex-col gap-6 sm:flex-row">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            features={plan.features}
            detailed={variant === "detailed"}
          />
        ))}
      </div>
    </section>
  );
}
