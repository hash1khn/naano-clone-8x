import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function OpportunitiesPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.opportunities} copy={copy} />;
}
