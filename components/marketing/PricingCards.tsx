import { PricingCard } from "@/components/shared/PricingCard";

export type PricingPlan = {
  name: string;
  price: string;
  features: string[];
};

export type PricingCardsProps = {
  plans: PricingPlan[];
  variant: "summary" | "detailed";
};

export function PricingCards({ plans, variant }: PricingCardsProps) {
  return (
    <section>
      <h2>Pricing</h2>
      <div className="flex flex-wrap">
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
