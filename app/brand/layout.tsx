export default function BrandLayout({ children }: LayoutProps<"/brand">) {
  return (
    <>
      <link rel="stylesheet" href="/brand/naano-design-system.css" />
      <link rel="stylesheet" href="/brand/naano-brand-app.css" />
      <link rel="stylesheet" href="/brand/naano-brand-shell.css" />
      <link rel="stylesheet" href="/brand/naano-brand-toolbar.css" />
      <link rel="stylesheet" href="/brand/naano-marketplace.css" />
      <link rel="stylesheet" href="/brand/naano-messages.css" />
      <link rel="stylesheet" href="/brand/naano-billing.css" />
      <link rel="stylesheet" href="/brand/naano-results.css" />
      <link rel="stylesheet" href="/brand/naano-collaborations.css" />
      {children}
    </>
  );
}
