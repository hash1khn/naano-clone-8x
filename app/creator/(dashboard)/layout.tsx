import type { ReactNode } from "react";

export default function CreatorDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/brand/naano-design-system.css" />
      <link rel="stylesheet" href="/brand/naano-brand-app.css" />
      <link rel="stylesheet" href="/brand/naano-brand-shell.css" />
      <link rel="stylesheet" href="/brand/naano-brand-toolbar.css" />
      <link rel="stylesheet" href="/brand/naano-messages.css" />
      <link rel="stylesheet" href="/brand/naano-collaborations.css" />
      <link rel="stylesheet" href="/brand/naano-creator-home.css" />
      <link rel="stylesheet" href="/brand/naano-earnings.css" />
      <link rel="stylesheet" href="/brand/naano-analytics.css" />
      <link rel="stylesheet" href="/brand/naano-opportunities.css" />
      <link rel="stylesheet" href="/brand/naano-referrals.css" />
      <link rel="stylesheet" href="/brand/naano-mycard.css" />
      {children}
    </>
  );
}
