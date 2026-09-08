import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function MessagesPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.messages} copy={copy} />;
}
