export type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  detailed?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export function PricingCard({ name, price, features, detailed = false }: PricingCardProps) {
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-2xl border border-ink/10 bg-surface p-8">
      <div>
        <span className="text-sm tracking-wide text-muted uppercase">{name}</span>
        <p className="font-heading text-3xl text-ink">{price}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="text-copy">
            {feature}
          </li>
        ))}
      </ul>
      {detailed ? <p className="text-sm text-muted">Campaign spend is separate. No lock-in. Cancel anytime.</p> : null}
    </article>
  );
}
