import { BlogCardGrid } from "@/components/blog/BlogCardGrid";
import { PLACEHOLDER_POSTS } from "@/lib/marketing/placeholder";

export default function BlogPage() {
  // TODO: replace PLACEHOLDER_POSTS once a blog endpoint is added to docs/naano-api-contract.md.
  return <BlogCardGrid posts={PLACEHOLDER_POSTS} />;
}
