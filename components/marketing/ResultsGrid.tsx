import { StatBlock } from "@/components/shared/StatBlock";

export type ResultsGridProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  stats: { label: string; value: string }[];
};

export function ResultsGrid({ eyebrow, heading, description, stats }: ResultsGridProps) {
  return (
    <section className="mx-auto max-w-[1504px] px-6 py-16">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      {heading ? <h2 className="font-heading text-3xl text-ink">{heading}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-copy">{description}</p> : null}
      <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatBlock key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
