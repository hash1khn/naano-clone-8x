import { NextResponse } from "next/server";
import { listDealsForUser } from "@/lib/api/list-deals";
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
