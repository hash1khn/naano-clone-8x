import type { BlogBlock } from "@/lib/marketing/blog-content";

export type BlogPostBodyProps = {
  post: {
    title: string;
    author: string;
    publishedAt: string;
    body: BlogBlock[];
  };
};

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="font-heading text-2xl text-ink">{block.text}</h2>;
    case "h3":
      return <h3 className="font-heading text-xl text-ink">{block.text}</h3>;
    case "h4":
      return <h4 className="font-heading text-lg text-ink">{block.text}</h4>;
    case "blockquote":
      return <blockquote className="border-l-2 border-ink/15 pl-4 text-ink">{block.text}</blockquote>;
    default:
      return <p className="text-copy">{block.text}</p>;
  }
}

// Groups consecutive "li" blocks under a single <ul> so list markup stays valid.
function groupBlocks(blocks: BlogBlock[]): (BlogBlock | { type: "ul"; items: BlogBlock[] })[] {
  const grouped: (BlogBlock | { type: "ul"; items: BlogBlock[] })[] = [];
  for (const block of blocks) {
    if (block.type === "li") {
      const last = grouped[grouped.length - 1];
      if (last && last.type === "ul") {
        last.items.push(block);
        continue;
      }
      grouped.push({ type: "ul", items: [block] });
      continue;
    }
    grouped.push(block);
  }
  return grouped;
}

export function BlogPostBody({ post }: BlogPostBodyProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="font-heading text-4xl text-ink">{post.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {post.author} · <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </p>
      </header>
      <div className="mt-8 flex flex-col gap-4">
        {groupBlocks(post.body).map((block, index) =>
          block.type === "ul" ? (
            <ul key={index} className="ml-5 list-disc">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-copy">
                  {item.text}
                </li>
              ))}
            </ul>
          ) : (
            <Block key={index} block={block} />
          ),
        )}
      </div>
    </article>
  );
}
