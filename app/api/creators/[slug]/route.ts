import { NextResponse } from "next/server";
import { getCreatorBySlug } from "@/lib/api/get-creator";

export async function GET(_request: Request, context: RouteContext<"/api/creators/[slug]">) {
  const { slug } = await context.params;
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const creator = await getCreatorBySlug(slug);
  if (!creator) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(creator);
}
