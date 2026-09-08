import Link from "next/link";

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroProps = {
  eyebrow?: string;
  heading: string;
  highlight?: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  trustLine?: string;
};

export function Hero({ eyebrow, heading, highlight, description, primaryCta, secondaryCta, trustLine }: HeroProps) {
  return (
    <section className="mx-auto flex max-w-[1504px] flex-col items-start gap-6 px-6 py-24">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      <h1 className="font-heading text-5xl leading-tight text-ink">
        {heading}
        {highlight ? <span className="block text-blue">{highlight}</span> : null}
      </h1>
      <p className="max-w-2xl text-lg text-copy">{description}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={primaryCta.href} className="rounded-full bg-ink px-6 py-3 text-paper">
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link href={secondaryCta.href} className="rounded-full border border-ink/15 px-6 py-3 text-ink">
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
      {trustLine ? <p className="text-sm text-muted">{trustLine}</p> : null}
    </section>
  );
}
