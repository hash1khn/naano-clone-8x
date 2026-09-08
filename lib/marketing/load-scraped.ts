import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadScrapedHtml(relativePath: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content/scraped", relativePath);
  return readFile(filePath, "utf8");
}
