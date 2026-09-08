import { CreatorDashboard } from "@/components/creator/CreatorDashboard";
import { requireCreatorUser } from "@/lib/auth/session";
import { CREATOR_ONBOARDING_PATH, isCreatorOnboardingComplete } from "@/lib/creator/onboarding";
import { getCreatorProfile } from "@/lib/creator/require-onboarding";
import { collaborationsCopy, messagesCopy } from "@/lib/i18n/brand";
import { creatorCopy, creatorHomeCopy } from "@/lib/i18n/creator";
import { getRequestLocale } from "@/lib/i18n/locale";
import { chromeCopy } from "@/lib/i18n/messages";
import { redirect } from "next/navigation";

export default async function CreatorDashboardPage() {
  const user = await requireCreatorUser();
  const profile = await getCreatorProfile(user.id);
  if (!isCreatorOnboardingComplete(profile) || !profile) {
    redirect(`${CREATOR_ONBOARDING_PATH}?step=2`);
  }

  const locale = await getRequestLocale();

  const firstName = user.first_name?.trim() || user.email.split("@")[0] || "there";
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || profile.name || firstName;
  const initials = (user.first_name?.trim()?.[0] || profile.name.trim()?.[0] || user.email[0] || "N").toUpperCase();

  return (
    <CreatorDashboard
      locale={locale}
      copy={creatorCopy[locale]}
      home={creatorHomeCopy[locale]}
      collaborations={collaborationsCopy[locale]}
      messages={messagesCopy[locale]}
      userId={user.id}
      switchLanguage={chromeCopy[locale].switchLanguage}
      displayName={displayName}
      email={user.email}
      workspace={displayName}
      initials={initials}
      profile={profile}
    />
  );
}
