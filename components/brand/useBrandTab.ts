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

export const RESULTS_SUBTABS = ["analytics", "leads", "posts"] as const;
export type ResultsSubtab = (typeof RESULTS_SUBTABS)[number];

export type ResultsRoute = {
  campaignId: string;
  subtab: ResultsSubtab;
};

const DEFAULT_RESULTS: ResultsRoute = { campaignId: "all", subtab: "analytics" };

export function isBrandTab(value: string): value is BrandTab {
  return (BRAND_TABS as readonly string[]).includes(value);
}

export function isResultsSubtab(value: string): value is ResultsSubtab {
  return (RESULTS_SUBTABS as readonly string[]).includes(value);
}

export function parseBrandHash(raw: string): { tab: BrandTab; results: ResultsRoute } {
  const hash = raw.replace(/^#/, "");
  const [first = "", campaignId, subtab] = hash.split("/");
  if (first === "results") {
    return {
      tab: "results",
      results: {
        campaignId: campaignId || "all",
        subtab: isResultsSubtab(subtab) ? subtab : "analytics",
      },
    };
  }
  if (first === "collaborations") {
    return {
      tab: "collaborations",
      results: DEFAULT_RESULTS,
    };
  }
  return {
    tab: isBrandTab(first) ? first : "overview",
    results: DEFAULT_RESULTS,
  };
}

export function resultsHash(campaignId = "all", subtab: ResultsSubtab = "analytics"): string {
  return `#results/${campaignId}/${subtab}`;
}

function readHash() {
  return parseBrandHash(window.location.hash);
}

export function useBrandTab(): BrandTab {
  const [tab, setTab] = useState<BrandTab>("overview");

  useEffect(() => {
    function read() {
      const parsed = readHash();
      setTab(parsed.tab);
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

export function useResultsRoute(): ResultsRoute {
  const [route, setRoute] = useState<ResultsRoute>(DEFAULT_RESULTS);

  useEffect(() => {
    function read() {
      setRoute(readHash().results);
    }
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return route;
}
