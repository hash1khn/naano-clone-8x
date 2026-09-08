"use client";

import { useState } from "react";

// LinkedIn Engagement Rate Calculator — matches the real naano.com/free-tools
// "Enter your follower count and your average reactions, comments and
// reposts per post, and get your engagement rate two ways."
export function CalculatorForm() {
  const [followers, setFollowers] = useState("");
  const [reactions, setReactions] = useState("");
  const [comments, setComments] = useState("");
  const [reposts, setReposts] = useState("");
  const [impressions, setImpressions] = useState("");

  const engagements = Number(reactions) + Number(comments) + Number(reposts);
  const byFollowers =
    followers && Number(followers) > 0 ? ((engagements / Number(followers)) * 100).toFixed(2) : null;
  const byImpressions =
    impressions && Number(impressions) > 0 ? ((engagements / Number(impressions)) * 100).toFixed(2) : null;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="sr-only">LinkedIn engagement rate inputs</legend>
        <p>
          <label htmlFor="calc-followers">Follower count</label>
          <input
            id="calc-followers"
            name="followers"
            type="number"
            min="0"
            value={followers}
            onChange={(event) => setFollowers(event.target.value)}
            className="block w-full rounded-lg border border-ink/15 px-3 py-2"
          />
        </p>
        <p>
          <label htmlFor="calc-impressions">Avg. impressions per post (optional)</label>
          <input
            id="calc-impressions"
            name="impressions"
            type="number"
            min="0"
            value={impressions}
            onChange={(event) => setImpressions(event.target.value)}
            className="block w-full rounded-lg border border-ink/15 px-3 py-2"
          />
        </p>
        <p>
          <label htmlFor="calc-reactions">Avg. reactions per post</label>
          <input
            id="calc-reactions"
            name="reactions"
            type="number"
            min="0"
            value={reactions}
            onChange={(event) => setReactions(event.target.value)}
            className="block w-full rounded-lg border border-ink/15 px-3 py-2"
          />
        </p>
        <p>
          <label htmlFor="calc-comments">Avg. comments per post</label>
          <input
            id="calc-comments"
            name="comments"
            type="number"
            min="0"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
            className="block w-full rounded-lg border border-ink/15 px-3 py-2"
          />
        </p>
        <p>
          <label htmlFor="calc-reposts">Avg. reposts per post</label>
          <input
            id="calc-reposts"
            name="reposts"
            type="number"
            min="0"
            value={reposts}
            onChange={(event) => setReposts(event.target.value)}
            className="block w-full rounded-lg border border-ink/15 px-3 py-2"
          />
        </p>
      </fieldset>
      <div className="rounded-2xl border border-ink/10 p-6">
        <p className="text-copy">
          Engagement rate by followers: <strong className="text-ink">{byFollowers ?? "—"}%</strong>
        </p>
        <p className="text-copy">
          Engagement rate by impressions: <strong className="text-ink">{byImpressions ?? "—"}%</strong>
        </p>
      </div>
    </form>
  );
}
