import type { CreatorListItem } from "@/lib/api/types";
import type { CompanyResults } from "@/lib/api/company-results";
import type { BrandCopy } from "@/lib/i18n/brand";
import { fill } from "@/lib/i18n/brand";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#EEF0F3] bg-white ${className}`}>{children}</section>
  );
}

export function OverviewPanel({
  copy,
  firstName,
  workspace,
  results,
  creators,
}: {
  copy: BrandCopy;
  firstName: string;
  workspace: string;
  results: CompanyResults;
  creators: CreatorListItem[];
}) {
  const metrics = [
    { label: copy.creatorsActivated, value: 0 },
    { label: copy.postsPublished, value: 0 },
    { label: copy.profilesEngaged, value: results.total_leads },
    { label: copy.impressions, value: results.total_impressions },
  ];

  const todos = [
    { href: "#billing", label: copy.topUpWallet, tag: copy.blocked, tone: "blocked" as const },
    { href: "/book", label: copy.bookACall, tag: copy.suggested, tone: "suggested" as const },
    { href: "#marketplace", label: copy.findCreators, tag: copy.suggested, tone: "suggested" as const },
  ];

  return (
    <div className="mx-auto max-w-[1200px] space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-[28px] leading-tight font-bold tracking-tight text-[#111827]">
            {fill(copy.hello, { name: firstName })}
          </h1>
          <p className="mt-1 text-[15px] text-[#6B7280]">{fill(copy.happeningFor, { workspace })}</p>
        </div>
        <a
          href="#campaign-new"
          className="inline-flex h-10 items-center rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white"
          style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
        >
          {copy.newCampaign}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="px-5 py-4">
            <p className="text-sm text-[#6B7280]">{metric.label}</p>
            <p className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[#111827]">{metric.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">{copy.toDo}</h2>
              <p className="text-sm text-[#6B7280]">{copy.priorityActions}</p>
            </div>
            <a href="#campaigns" className="text-sm font-medium text-[#2563eb]">
              {copy.seeAll}
            </a>
          </div>
          <ul className="mt-4 divide-y divide-[#F3F4F6]">
            {todos.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="flex items-center gap-3 py-3">
                  <span className="h-5 w-5 rounded-full border border-[#D1D5DB]" />
                  <span className="min-w-0 flex-1 text-sm font-medium text-[#111827]">{item.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      item.tone === "blocked" ? "bg-[#FEF3C7] text-[#B45309]" : "bg-[#EFF6FF] text-[#2563eb]"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[#9CA3AF]">›</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="relative overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase">{copy.recentlyEngaged}</p>
              <h2 className="mt-1 text-base font-semibold text-[#111827]">{copy.icpAccounts}</h2>
            </div>
            <a href="#results" className="text-sm font-medium text-[#2563eb]">
              {copy.seeAll}
            </a>
          </div>
          <div className="relative mt-8 flex min-h-[140px] items-center justify-center">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-70"
              style={{
                background: "url(/lp/cloud-layer-bottom-v1.png) center bottom / cover no-repeat",
              }}
            />
            <p className="relative text-sm text-[#6B7280]">{copy.noCompanyEngaged}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card className="p-5">
          <h2 className="text-base font-semibold text-[#111827]">{copy.messages}</h2>
          <p className="text-sm text-[#6B7280]">{copy.waitingOnReply}</p>
          <p className="mt-10 text-sm text-[#6B7280]">{copy.noConversation}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">{copy.newCreators}</h2>
              <p className="text-sm text-[#6B7280]">{copy.profilesThatFit}</p>
            </div>
            <a href="#marketplace" className="text-sm font-medium text-[#2563eb]">
              {copy.explore}
            </a>
          </div>
          {creators.length === 0 ? (
            <p className="mt-10 text-sm text-[#6B7280]">{copy.noCreators}</p>
          ) : (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {creators.slice(0, 8).map((creator) => (
                <a
                  key={creator.id}
                  href="#marketplace"
                  className="w-[148px] shrink-0 rounded-2xl border border-[#EEF0F3] p-3"
                >
                  {creator.avatar_url ? (
                    <img src={creator.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F0FE] text-sm font-semibold text-[#2563eb]">
                      {creator.name.slice(0, 1)}
                    </span>
                  )}
                  <p className="mt-3 truncate text-sm font-semibold text-[#111827]">{creator.name}</p>
                  <p className="mt-1 truncate text-xs text-[#6B7280]">{creator.niche_tags.slice(0, 3).join(" · ") || creator.country}</p>
                  <p className="mt-3 text-xs font-semibold text-[#2563eb]">
                    {fill(copy.fromPrice, { price: String(creator.price_per_post) })}
                  </p>
                </a>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
