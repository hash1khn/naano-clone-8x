"use client";

import { useEffect, useState } from "react";

export const BRAND_TABS = [
  "overview",
  "marketplace",
  "campaigns",
  "campaign-new",
  "collaborations",
  "results",
  "messages",
  "billing",
  "integrations",
] as const;

export type BrandTab = (typeof BRAND_TABS)[number];

export function isBrandTab(value: string): value is BrandTab {
  return (BRAND_TABS as readonly string[]).includes(value);
}

export function useBrandTab(): BrandTab {
  const [tab, setTab] = useState<BrandTab>("overview");

  useEffect(() => {
    function read() {
      const hash = window.location.hash.replace(/^#/, "");
      setTab(isBrandTab(hash) ? hash : "overview");
    }
    read();
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#overview");
    }
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return tab;
}
