import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { PLACEHOLDER_POSTS } from "@/lib/marketing/placeholder";

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  // TODO: replace PLACEHOLDER_POSTS once a blog endpoint is added to docs/naano-api-contract.md.
  const post = PLACEHOLDER_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostBody post={post} />;
}
