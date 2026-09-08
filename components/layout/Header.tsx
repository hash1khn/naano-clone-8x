import Image from "next/image";
import Link from "next/link";

// Nav structure matches the real naano.com header (id="naano-nav").
const PRIMARY_LINKS = [
  { href: "/", label: "For companies" },
  { href: "/creators", label: "For creators" },
  { href: "/agencies", label: "For agencies" },
  { href: "/#how-it-works", label: "How it works" },
] as const;

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/reports", label: "Reports & benchmarks" },
  { href: "/case-studies/blogseo", label: "Case study: BlogSEO" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95">
      <div className="mx-auto flex max-w-[1504px] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/lp/naano-logo-nav.png" alt="naano" width={110} height={30} className="h-[30px] w-auto" priority />
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-8">
            {PRIMARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <details>
                <summary>Resources</summary>
                <ul className="flex flex-col">
                  {RESOURCE_LINKS.map((link) => (
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
          <Link href="/login">Sign in</Link>
          <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-paper">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
