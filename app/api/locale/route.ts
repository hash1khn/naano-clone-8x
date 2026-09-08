import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/locale";

// Frontend-only cookie setter matching production naano.com (`POST /api/locale?locale=`).
// Not a backend domain endpoint from the API contract.
export async function POST(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale");
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "locale must be en or fr" }, { status: 400 });
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true, locale });
}
