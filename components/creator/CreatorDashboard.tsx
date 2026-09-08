"use client";

import { AnalyticsPanel } from "@/components/creator/AnalyticsPanel";
import { CollabsPanel } from "@/components/creator/CollabsPanel";
import { CommunityPanel } from "@/components/creator/CommunityPanel";
import { CreatorSidebar } from "@/components/creator/CreatorSidebar";
import { CreatorTopBar } from "@/components/creator/CreatorTopBar";
import { EarningsPanel } from "@/components/creator/EarningsPanel";
import { HomePanel } from "@/components/creator/HomePanel";
import { IntegrationsPanel } from "@/components/creator/IntegrationsPanel";
import { MessagesPanel } from "@/components/creator/MessagesPanel";
import { OpportunitiesPanel } from "@/components/creator/OpportunitiesPanel";
import { ProfilePanel } from "@/components/creator/ProfilePanel";
import { useCreatorTab } from "@/components/creator/useCreatorTab";
import type { CreatorCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

export function CreatorDashboard({
  locale,
  copy,
  switchLanguage,
  displayName,
  email,
  workspace,
  initials,
}: {
  locale: Locale;
  copy: CreatorCopy;
  switchLanguage: string;
  displayName: string;
  email: string;
  workspace: string;
  initials: string;
}) {
  const tab = useCreatorTab();

  return (
    <div className="app">
      <CreatorSidebar tab={tab} copy={copy} workspace={workspace} />
      <div className="main">
        <CreatorTopBar
          locale={locale}
          copy={copy}
          switchLanguage={switchLanguage}
          initials={initials}
          displayName={displayName}
          email={email}
        />
        {tab === "home" ? (
          <HomePanel copy={copy} />
        ) : tab === "profile" ? (
          <ProfilePanel copy={copy} />
        ) : tab === "opportunities" ? (
          <OpportunitiesPanel copy={copy} />
        ) : tab === "collabs" ? (
          <CollabsPanel copy={copy} />
        ) : tab === "analytics" ? (
          <AnalyticsPanel copy={copy} />
        ) : tab === "community" ? (
          <CommunityPanel copy={copy} />
        ) : tab === "earnings" ? (
          <EarningsPanel copy={copy} />
        ) : tab === "messages" ? (
          <MessagesPanel copy={copy} />
        ) : (
          <IntegrationsPanel copy={copy} />
        )}
      </div>
    </div>
  );
}
