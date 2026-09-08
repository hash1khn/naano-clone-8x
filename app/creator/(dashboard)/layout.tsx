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
      {children}
    </>
  );
}
