type Audience = "brand" | "creator" | "agency";

const HEADLINES: Record<Audience, { heading: string; subheading: string }> = {
  brand: {
    heading: "Placeholder brand headline",
    subheading: "Placeholder brand subheading",
  },
  creator: {
    heading: "Placeholder creator headline",
    subheading: "Placeholder creator subheading",
  },
  agency: {
    heading: "Placeholder agency headline",
    subheading: "Placeholder agency subheading",
  },
};

export type HeroProps = {
  audience: Audience;
};

export function Hero({ audience }: HeroProps) {
  const copy = HEADLINES[audience];

  return (
    <section>
      <h1>{copy.heading}</h1>
      <p>{copy.subheading}</p>
    </section>
  );
}
