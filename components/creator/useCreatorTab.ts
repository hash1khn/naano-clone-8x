"use client";

import { useEffect, useState } from "react";

export const CREATOR_TABS = [
  "home",
  "profile",
  "opportunities",
  "collabs",
  "analytics",
  "community",
  "earnings",
  "referrals",
  "messages",
  "integrations",
] as const;

export type CreatorTab = (typeof CREATOR_TABS)[number];

export function isCreatorTab(value: string): value is CreatorTab {
  return (CREATOR_TABS as readonly string[]).includes(value);
}

export function parseCreatorHash(raw: string): CreatorTab {
  const hash = raw.replace(/^#/, "").split("/")[0] ?? "";
  return isCreatorTab(hash) ? hash : "home";
}

export function useCreatorTab(): CreatorTab {
  const [tab, setTab] = useState<CreatorTab>("home");

  useEffect(() => {
    function read() {
      setTab(parseCreatorHash(window.location.hash));
    }
    read();
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return tab;
}
