"use client";

import { BrandSidebar } from "@/components/brand/BrandSidebar";
import { BrandTopBar } from "@/components/brand/BrandTopBar";
import { OverviewPanel } from "@/components/brand/OverviewPanel";
import { useBrandTab, type BrandTab } from "@/components/brand/useBrandTab";
import type { CompanyResults } from "@/lib/api/company-results";
import type { CreatorListItem } from "@/lib/api/types";
import type { BrandCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

function TabPanel({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="font-heading text-[28px] font-bold tracking-tight text-[#111827]">{title}</h1>
    </div>
  );
}

export function BrandDashboard({
  locale,
  copy,
  switchLanguage,
  firstName,
  workspace,
  initials,
  results,
  creators,
}: {
  locale: Locale;
  copy: BrandCopy;
  switchLanguage: string;
  firstName: string;
  workspace: string;
  initials: string;
  results: CompanyResults;
  creators: CreatorListItem[];
}) {
  const tab = useBrandTab();
  const titles: Record<Exclude<BrandTab, "overview">, string> = {
    marketplace: copy.marketplace,
    campaigns: copy.campaigns,
    "campaign-new": copy.newCampaign,
    collaborations: copy.collaborations,
    results: copy.results,
    messages: copy.messages,
    billing: copy.billing,
    integrations: copy.integrations,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F8FA]">
      <BrandSidebar tab={tab} copy={copy} />
      <div className="flex min-w-0 flex-1 flex-col">
        <BrandTopBar locale={locale} copy={copy} switchLanguage={switchLanguage} initials={initials} />
        <main className="relative flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          {tab === "overview" ? (
            <OverviewPanel copy={copy} firstName={firstName} workspace={workspace} results={results} creators={creators} />
          ) : (
            <TabPanel title={titles[tab]} />
          )}
        </main>
      </div>
      <div className="pointer-events-none fixed right-0 bottom-5 left-[72px] z-20 flex justify-center">
        <div className="pointer-events-auto flex h-11 w-full max-w-md items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-4 text-sm text-[#9CA3AF] shadow-lg">
          <svg className="h-4 w-4 text-[#2563eb]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3 9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5L12 3Z" />
          </svg>
          {copy.helpFind}
        </div>
      </div>
    </div>
  );
}
