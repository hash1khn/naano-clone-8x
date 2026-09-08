"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n/locale";

export function LocaleToggle({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const nextLocale: Locale = locale === "en" ? "fr" : "en";

  function onClick() {
    if (pending) {
      return;
    }
    startTransition(async () => {
      const res = await fetch(`/api/locale?locale=${nextLocale}`, { method: "POST" });
      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-label={label}
        data-locale-toggle=""
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          height: 32,
          padding: "0 10px",
          borderRadius: 8,
          border: "none",
          background: "transparent",
          cursor: pending ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "background 0.1s ease",
          opacity: pending ? 0.5 : 1,
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.background = "var(--v3-bg-hover, rgba(23,24,28,0.06))";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.background = "transparent";
        }}
      >
        <svg
          aria-hidden="true"
          className="lucide lucide-globe"
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          style={{ color: "var(--v3-text-tertiary, #6B6D74)", flexShrink: 0 }}
          viewBox="0 0 24 24"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span style={{ display: "inline-block", width: 20, height: 18, position: "relative", overflow: "hidden" }}>
          <span
            key={locale}
            style={{
              display: "block",
              position: "absolute",
              inset: 0,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "var(--v3-text-secondary, #17181C)",
              letterSpacing: "0.02em",
              lineHeight: "18px",
              textAlign: "center",
              animation: "localeIn 0.3s cubic-bezier(0.2, 0, 0, 1) forwards",
            }}
          >
            {locale}
          </span>
        </span>
      </button>
      <style>{`
        @keyframes localeIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
