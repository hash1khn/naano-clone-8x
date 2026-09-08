import { NextResponse } from "next/server";
import { listCreators } from "@/lib/api/list-creators";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const creators = await listCreators({
    niche: url.searchParams.get("niche"),
    country: url.searchParams.get("country"),
    min_followers: url.searchParams.get("min_followers"),
    max_followers: url.searchParams.get("max_followers"),
  });
  return NextResponse.json({ creators });
}
