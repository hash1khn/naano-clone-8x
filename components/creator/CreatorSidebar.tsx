import type { LucideIcon } from "lucide-react";
import {
  Home,
  User,
  Briefcase,
  Users,
  ChartColumn,
  MessagesSquare,
  Wallet,
  MessageSquare,
  Plug,
} from "lucide-react";
import type { CreatorCopy } from "@/lib/i18n/creator";
import type { CreatorTab } from "@/components/creator/useCreatorTab";

const NAV: { hash: CreatorTab; label: keyof CreatorCopy; Icon: LucideIcon }[] = [
  { hash: "home", label: "home", Icon: Home },
  { hash: "profile", label: "profile", Icon: User },
  { hash: "opportunities", label: "opportunities", Icon: Briefcase },
  { hash: "collabs", label: "collabs", Icon: Users },
  { hash: "analytics", label: "analytics", Icon: ChartColumn },
  { hash: "community", label: "community", Icon: MessagesSquare },
  { hash: "earnings", label: "earnings", Icon: Wallet },
  { hash: "messages", label: "messages", Icon: MessageSquare },
  { hash: "integrations", label: "integrations", Icon: Plug },
];

export function CreatorSidebar({
  tab,
  copy,
  workspace,
}: {
  tab: CreatorTab;
  copy: CreatorCopy;
  workspace: string;
}) {
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
          const active = tab === hash;
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
