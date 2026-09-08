import { NextResponse } from "next/server";
import { listDealsForUser } from "@/lib/api/list-deals";
import { createDeal } from "@/lib/api/mutate-deals";
import { getDashboardUser } from "@/lib/auth/session";

export async function GET(request: Request) {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = new URL(request.url).searchParams.get("role");
  if (role !== "brand" && role !== "creator") {
    return NextResponse.json({ error: 'role must be "brand" or "creator"' }, { status: 400 });
  }
  if (role !== user.role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deals = await listDealsForUser(user);
  return NextResponse.json({ deals });
}

export async function POST(request: Request) {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { campaign_id, creator_id, price } = body as Record<string, unknown>;
  if (typeof campaign_id !== "string" || !campaign_id) {
    return NextResponse.json({ error: "campaign_id is required" }, { status: 400 });
  }
  if (typeof creator_id !== "string" || !creator_id) {
    return NextResponse.json({ error: "creator_id is required" }, { status: 400 });
  }
  const priceNum = typeof price === "number" ? price : Number(price);
  if (!Number.isFinite(priceNum) || priceNum < 0) {
    return NextResponse.json({ error: "price must be a non-negative number" }, { status: 400 });
  }

  const result = await createDeal(user, {
    campaign_id,
    creator_id,
    price: priceNum,
  });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result);
}
