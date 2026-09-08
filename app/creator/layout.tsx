export default function CreatorLayout({ children }: LayoutProps<"/creator">) {
  return (
    <>
      <link rel="stylesheet" href="/brand/naano-design-system.css" />
      <link rel="stylesheet" href="/brand/naano-brand-app.css" />
      <link rel="stylesheet" href="/brand/naano-brand-shell.css" />
      <link rel="stylesheet" href="/brand/naano-brand-toolbar.css" />
      <link rel="stylesheet" href="/brand/naano-messages.css" />
      {children}
    </>
  );
}
