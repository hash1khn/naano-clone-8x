export type BlogPostBodyProps = {
  post: { title: string; publishedAt: string; body: string };
};

export function BlogPostBody({ post }: BlogPostBodyProps) {
  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.publishedAt}>{post.publishedAt}</time>
      </header>
      <p>{post.body}</p>
    </article>
  );
}
