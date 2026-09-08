import { CreatorMarketplacePreview } from "@/components/auth/CreatorMarketplacePreview";
import { RegisterLayout } from "@/components/auth/RegisterLayout";
import { RegisterRoleSelect } from "@/components/auth/RegisterRoleSelect";
import { RegisterSignup } from "@/components/auth/RegisterSignup";
import { appRoleFromRegisterParam, safeNextPath } from "@/lib/auth/oauth";
import { getRequestLocale } from "@/lib/i18n/locale";
import { authCopy, chromeCopy } from "@/lib/i18n/messages";

function BluePanel({ title, body, footnote }: { title: string; body: string; footnote?: string }) {
  return (
    <div className="hidden flex-1 items-center justify-center p-12 text-white lg:flex" style={{ background: "#2563eb" }}>
      <div className="max-w-md text-center">
        <h2 className="font-heading text-4xl leading-tight font-bold">{title}</h2>
        <p className="mt-4 text-[17px] leading-relaxed text-blue-100">{body}</p>
        {footnote ? <p className="mt-6 text-sm text-white/70">{footnote}</p> : null}
      </div>
    </div>
  );
}

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const query = await searchParams;
  const role = appRoleFromRegisterParam(typeof query.role === "string" ? query.role : undefined);
  const oauthError = query.error === "oauth";
  const complete = query.complete === "1";
  const nextPath = safeNextPath(typeof query.next === "string" ? query.next : null);
  const locale = await getRequestLocale();
  const t = authCopy[locale];
  const chrome = chromeCopy[locale];

  if (!role) {
    return (
      <RegisterLayout locale={locale} switchLanguage={chrome.switchLanguage} panel={<BluePanel title={t.onePlatform} body={t.onePlatformBody} />}>
        <RegisterRoleSelect
          copy={t}
          signInLabel={chrome.signIn}
          complete={complete}
          nextPath={nextPath}
          oauthError={oauthError}
        />
      </RegisterLayout>
    );
  }

  const panel =
    role === "creator" ? (
      <CreatorMarketplacePreview copy={t} />
    ) : (
      <BluePanel title={t.creatorsBrandsResults} body={t.brandPanelBody} footnote={t.builtForB2b} />
    );

  return (
    <RegisterLayout locale={locale} switchLanguage={chrome.switchLanguage} panel={panel}>
      <RegisterSignup role={role} copy={t} oauthError={oauthError} />
    </RegisterLayout>
  );
}
