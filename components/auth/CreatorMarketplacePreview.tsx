import type { AuthCopy } from "@/lib/i18n/messages";

export function CreatorMarketplacePreview({ copy }: { copy: AuthCopy }) {
  return (
    <div className="hidden flex-1 flex-col items-center justify-center bg-[#F3F6FB] px-10 py-16 lg:flex">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.marketplaceCardLabel}</p>
        <h2 className="font-heading mt-3 text-[28px] leading-tight font-bold tracking-tight text-[#111827]">
          {copy.marketplaceCardTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{copy.marketplaceCardBody}</p>
        <div
          className="mt-8 overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: "0 18px 50px rgba(15, 23, 42, 0.1)" }}
        >
          <div
            className="relative flex h-16 items-center justify-center"
            style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)" }}
          >
            <svg className="absolute top-4 left-4 h-4 w-4" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
            </svg>
            <span className="text-sm font-bold tracking-tight text-white">naano</span>
          </div>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8EEF9] text-lg font-semibold text-[#2563eb]">
                Y
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-semibold text-[#111827]">{copy.yourName}</p>
                <p className="mt-0.5 text-sm leading-snug text-[#6B7280]">{copy.headlinePlaceholder}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs font-medium text-[#6B7280]">
              <span>{copy.dataLabel}</span>
              <span>{copy.pending}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF2F7]">
              <div className="h-full w-1/5 rounded-full bg-[#BFDBFE]" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#F3F4F6] pt-4">
              {[
                [copy.followers, "—"],
                [copy.estImpressions, "—"],
                [copy.costPerPost, "—"],
              ].map(([label, value]) => (
                <div key={label} className="text-center">
                  <p className="text-base font-semibold text-[#111827]">{value}</p>
                  <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
