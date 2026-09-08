import { NextResponse } from "next/server";
import { listCampaignsForCompany } from "@/lib/api/list-campaigns";
import { getCompanyForUser, getDashboardUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "brand") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const company = await getCompanyForUser(user.id);
  const campaigns = company ? await listCampaignsForCompany(company.id) : [];
  return NextResponse.json({ campaigns });
}
