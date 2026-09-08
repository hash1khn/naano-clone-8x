import { BrandDashboard } from "@/components/brand/BrandDashboard";
import { EMPTY_COMPANY_RESULTS, getCompanyResults } from "@/lib/api/company-results";
import { listCreators } from "@/lib/api/list-creators";
import { requireBrandUser, getCompanyForUser, workspaceLabel } from "@/lib/auth/session";
import { brandCopy, billingCopy, marketplaceCopy, messagesCopy } from "@/lib/i18n/brand";
import { getRequestLocale } from "@/lib/i18n/locale";
import { chromeCopy } from "@/lib/i18n/messages";

export default async function BrandDashboardPage() {
  const user = await requireBrandUser();
  const locale = await getRequestLocale();
  const company = await getCompanyForUser(user.id);
  const [results, creators] = await Promise.all([
    company ? getCompanyResults(company.id) : Promise.resolve(EMPTY_COMPANY_RESULTS),
    listCreators(),
  ]);

  const firstName = user.first_name?.trim() || user.email.split("@")[0] || "there";
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || firstName;
  const initials = (user.first_name?.trim()?.[0] || user.email[0] || "N").toUpperCase();

  return (
    <BrandDashboard
      locale={locale}
      copy={brandCopy[locale]}
      marketplace={marketplaceCopy[locale]}
      messages={messagesCopy[locale]}
      billing={billingCopy[locale]}
      userId={user.id}
      switchLanguage={chromeCopy[locale].switchLanguage}
      firstName={firstName}
      displayName={displayName}
      email={user.email}
      workspace={workspaceLabel(company, user.email)}
      initials={initials}
      results={results}
      creators={creators}
    />
  );
}
