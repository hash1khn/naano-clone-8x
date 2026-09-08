import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function HomePanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.home} copy={copy} />;
}
