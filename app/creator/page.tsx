import { CreatorDashboard } from "@/components/creator/CreatorDashboard";
import { requireCreatorUser } from "@/lib/auth/session";
import { creatorCopy } from "@/lib/i18n/creator";
import { getRequestLocale } from "@/lib/i18n/locale";
import { chromeCopy } from "@/lib/i18n/messages";

export default async function CreatorDashboardPage() {
  const user = await requireCreatorUser();
  const locale = await getRequestLocale();

  const firstName = user.first_name?.trim() || user.email.split("@")[0] || "there";
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || firstName;
  const initials = (user.first_name?.trim()?.[0] || user.email[0] || "N").toUpperCase();

  return (
    <CreatorDashboard
      locale={locale}
      copy={creatorCopy[locale]}
      switchLanguage={chromeCopy[locale].switchLanguage}
      displayName={displayName}
      email={user.email}
      workspace={displayName}
      initials={initials}
    />
  );
}
