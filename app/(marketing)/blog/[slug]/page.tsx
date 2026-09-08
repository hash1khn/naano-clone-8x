import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { BLOG_POSTS } from "@/lib/marketing/blog-content";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <MarketingShell>
      <BlogPostBody post={post} />
    </MarketingShell>
  );
}
