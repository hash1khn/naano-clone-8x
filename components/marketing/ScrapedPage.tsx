import { loadScrapedHtml } from "@/lib/marketing/load-scraped";
import { ScrapedHydrator } from "@/components/marketing/ScrapedHydrator";
import { getRequestLocale } from "@/lib/i18n/locale";
import { translateScrapedHtml } from "@/lib/i18n/translate-html";

export async function ScrapedPage({ file }: { file: string }) {
  const [html, locale] = await Promise.all([loadScrapedHtml(file), getRequestLocale()]);
  return <ScrapedHydrator html={translateScrapedHtml(html, locale)} locale={locale} />;
}
