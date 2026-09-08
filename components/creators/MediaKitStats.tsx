export type MediaKitStatsProps = {
  followerCount: number;
  pricePerPost: number;
  nicheTags: string[];
};

export function MediaKitStats({ followerCount, pricePerPost, nicheTags }: MediaKitStatsProps) {
  return (
    <section>
      <h2>Media kit</h2>
      <dl>
        <div>
          <dt>Followers</dt>
          <dd>{followerCount}</dd>
        </div>
        <div>
          <dt>Price per post</dt>
          <dd>{pricePerPost}</dd>
        </div>
        <div>
          <dt>Niches</dt>
          <dd>
            <ul className="flex flex-wrap">
              {nicheTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
