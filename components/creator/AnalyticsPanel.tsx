import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function AnalyticsPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.analytics} copy={copy} />;
}
