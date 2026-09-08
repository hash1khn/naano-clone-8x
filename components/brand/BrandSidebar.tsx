import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  ShoppingBag,
  Layers,
  Users,
  ChartColumn,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import type { BrandCopy } from "@/lib/i18n/brand";
import type { BrandTab } from "@/components/brand/useBrandTab";

const NAV: { hash: BrandTab; label: keyof BrandCopy; Icon: LucideIcon }[] = [
  { hash: "overview", label: "overview", Icon: LayoutGrid },
  { hash: "marketplace", label: "marketplace", Icon: ShoppingBag },
  { hash: "campaigns", label: "campaigns", Icon: Layers },
  { hash: "collaborations", label: "collaborations", Icon: Users },
  { hash: "results", label: "results", Icon: ChartColumn },
  { hash: "messages", label: "messages", Icon: MessageSquare },
  { hash: "billing", label: "billing", Icon: CreditCard },
];

export function BrandSidebar({ tab, copy, workspace }: { tab: BrandTab; copy: BrandCopy; workspace: string }) {
  return (
    <aside className="sidebar" id="platform-sidebar">
      <div className="sb-head">
        <a className="logo" href="/">
          <img src="/lp/naano-logomark.png" alt="" style={{ height: 26, width: "auto", display: "block" }} />
          <span className="logo-word">naano</span>
        </a>
        <button className="ov3-pill" type="button" id="nn-ws-pill">
          <span id="nn-ws-name">{workspace}</span>
        </button>
      </div>
      <nav className="nav">
        {NAV.map(({ hash, label, Icon }) => {
          const active = tab === hash || (hash === "campaigns" && tab === "campaign-new");
          return (
            <a
              key={hash}
              className={`nav-item${active ? " active" : ""}`}
              href={`#${hash}`}
              data-page={hash}
            >
              <Icon aria-hidden size={22} strokeWidth={1.8} />
              <span>{copy[label]}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
