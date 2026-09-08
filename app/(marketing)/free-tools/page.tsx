import Link from "next/link";
import { FREE_TOOLS } from "@/lib/marketing/placeholder";

export default function FreeToolsPage() {
  return (
    <section>
      <h1>Free tools</h1>
      <ul>
        {FREE_TOOLS.map((tool) => (
          <li key={tool.slug}>
            <Link href={`/free-tools/${tool.slug}`}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
