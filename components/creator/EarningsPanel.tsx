import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function EarningsPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.earnings} copy={copy} />;
}
