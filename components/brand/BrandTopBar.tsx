"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { formatBillingBalance, readDemoBilling, subscribeDemoBilling } from "@/lib/billing/demo";
import type { BrandCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function BrandTopBar({
  locale,
  copy,
  switchLanguage,
  initials,
  displayName,
  email,
}: {
  locale: Locale;
  copy: BrandCopy;
  switchLanguage: string;
  initials: string;
  displayName: string;
  email: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [wallet, setWallet] = useState(() => formatBillingBalance(0, locale));

  useEffect(() => {
    function refresh() {
      setWallet(formatBillingBalance(readDemoBilling().balance, locale));
    }
    refresh();
    return subscribeDemoBilling(refresh);
  }, [locale]);

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

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="nn-account-toolbar" id="nn-account-toolbar">
      <a className="nn-mcp-header-chip" href="#integrations" title="Connect Naano to your AI assistant">
        <span className="nn-mcp-signal" aria-hidden="true" />
        <span>
          <span className="nn-mcp-brand">Naano </span>MCP
        </span>
        <span className="nn-mcp-divider" aria-hidden="true">
          /
        </span>
        <span className="nn-mcp-action">Connect</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
      <a className="wallet-pill" href="#billing" title={copy.availableBalance}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2.5" />
          <path d="M2 10h20" />
        </svg>
        <span className="wp-txt">
          <b id="topbar-balance">{wallet}</b>
          <span>{copy.availableBalance}</span>
        </span>
      </a>
      <div className="lang-seg" role="group" aria-label={switchLanguage}>
        {(["en", "fr"] as const).map((code) => (
          <button
            key={code}
            type="button"
            className={`lang-opt${locale === code ? " on" : ""}`}
            data-loc={code}
            onClick={() => setLocale(code)}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
      <a className="nn-activation-entry" href="#marketplace">
        <span className="nn-activation-entry-copy">
          <small>{copy.getStarted}</small>
          <b>{copy.getStartedBody}</b>
        </span>
      </a>
      <button type="button" className="bell" aria-label="Notifications">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 0 0 3.4 0" />
        </svg>
      </button>
      <div className="user-slot">
        {menuOpen ? (
          <div className="user-menu open" role="menu">
            <a className="nav-item" href="#marketplace" role="menuitem" onClick={() => setMenuOpen(false)}>
              <span>{copy.inviteCreators}</span>
            </a>
            <a className="nav-item" href="/book" role="menuitem">
              <span>{copy.bookACall}</span>
            </a>
            <a className="nav-item" href="#integrations" role="menuitem" onClick={() => setMenuOpen(false)}>
              <span>{copy.integrations}</span>
            </a>
            <button type="button" className="nav-item" role="menuitem" onClick={() => void signOut()}>
              <span>{copy.signOut}</span>
            </button>
          </div>
        ) : null}
        <button
          type="button"
          className={`user-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="ub-av">
            <span className="avatar-sm" style={{ background: "#0F1220" }}>
              {initials}
            </span>
          </span>
          <span className="ub-txt">
            <b>{displayName}</b>
            <span>{email}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
