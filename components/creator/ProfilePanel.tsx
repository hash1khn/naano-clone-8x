import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function ProfilePanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.profile} copy={copy} />;
}
