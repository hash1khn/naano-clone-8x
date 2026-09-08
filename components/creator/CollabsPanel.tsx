"use client";

import { CollaborationsPanel } from "@/components/brand/CollaborationsPanel";
import type { CollaborationsCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

export function CollabsPanel({
  locale,
  copy,
}: {
  locale: Locale;
  copy: CollaborationsCopy;
}) {
  return <CollaborationsPanel locale={locale} copy={copy} creators={[]} role="creator" />;
}
