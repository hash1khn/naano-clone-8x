import Image from "next/image";
import Link from "next/link";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import { getRequestLocale } from "@/lib/i18n/locale";
import { chromeCopy } from "@/lib/i18n/messages";

export async function Header() {
  const locale = await getRequestLocale();
  const t = chromeCopy[locale];

  const primaryLinks = [
    { href: "/", label: t.forCompanies },
    { href: "/creators", label: t.forCreators },
    { href: "/agencies", label: t.forAgencies },
    { href: "/#how-it-works", label: t.howItWorks },
  ] as const;

  const resourceLinks = [
    { href: "/blog", label: t.blog },
    { href: "/free-tools", label: t.freeTools },
    { href: "/reports", label: t.reports },
    { href: "/case-studies/blogseo", label: t.caseStudy },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95">
      <div className="mx-auto flex max-w-[1504px] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/lp/naano-logo-nav.png" alt="naano" width={110} height={30} className="h-[30px] w-auto" priority />
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-8">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <details>
                <summary>{t.resources}</summary>
                <ul className="flex flex-col">
                  {resourceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleToggle locale={locale} label={t.switchLanguage} />
          <Link href="/login">{t.signIn}</Link>
          <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-paper">
            {t.signUp}
          </Link>
        </div>
      </div>
    </header>
  );
}
