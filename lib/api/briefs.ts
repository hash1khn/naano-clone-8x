import { connection } from "next/server";
import { getBaseUrl } from "@/lib/api/config";
import type { Brief } from "@/lib/api/types";

export async function getBriefs(): Promise<{ briefs: Brief[] }> {
  await connection();
  const res = await fetch(`${getBaseUrl()}/api/briefs`);

  if (!res.ok) {
    throw new Error(`GET /api/briefs failed with ${res.status}`);
  }

  return (await res.json()) as { briefs: Brief[] };
}
