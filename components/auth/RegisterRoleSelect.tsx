import Link from "next/link";
import type { AuthCopy } from "@/lib/i18n/messages";

export function RegisterRoleSelect({
  copy,
  signInLabel,
  complete,
  nextPath,
  oauthError,
}: {
  copy: AuthCopy;
  signInLabel: string;
  complete?: boolean;
  nextPath?: string | null;
  oauthError?: boolean;
}) {
  const nextQuery = nextPath ? `&next=${encodeURIComponent(nextPath)}` : "";
  const creatorHref = complete
    ? `/api/auth/complete-signup?role=creator${nextQuery}`
    : "/register?role=influencer";
  const brandHref = complete
    ? `/api/auth/complete-signup?role=brand${nextQuery}`
    : "/register?role=saas";

  return (
    <>
      <h1 className="font-heading text-[32px] leading-tight font-bold tracking-tight text-[#111827]">
        {complete ? copy.finishSignup : copy.createAccount}
      </h1>
      <p className="mt-2 text-[15px] text-[#6B7280]">{complete ? copy.finishSignupLead : copy.whoAreYou}</p>
      {oauthError ? <p className="mt-4 text-sm text-red-600">{copy.oauthFailed}</p> : null}
      <div className="mt-8 space-y-3">
        <Link
          href={creatorHref}
          className="block rounded-2xl border border-[#E5E7EB] px-5 py-5 transition-colors hover:border-[#D1D5DB] hover:bg-[#FAFBFC]"
        >
          <p className="text-[15px] font-semibold text-[#111827]">{copy.imACreator}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{copy.creatorRoleLead}</p>
        </Link>
        <Link
          href={brandHref}
          className="block rounded-2xl border border-[#E5E7EB] px-5 py-5 transition-colors hover:border-[#D1D5DB] hover:bg-[#FAFBFC]"
        >
          <p className="text-[15px] font-semibold text-[#111827]">{copy.imABrand}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{copy.brandRoleLead}</p>
        </Link>
      </div>
      {complete ? null : (
        <p className="mt-8 text-center text-sm text-[#6B7280]">
          {copy.alreadyHaveAccount}{" "}
          <Link href="/login" className="font-medium text-[#2563eb]">
            {signInLabel}
          </Link>
        </p>
      )}
    </>
  );
}
