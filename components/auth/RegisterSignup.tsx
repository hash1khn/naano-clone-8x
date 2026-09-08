"use client";

import { useState } from "react";
import Link from "next/link";
import type { AppRole } from "@/lib/auth/oauth";
import type { AuthCopy } from "@/lib/i18n/messages";
import { RegisterForm } from "@/components/auth/RegisterForm";

const buttonClass =
  "flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white text-[15px] font-semibold text-[#111827] transition-all hover:border-[#D1D5DB] hover:bg-[#F9FAFB]";

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#0A66C2">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5 text-[#111827]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function RegisterSignup({
  role,
  copy,
  oauthError,
}: {
  role: AppRole;
  copy: AuthCopy;
  oauthError?: boolean;
}) {
  const [emailMode, setEmailMode] = useState(false);
  const isCreator = role === "creator";

  return (
    <>
      {isCreator ? (
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.step1Of4}</p>
      ) : null}
      <h1 className={`font-heading text-[32px] leading-tight font-bold tracking-tight text-[#111827] ${isCreator ? "mt-3" : ""}`}>
        {copy.joinNaano}
      </h1>
      {isCreator ? (
        <p className="mt-2 text-[15px] leading-relaxed text-[#6B7280]">{copy.creatorRoleLead}</p>
      ) : (
        <>
          <p className="mt-2 text-[17px] font-semibold text-[#2563eb]">{copy.creatorsBrandsResults}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#6B7280]">{copy.brandSignupLead}</p>
        </>
      )}
      {oauthError ? <p className="mt-4 text-sm text-red-600">{copy.oauthFailed}</p> : null}
      {emailMode ? (
        <div className="mt-8">
          <RegisterForm role={role} copy={copy} />
          <button
            type="button"
            className="mt-4 w-full cursor-pointer text-center text-sm font-medium text-[#6B7280] hover:text-[#111827]"
            onClick={() => setEmailMode(false)}
          >
            {copy.backToSignupOptions}
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <a
            href={`/api/auth/oauth/start?provider=linkedin_oidc&role=${role}`}
            className={buttonClass}
            style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.05)" }}
          >
            <LinkedInIcon />
            <span>{copy.signUpWithLinkedIn}</span>
          </a>
          <a
            href={`/api/auth/oauth/start?provider=google&role=${role}`}
            className={buttonClass}
            style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.05)" }}
          >
            <GoogleIcon />
            <span>{copy.signUpWithGoogle}</span>
          </a>
          <button
            type="button"
            className={buttonClass}
            style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.05)" }}
            onClick={() => setEmailMode(true)}
          >
            <MailIcon />
            <span>{copy.signUpWithEmail}</span>
          </button>
        </div>
      )}
      <p className="mt-8 text-center text-sm text-[#6B7280]">
        {copy.alreadyHaveAccount}{" "}
        <Link href="/login" className="font-medium text-[#2563eb]">
          {copy.signInHere}
        </Link>
      </p>
    </>
  );
}
