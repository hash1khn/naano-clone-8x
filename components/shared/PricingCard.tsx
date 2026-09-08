export type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  detailed?: boolean;
};

export function PricingCard({ name, price, features, detailed = false }: PricingCardProps) {
  return (
    <article>
      <header>
        <h3>{name}</h3>
        <p>{price}</p>
      </header>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {detailed ? <p>Detailed plan description placeholder.</p> : null}
    </article>
  );
}
