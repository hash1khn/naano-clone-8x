import { getCreatorBySlug as getCreatorBySlugFromDb } from "@/lib/api/get-creator";
import type { Creator } from "@/lib/api/types";

export async function getCreatorBySlug(slug: string): Promise<Creator | null> {
  return getCreatorBySlugFromDb(slug);
}
