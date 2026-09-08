import Link from "next/link";
import { BLOG_POSTS } from "@/lib/marketing/blog-content";
import { getRequestLocale } from "@/lib/i18n/locale";
import { chromeCopy } from "@/lib/i18n/messages";

export async function Footer() {
  const locale = await getRequestLocale();
  const t = chromeCopy[locale];

  const productLinks = [
    { href: "/#how-it-works", label: t.features },
    { href: "/pricing", label: t.pricing },
    { href: "/#faq", label: t.faqs },
    { href: "/blog", label: t.blog },
    { href: "/reports", label: t.reports },
    { href: "/about", label: t.about },
  ] as const;

  const companyLinks = [
    { href: "/help", label: t.helpCenter },
    { href: "/privacy", label: t.privacy },
    { href: "/terms", label: t.terms },
  ] as const;

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-[1504px] flex-col gap-10 px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg text-ink">naano</p>
            <p className="text-copy">{t.tagline}</p>
          </div>

          <nav aria-label={t.product}>
            <h3 className="text-sm tracking-wide text-muted uppercase">{t.product}</h3>
            <ul className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.company}>
            <h3 className="text-sm tracking-wide text-muted uppercase">{t.company}</h3>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.resources}>
            <h3 className="text-sm tracking-wide text-muted uppercase">{t.resources}</h3>
            <ul className="flex flex-col gap-2">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-copy">
          <p>{t.rights}</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/naanooo/">LinkedIn</a>
            <a href="https://fr.trustpilot.com/review/www.naano.xyz">{t.trustpilot}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
