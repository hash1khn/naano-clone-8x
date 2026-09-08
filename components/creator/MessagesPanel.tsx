"use client";

import { MessagesPanel as BrandMessagesPanel } from "@/components/brand/MessagesPanel";
import type { MessagesCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

export function MessagesPanel({
  locale,
  copy,
  userId,
}: {
  locale: Locale;
  copy: MessagesCopy;
  userId: string;
}) {
  return <BrandMessagesPanel locale={locale} copy={copy} userId={userId} creators={[]} role="creator" />;
}
