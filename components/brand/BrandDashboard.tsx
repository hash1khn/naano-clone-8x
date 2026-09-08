"use client";

import { BrandSidebar } from "@/components/brand/BrandSidebar";
import { BrandTopBar } from "@/components/brand/BrandTopBar";
import { OverviewPanel } from "@/components/brand/OverviewPanel";
import { useBrandTab, type BrandTab } from "@/components/brand/useBrandTab";
import type { CompanyResults } from "@/lib/api/company-results";
import type { CreatorListItem } from "@/lib/api/types";
import type { BrandCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

export function BrandDashboard({
  locale,
  copy,
  switchLanguage,
  firstName,
  displayName,
  email,
  workspace,
  initials,
  results,
  creators,
}: {
  locale: Locale;
  copy: BrandCopy;
  switchLanguage: string;
  firstName: string;
  displayName: string;
  email: string;
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
    <div className="app">
      <BrandSidebar tab={tab} copy={copy} workspace={workspace} />
      <div className="main">
        <BrandTopBar
          locale={locale}
          copy={copy}
          switchLanguage={switchLanguage}
          initials={initials}
          displayName={displayName}
          email={email}
        />
        {tab === "overview" ? (
          <section className="page visible" id="page-overview" data-screen-label={copy.overview}>
            <OverviewPanel copy={copy} firstName={firstName} workspace={workspace} results={results} creators={creators} />
          </section>
        ) : (
          <section className="page visible">
            <div className="page-head">
              <h1>{titles[tab]}</h1>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
