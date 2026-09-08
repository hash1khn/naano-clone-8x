import { NextResponse } from "next/server";
import { getDashboardUser } from "@/lib/auth/session";
import { demoCommunityLeaderboard } from "@/lib/community/demo-leaderboard";

export async function GET() {
  const user = await getDashboardUser();
  if (!user || user.role !== "creator") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(demoCommunityLeaderboard);
}
