import Link from "next/link";

export type BlogCardGridProps = {
  posts: { slug: string; title: string; excerpt: string; publishedAt: string }[];
};

export function BlogCardGrid({ posts }: BlogCardGridProps) {
  return (
    <section>
      <h1>Blog</h1>
      <ul className="grid">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              <p>{post.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
