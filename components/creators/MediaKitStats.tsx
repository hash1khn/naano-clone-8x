export type MediaKitStatsProps = {
  followerCount: number;
  pricePerPost: number;
  nicheTags: string[];
};

export function MediaKitStats({ followerCount, pricePerPost, nicheTags }: MediaKitStatsProps) {
  return (
    <section className="mt-8">
      <h2 className="font-heading text-xl text-ink">Media kit</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted">Followers</dt>
          <dd className="text-ink">{followerCount.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Price per post</dt>
          <dd className="text-ink">€{pricePerPost}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Niches</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {nicheTags.map((tag) => (
                <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-sm text-copy">
                  {tag}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
