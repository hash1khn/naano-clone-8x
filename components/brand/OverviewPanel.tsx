import type { CreatorListItem } from "@/lib/api/types";
import type { CompanyResults } from "@/lib/api/company-results";
import type { BrandCopy } from "@/lib/i18n/brand";
import { fill } from "@/lib/i18n/brand";

function Clouds() {
  return (
    <svg className="an-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true">
      <use href="#nnd-clouds" />
    </svg>
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
  const todos = [
    { href: "#billing", label: copy.topUpWallet, tag: copy.blocked, tone: "soon" },
    { href: "/book", label: copy.bookACall, tag: copy.suggested, tone: "info" },
    { href: "#marketplace", label: copy.findCreators, tag: copy.suggested, tone: "info" },
  ];

  return (
    <div className="nn-dash">
      <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <symbol id="nnd-clouds" viewBox="0 0 360 130">
            <path fill="rgba(255,255,255,.22)" d="M-30 91c18-14 39-15 56-5 4-20 25-31 44-24 11-24 45-29 63-9 17-11 40-3 46 17 18-7 40 4 44 21H-30Z" />
            <path fill="rgba(255,255,255,.5)" d="M-28 108c16-19 43-24 64-12 7-25 33-40 56-31 14-26 52-31 73-8 19-12 44-3 50 20 18-5 39 7 44 29v24H-28Z" />
            <path fill="rgba(255,255,255,.5)" d="M190 102c12-16 35-20 52-8 8-25 39-35 61-18 18-14 48-4 54 21 14-3 30 4 40 19v14H190Z" />
            <path fill="rgba(255,255,255,.82)" d="M-26 126c17-22 49-28 72-13 14-25 49-31 72-12 19-17 50-13 64 8 21-10 50-2 60 20H-26Z" />
            <path fill="rgba(255,255,255,.82)" d="M237 129c14-18 40-23 59-11 14-23 48-28 68-7 12-5 27-2 38 9v10H237Z" />
          </symbol>
        </defs>
      </svg>
      <main>
        <div className="wrap">
          <div className="top">
            <div>
              <div className="hello" id="nnd-hello">
                {fill(copy.hello, { name: firstName })}
              </div>
              <h1 id="nnd-title">{fill(copy.happeningFor, { workspace })}</h1>
            </div>
            <div className="top-actions">
              <a className="btn primary" href="#campaign-new">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>{copy.newCampaign}</span>
              </a>
            </div>
          </div>

          <div className="kpis" id="nnd-kpis">
            <div className="kpi">
              <div className="kpi-lbl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" />
                </svg>
                <span>{copy.creatorsActivated}</span>
              </div>
              <b>0</b>
            </div>
            <div className="kpi">
              <div className="kpi-lbl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
                <span>{copy.postsPublished}</span>
              </div>
              <b>0</b>
            </div>
            <div className="kpi">
              <div className="kpi-lbl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-5.9A8.4 8.4 0 1 1 21 11.5z" />
                </svg>
                <span>{copy.profilesEngaged}</span>
              </div>
              <b>{results.total_leads}</b>
            </div>
            <div className="kpi">
              <div className="kpi-lbl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{copy.impressions}</span>
              </div>
              <b>{results.total_impressions}</b>
            </div>
          </div>

          <div className="grid grid-top">
            <section className="card">
              <div className="card-head">
                <h2>{copy.toDo}</h2>
                <a href="#collaborations">{copy.seeAll}</a>
              </div>
              <div className="sub">{copy.priorityActions}</div>
              <div className="tasks">
                {todos.map((item) => (
                  <div className="task" key={item.label}>
                    <span className="task-check" />
                    <div className="task-body">
                      <b>{item.label}</b>
                    </div>
                    <span className={`task-tag ${item.tone}`}>{item.tag}</span>
                    <a className="task-go" href={item.href}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sky-cover">
                <Clouds />
                <div className="sky-copy">
                  <small>{copy.recentlyEngaged}</small>
                  <b>{copy.icpAccounts}</b>
                </div>
                <a className="sky-link" href="#results">
                  {copy.seeAll}
                </a>
              </div>
              <div className="people">
                <div className="person">
                  <div className="person-main">
                    <span>{copy.noCompanyEngaged}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-bot">
            <section className="card">
              <div className="card-head">
                <h2>{copy.messages}</h2>
              </div>
              <div className="sub">{copy.waitingOnReply}</div>
              <div className="msgs compact">
                <div className="msg">
                  <div className="msg-main">
                    <div className="msg-text">{copy.noConversation}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card-head">
                <h2>{copy.newCreators}</h2>
                {creators.length ? <span className="count">{creators.length}</span> : null}
                <a href="#marketplace">{copy.explore}</a>
              </div>
              <div className="sub">{copy.profilesThatFit}</div>
              {creators.length === 0 ? (
                <p className="sub" style={{ padding: "16px 0" }}>
                  {copy.noCreators}
                </p>
              ) : (
                <div className="strip">
                  <div className="strip-track" id="nnd-strip">
                    {creators.slice(0, 8).map((creator, index) => (
                      <article className="cc" key={creator.id}>
                        <div className={`cc-cover${index % 3 === 1 ? " t2" : index % 3 === 2 ? " t3" : ""}`}>
                          <svg className="cc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true">
                            <use href="#nnd-clouds" />
                          </svg>
                        </div>
                        <div
                          className="cc-av"
                          style={creator.avatar_url ? { backgroundImage: `url("${creator.avatar_url}")` } : undefined}
                        />
                        <div className="cc-body">
                          <b>{creator.name}</b>
                          <div className="cc-role">{creator.niche_tags.slice(0, 3).join(" · ")}</div>
                          <div className="cc-rate">
                            <span>{copy.fromPrice}</span>
                            <b>{creator.price_per_post}€</b>
                            <span>{copy.perPost}</span>
                          </div>
                          <a className="cc-add" href="#marketplace">
                            {copy.addCreator}
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <section className="expert">
            <div className="expert-faces">
              <span style={{ backgroundImage: "url(/lp/naano-team-face.jpg)" }} />
            </div>
            <div className="expert-body">
              <span className="expert-tag">
                <i />
                <span>{copy.expertTag}</span>
              </span>
              <h3>{copy.expertTitle}</h3>
              <p>{copy.expertBody}</p>
            </div>
            <div className="expert-cta">
              <a className="expert-btn" href="/book">
                {copy.expertCta}
              </a>
              <span className="expert-note">{copy.expertNote}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
