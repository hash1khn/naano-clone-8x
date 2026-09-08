import { BlogCardGrid } from "@/components/blog/BlogCardGrid";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { BLOG_POSTS } from "@/lib/marketing/blog-content";

export default function BlogPage() {
  return (
    <MarketingShell>
      <BlogCardGrid posts={BLOG_POSTS} />
    </MarketingShell>
  );
}
