import type { Locale } from "@/lib/i18n/locale";
import { SCRAPED_FR } from "@/lib/i18n/scraped-fr";

const HOME_QUOTE_WORDS = [
  "Nous",
  "gérons",
  "+10 M€",
  "de",
  "budget",
  "d'influence",
  "chaque",
  "année.",
  "En",
  "B2B,",
  "Naano",
  "nous",
  "simplifie",
  "vraiment",
  "la",
  "vie",
] as const;

const CREATOR_QUOTE_WORDS = [
  "J'ai ",
  "pu ",
  "choisir ",
  "mon ",
  "tarif ",
  "et ",
  "être ",
  "payé ",
  "dès ",
  "que ",
  "le ",
  "post ",
  "est ",
  "passé ",
  "en ",
  "ligne ",
  ".",
] as const;

const ATTR_PATTERN = /\b(aria-label|placeholder|title|alt)="([^"]*)"/g;
const TEXT_PATTERN = />([^<]+)</g;

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function encodeEntities(value: string): string {
  return value.replace(/&/g, "&amp;");
}

function lookupFrench(english: string): string | undefined {
  const trimmed = english.replace(/\s+/g, " ").trim();
  if (!trimmed) {
    return undefined;
  }
  return SCRAPED_FR[trimmed] ?? SCRAPED_FR[decodeEntities(trimmed)];
}

function translateSegment(raw: string): string {
  const match = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) {
    return raw;
  }
  const [, lead, core, trail] = match;
  const french = lookupFrench(core);
  if (!french) {
    return raw;
  }
  const encoded = core.includes("&amp;") || core.includes("&apos;") ? encodeEntities(french) : french;
  return `${lead}${encoded}${trail}`;
}

function firstQuoteWord(html: string): string | null {
  const match = html.match(/data-qw="0"[^>]*>([^<]*)/);
  if (!match) {
    return null;
  }
  return decodeEntities(match[1]).replace(/<!--.*?-->/g, "").trim();
}

function translateQuoteWords(html: string): string {
  const first = firstQuoteWord(html);
  const words =
    first === "We" ? HOME_QUOTE_WORDS : first === "I" ? CREATOR_QUOTE_WORDS : null;
  if (!words) {
    return html;
  }

  return html.replace(/data-qw="(\d+)"([^>]*)>([^<]*)/g, (full, index, attrs, text) => {
    const french = words[Number(index)];
    if (french == null) {
      return full;
    }
    const comment = text.includes("<!--") ? "<!-- --> " : "";
    return `data-qw="${index}"${attrs}>${french}${comment}`;
  });
}

function markLocaleToggle(html: string, locale: Locale): string {
  let next = html.replace(
    /(<button)([^>]*aria-label="(?:Switch language|Changer de langue)")/g,
    '$1 data-locale-toggle=""$2',
  );
  if (locale === "fr") {
    next = next.replace(/aria-label="Switch language"/g, 'aria-label="Changer de langue"');
    next = next.replace(/>EN<\/span>/g, ">FR</span>");
  }
  return next;
}

export function translateScrapedHtml(html: string, locale: Locale): string {
  const marked = markLocaleToggle(html, locale);
  if (locale !== "fr") {
    return marked;
  }

  let translated = translateQuoteWords(marked);
  translated = translated.replace(TEXT_PATTERN, (_, text: string) => `>${translateSegment(text)}<`);
  translated = translated.replace(ATTR_PATTERN, (_, name: string, value: string) => {
    return `${name}="${translateSegment(value)}"`;
  });
  return translated;
}
