import { LiveMarketplaceCard } from "@/components/creator/onboarding/LiveMarketplaceCard";
import type { AuthCopy } from "@/lib/i18n/messages";

export function CreatorMarketplacePreview({ copy }: { copy: AuthCopy }) {
  return <LiveMarketplaceCard copy={copy} />;
}
