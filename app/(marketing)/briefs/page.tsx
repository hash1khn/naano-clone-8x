import { BriefCardList } from "@/components/briefs/BriefCardList";
import { getBriefs } from "@/lib/api/briefs";

export default async function BriefsPage() {
  const { briefs } = await getBriefs();

  return <BriefCardList briefs={briefs} />;
}
