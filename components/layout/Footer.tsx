import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/help", label: "Help" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/reports", label: "Reports" },
  { href: "/selection", label: "Selection" },
  { href: "/case-studies/blogseo", label: "Case study" },
] as const;

export function Footer() {
  return (
    <footer>
      <nav>
        <ul className="flex flex-wrap">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
