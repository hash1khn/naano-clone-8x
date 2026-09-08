import type { CreatorCopy } from "@/lib/i18n/creator";
import { CreatorEmptyPanel } from "@/components/creator/CreatorEmptyPanel";

export function IntegrationsPanel({ copy }: { copy: CreatorCopy }) {
  return <CreatorEmptyPanel title={copy.integrations} copy={copy} />;
}
