import { notFound } from "next/navigation";
import { MediaKitStats } from "@/components/creators/MediaKitStats";
import { ProfileHeader } from "@/components/creators/ProfileHeader";
import { SamplePosts } from "@/components/creators/SamplePosts";
import { getCreatorBySlug } from "@/lib/api/creators";

export default async function CreatorProfilePage({ params }: PageProps<"/creators/[slug]">) {
  const { slug } = await params;
  const creator = await getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  return (
    <article>
      <ProfileHeader
        name={creator.name}
        avatarUrl={creator.avatar_url}
        country={creator.country}
        followerCount={creator.follower_count}
      />
      <p>{creator.bio}</p>
      <MediaKitStats
        followerCount={creator.follower_count}
        pricePerPost={creator.price_per_post}
        nicheTags={creator.niche_tags}
      />
      <SamplePosts posts={creator.sample_posts} />
    </article>
  );
}
