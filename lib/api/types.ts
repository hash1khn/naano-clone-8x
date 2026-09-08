// Shapes pinned in docs/naano-api-contract.md.

export type CreatorListItem = {
  id: string;
  slug: string;
  name: string;
  niche_tags: string[];
  country: string;
  follower_count: number;
  price_per_post: number;
  avatar_url: string;
};

// Contract lists sample_posts: [...] without an item shape.
export type SamplePost = Record<string, unknown>;

export type Creator = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  niche_tags: string[];
  country: string;
  follower_count: number;
  price_per_post: number;
  avatar_url: string;
  sample_posts: SamplePost[];
};

export type Brief = {
  id: string;
  campaign_id: string;
  objective_summary: string;
  created_at: string;
};
