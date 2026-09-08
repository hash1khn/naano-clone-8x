import type { SamplePost } from "@/lib/api/types";

export type SamplePostsProps = {
  posts: SamplePost[];
};

function postLabel(post: SamplePost, index: number): string {
  if (typeof post.linkedin_url === "string") {
    return post.linkedin_url;
  }
  return `Sample post ${index + 1}`;
}

export function SamplePosts({ posts }: SamplePostsProps) {
  return (
    <section className="mt-8">
      <h2 className="font-heading text-xl text-ink">Sample posts</h2>
      {posts.length === 0 ? (
        <p className="text-copy">No sample posts.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {posts.map((post, index) => {
            const label = postLabel(post, index);
            const url = typeof post.linkedin_url === "string" ? post.linkedin_url : undefined;
            return (
              <li key={url ?? `${index}`} className="text-copy">
                {url ? (
                  <a href={url} className="text-blue">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
