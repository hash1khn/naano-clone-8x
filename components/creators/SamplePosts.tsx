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
    <section>
      <h2>Sample posts</h2>
      {posts.length === 0 ? (
        <p>No sample posts.</p>
      ) : (
        <ul>
          {posts.map((post, index) => {
            const label = postLabel(post, index);
            const url = typeof post.linkedin_url === "string" ? post.linkedin_url : undefined;
            return (
              <li key={url ?? `${index}`}>
                {url ? <a href={url}>{label}</a> : <span>{label}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
