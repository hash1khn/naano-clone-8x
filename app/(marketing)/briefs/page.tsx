import { BriefCardList } from "@/components/briefs/BriefCardList";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { getBriefs } from "@/lib/api/briefs";

export default async function BriefsPage() {
  const { briefs } = await getBriefs();

  return (
    <MarketingShell>
      <BriefCardList briefs={briefs} />
    </MarketingShell>
  );
}
