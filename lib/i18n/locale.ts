export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// Cookie name used by the production naano.com next-intl toggle.
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr";
}

export function parseLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getRequestLocale(): Promise<Locale> {
  const { cookies } = await import("next/headers");
  return parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
}
