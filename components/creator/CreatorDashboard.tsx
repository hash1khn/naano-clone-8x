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
import { ReferralsPanel } from "@/components/creator/ReferralsPanel";
import { useCreatorTab } from "@/components/creator/useCreatorTab";
import type { OnboardingProfile } from "@/lib/creator/onboarding";
import type { CollaborationsCopy, MessagesCopy } from "@/lib/i18n/brand";
import type {
  CreatorCopy,
  CreatorCommunityCopy,
  CreatorEarningsCopy,
  CreatorHomeCopy,
  CreatorReferralsCopy,
} from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

export function CreatorDashboard({
  locale,
  copy,
  home,
  community,
  earnings,
  referrals,
  collaborations,
  messages,
  userId,
  switchLanguage,
  displayName,
  email,
  workspace,
  initials,
  profile,
}: {
  locale: Locale;
  copy: CreatorCopy;
  home: CreatorHomeCopy;
  community: CreatorCommunityCopy;
  earnings: CreatorEarningsCopy;
  referrals: CreatorReferralsCopy;
  collaborations: CollaborationsCopy;
  messages: MessagesCopy;
  userId: string;
  switchLanguage: string;
  displayName: string;
  email: string;
  workspace: string;
  initials: string;
  profile: OnboardingProfile;
}) {
  const tab = useCreatorTab();

  return (
    <div className="app">
      <CreatorSidebar tab={tab} copy={copy} workspace={workspace} />
      <div className={`main${tab === "home" ? " cr-home-white" : ""}`}>
        <CreatorTopBar
          locale={locale}
          copy={copy}
          switchLanguage={switchLanguage}
          initials={initials}
          displayName={displayName}
          email={email}
          avatarUrl={profile.avatar_url}
        />
        {tab === "home" ? (
          <HomePanel copy={home} profile={profile} />
        ) : tab === "profile" ? (
          <ProfilePanel copy={copy} />
        ) : tab === "opportunities" ? (
          <OpportunitiesPanel copy={copy} />
        ) : tab === "collabs" ? (
          <CollabsPanel locale={locale} copy={collaborations} />
        ) : tab === "analytics" ? (
          <AnalyticsPanel copy={copy} />
        ) : tab === "community" ? (
          <CommunityPanel locale={locale} copy={community} home={home} profile={profile} />
        ) : tab === "earnings" ? (
          <EarningsPanel locale={locale} copy={earnings} />
        ) : tab === "referrals" ? (
          <ReferralsPanel locale={locale} copy={referrals} slug={profile.slug} />
        ) : tab === "messages" ? (
          <MessagesPanel locale={locale} copy={messages} userId={userId} />
        ) : (
          <IntegrationsPanel copy={copy} />
        )}
      </div>
    </div>
  );
}
