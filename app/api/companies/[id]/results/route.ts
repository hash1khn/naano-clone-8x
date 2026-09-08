import { NextResponse } from "next/server";
import { companyOwnedByUser, getCompanyResults } from "@/lib/api/company-results";
import { getDashboardUser } from "@/lib/auth/session";

export async function GET(_request: Request, context: RouteContext<"/api/companies/[id]/results">) {
  const user = await getDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  if (user.role !== "brand" || !(await companyOwnedByUser(id, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const results = await getCompanyResults(id);
  return NextResponse.json(results);
}
