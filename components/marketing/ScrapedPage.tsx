import { loadScrapedHtml } from "@/lib/marketing/load-scraped";
import { ScrapedHydrator } from "@/components/marketing/ScrapedHydrator";

export async function ScrapedPage({ file }: { file: string }) {
  const html = await loadScrapedHtml(file);
  return <ScrapedHydrator html={html} />;
}
