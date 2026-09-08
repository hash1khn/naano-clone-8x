import { StatBlock } from "@/components/shared/StatBlock";

export type ResultsGridProps = {
  stats: { label: string; value: string }[];
};

export function ResultsGrid({ stats }: ResultsGridProps) {
  return (
    <section>
      <h2>Results</h2>
      <div className="grid">
        {stats.map((stat) => (
          <StatBlock key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
}
