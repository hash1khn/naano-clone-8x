"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { BrandCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";
import { fill } from "@/lib/i18n/brand";

export function BrandTopBar({
  locale,
  copy,
  switchLanguage,
  initials,
}: {
  locale: Locale;
  copy: BrandCopy;
  switchLanguage: string;
  initials: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    if (pending || next === locale) {
      return;
    }
    startTransition(async () => {
      const res = await fetch(`/api/locale?locale=${next}`, { method: "POST" });
      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[#EEF0F3] bg-white px-4">
      <a
        href="#integrations"
        className="hidden items-center rounded-full border border-[#E5E7EB] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#6B7280] uppercase sm:inline-flex"
      >
        {copy.connectMcp}
      </a>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <a
          href="#billing"
          className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] px-3 py-1.5 text-sm font-semibold text-[#111827]"
        >
          <svg className="h-4 w-4 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M7 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
          </svg>
          {fill(copy.wallet, { amount: "0.00" })}
        </a>
        <div className="flex overflow-hidden rounded-lg border border-[#E5E7EB] text-[11px] font-semibold" role="group" aria-label={switchLanguage}>
          {(["en", "fr"] as const).map((code) => (
            <button
              key={code}
              type="button"
              disabled={pending}
              onClick={() => setLocale(code)}
              className={`cursor-pointer px-2.5 py-1.5 uppercase ${
                locale === code ? "bg-[#111827] text-white" : "bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <a
          href="#marketplace"
          className="hidden max-w-[180px] items-center gap-2 truncate rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1d4ed8] lg:flex"
        >
          <span className="tracking-wide uppercase">{copy.getStarted}</span>
          <span className="truncate font-medium text-[#3B82F6]">{copy.getStartedBody}</span>
        </a>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3F4F6]"
          aria-label="Notifications"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 9a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
            <path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
        </button>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
          {initials}
          <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E]" />
        </span>
      </div>
    </header>
  );
}
