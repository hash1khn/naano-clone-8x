import { NextResponse } from "next/server";
import { listMessagesForDeal, listMessagesWithUser, sendMessage } from "@/lib/api/messages";
import { getDashboardUser } from "@/lib/auth/session";

export async function GET(request: Request) {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const dealId = url.searchParams.get("deal_id");
  const withUserId = url.searchParams.get("with");

  if ((dealId && withUserId) || (!dealId && !withUserId)) {
    return NextResponse.json({ error: "Provide deal_id or with" }, { status: 400 });
  }

  if (dealId) {
    const messages = await listMessagesForDeal(user, dealId);
    if (messages === "forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ messages });
  }

  const messages = await listMessagesWithUser(user, withUserId as string);
  return NextResponse.json({ messages });
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
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { recipient_id, deal_id, body: text } = body as Record<string, unknown>;
  if (typeof recipient_id !== "string" || recipient_id.length === 0) {
    return NextResponse.json({ error: "recipient_id is required" }, { status: 400 });
  }
  if (typeof text !== "string") {
    return NextResponse.json({ error: "body is required" }, { status: 400 });
  }
  if (deal_id !== undefined && deal_id !== null && typeof deal_id !== "string") {
    return NextResponse.json({ error: "deal_id is invalid" }, { status: 400 });
  }

  const result = await sendMessage(user, {
    recipient_id,
    deal_id: typeof deal_id === "string" && deal_id.length > 0 ? deal_id : undefined,
    body: text,
  });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.message);
}
