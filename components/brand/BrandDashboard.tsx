"use client";

import { BillingPanel } from "@/components/brand/BillingPanel";
import { BrandSidebar } from "@/components/brand/BrandSidebar";
import { BrandTopBar } from "@/components/brand/BrandTopBar";
import { MarketplacePanel } from "@/components/brand/MarketplacePanel";
import { MessagesPanel } from "@/components/brand/MessagesPanel";
import { OverviewPanel } from "@/components/brand/OverviewPanel";
import { useBrandTab, type BrandTab } from "@/components/brand/useBrandTab";
import type { CompanyResults } from "@/lib/api/company-results";
import type { CreatorListItem } from "@/lib/api/types";
import type { BillingCopy, BrandCopy, MarketplaceCopy, MessagesCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

export function BrandDashboard({
  locale,
  copy,
  marketplace,
  messages,
  billing,
  userId,
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
  marketplace: MarketplaceCopy;
  messages: MessagesCopy;
  billing: BillingCopy;
  userId: string;
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
  const titles: Record<Exclude<BrandTab, "overview" | "marketplace" | "messages" | "billing">, string> = {
    campaigns: copy.campaigns,
    "campaign-new": copy.newCampaign,
    collaborations: copy.collaborations,
    results: copy.results,
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
        ) : tab === "marketplace" ? (
          <MarketplacePanel locale={locale} copy={marketplace} creators={creators} />
        ) : tab === "messages" ? (
          <MessagesPanel locale={locale} copy={messages} userId={userId} creators={creators} />
        ) : tab === "billing" ? (
          <BillingPanel locale={locale} copy={billing} />
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
