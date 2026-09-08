import { connection } from "next/server";
import { getBaseUrl } from "@/lib/api/config";
import type { Creator } from "@/lib/api/types";

export async function getCreatorBySlug(slug: string): Promise<Creator | null> {
  await connection();
  const res = await fetch(`${getBaseUrl()}/api/creators/${encodeURIComponent(slug)}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`GET /api/creators/:slug failed with ${res.status}`);
  }

  return (await res.json()) as Creator;
}
