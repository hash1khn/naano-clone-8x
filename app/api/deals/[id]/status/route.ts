import { NextResponse } from "next/server";
import { isDealStatus, updateDealStatus } from "@/lib/api/mutate-deals";
import { getDashboardUser } from "@/lib/auth/session";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const status = body && typeof body === "object" ? (body as { status?: unknown }).status : null;
  if (typeof status !== "string" || !isDealStatus(status)) {
    return NextResponse.json(
      { error: 'status must be "draft" | "scheduled" | "live" | "delivered"' },
      { status: 400 },
    );
  }

  const result = await updateDealStatus(user, id, status);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result);
}
