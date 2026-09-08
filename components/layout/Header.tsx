import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/creators", label: "Creators" },
  { href: "/agencies", label: "Agencies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/briefs", label: "Briefs" },
  { href: "/free-tools", label: "Free tools" },
  { href: "/book", label: "Book" },
] as const;

export function Header() {
  return (
    <header>
      <Link href="/">Naano</Link>
      <nav>
        <ul className="flex flex-wrap">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
