import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function CommunityPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.community} copy={copy} />;
}
