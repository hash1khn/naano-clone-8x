import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function CollabsPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.collabs} copy={copy} />;
}
