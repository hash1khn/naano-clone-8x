import Link from "next/link";
import { BLOG_POSTS } from "@/lib/marketing/blog-content";

// Structure/copy matches the real naano.com footer (class "lp-footer").
const PRODUCT_LINKS = [
  { href: "/#how-it-works", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
  { href: "/blog", label: "Blog" },
  { href: "/reports", label: "Reports & benchmarks" },
  { href: "/about", label: "About" },
] as const;

const COMPANY_LINKS = [
  { href: "/help", label: "Help Center" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms of Sale & Use" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-[1504px] flex-col gap-10 px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg text-ink">naano</p>
            <p className="text-copy">Turn LinkedIn creators into your best acquisition channel.</p>
          </div>

          <nav aria-label="Product">
            <h3 className="text-sm tracking-wide text-muted uppercase">Product</h3>
            <ul className="flex flex-col gap-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm tracking-wide text-muted uppercase">Company</h3>
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h3 className="text-sm tracking-wide text-muted uppercase">Resources</h3>
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
          <p>&copy; 2026 naano. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/naanooo/">LinkedIn</a>
            <a href="https://fr.trustpilot.com/review/www.naano.xyz">Trustpilot reviews</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
