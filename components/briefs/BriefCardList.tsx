import type { Brief } from "@/lib/api/types";

export type BriefCardListProps = {
  briefs: Brief[];
};

export function BriefCardList({ briefs }: BriefCardListProps) {
  return (
    <section>
      <h1>Briefs</h1>
      {briefs.length === 0 ? (
        <p>No public briefs.</p>
      ) : (
        <ul className="grid">
          {briefs.map((brief) => (
            <li key={brief.id}>
              <article>
                <h2>{brief.objective_summary}</h2>
                <p>Campaign {brief.campaign_id}</p>
                <time dateTime={brief.created_at}>{brief.created_at}</time>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
