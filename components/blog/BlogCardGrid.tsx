import Link from "next/link";

export type BlogCardGridProps = {
  posts: { slug: string; title: string; excerpt: string; author: string; publishedAt: string }[];
};

export function BlogCardGrid({ posts }: BlogCardGridProps) {
  return (
    <section className="mx-auto max-w-[1504px] px-6 py-16">
      <p className="text-sm tracking-wide text-muted uppercase">Naano Journal</p>
      <h1 className="font-heading text-4xl text-ink">Notes on creator-led growth.</h1>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-col gap-2 rounded-2xl border border-ink/10 p-6">
            <article>
              <h2 className="font-heading text-lg text-ink">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-copy">{post.excerpt}</p>
              <p className="mt-3 text-sm text-muted">
                {post.author} · <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
