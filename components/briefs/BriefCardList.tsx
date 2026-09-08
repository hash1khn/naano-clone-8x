import type { Brief } from "@/lib/api/types";

export type BriefCardListProps = {
  briefs: Brief[];
};

export function BriefCardList({ briefs }: BriefCardListProps) {
  return (
    <section className="mx-auto max-w-[1504px] px-6 py-16">
      <h1 className="font-heading text-4xl text-ink">Briefs</h1>
      {briefs.length === 0 ? (
        <p className="mt-4 text-copy">No public briefs.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {briefs.map((brief) => (
            <li key={brief.id} className="rounded-2xl border border-ink/10 p-6">
              <article>
                <h2 className="font-heading text-lg text-ink">{brief.objective_summary}</h2>
                <p className="text-copy">Campaign {brief.campaign_id}</p>
                <time dateTime={brief.created_at} className="text-sm text-muted">
                  {brief.created_at}
                </time>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
