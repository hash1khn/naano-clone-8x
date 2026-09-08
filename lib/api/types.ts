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

export type CampaignListItem = {
  id: string;
  objective: string;
  status: string;
  created_at: string;
};

export type DealListItem = {
  id: string;
  campaign_id: string;
  creator_id: string;
  price: number;
  status: string;
  tracking_link: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
};
