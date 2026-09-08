import Link from "next/link";
import type { AuthCopy } from "@/lib/i18n/messages";

export function RegisterRoleSelect({ copy, signInLabel }: { copy: AuthCopy; signInLabel: string }) {
  return (
    <>
      <h1 className="font-heading text-[32px] leading-tight font-bold tracking-tight text-[#111827]">{copy.createAccount}</h1>
      <p className="mt-2 text-[15px] text-[#6B7280]">{copy.whoAreYou}</p>
      <div className="mt-8 space-y-3">
        <Link
          href="/register?role=influencer"
          className="block rounded-2xl border border-[#E5E7EB] px-5 py-5 transition-colors hover:border-[#D1D5DB] hover:bg-[#FAFBFC]"
        >
          <p className="text-[15px] font-semibold text-[#111827]">{copy.imACreator}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{copy.creatorRoleLead}</p>
        </Link>
        <Link
          href="/register?role=saas"
          className="block rounded-2xl border border-[#E5E7EB] px-5 py-5 transition-colors hover:border-[#D1D5DB] hover:bg-[#FAFBFC]"
        >
          <p className="text-[15px] font-semibold text-[#111827]">{copy.imABrand}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{copy.brandRoleLead}</p>
        </Link>
      </div>
      <p className="mt-8 text-center text-sm text-[#6B7280]">
        {copy.alreadyHaveAccount}{" "}
        <Link href="/login" className="font-medium text-[#2563eb]">
          {signInLabel}
        </Link>
      </p>
    </>
  );
}
