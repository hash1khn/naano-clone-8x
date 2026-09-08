"use client";

export function LeadForm() {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: wire to lead-capture endpoint once added to docs/naano-api-contract.md.
      }}
    >
      <p>
        <label htmlFor="lead-name">Name</label>
        <input id="lead-name" name="name" type="text" className="block w-full rounded-lg border border-ink/15 px-3 py-2" />
      </p>
      <p>
        <label htmlFor="lead-email">Work email</label>
        <input id="lead-email" name="email" type="email" className="block w-full rounded-lg border border-ink/15 px-3 py-2" />
      </p>
      <p>
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" type="text" className="block w-full rounded-lg border border-ink/15 px-3 py-2" />
      </p>
      <p>
        <label htmlFor="lead-campaign">Describe the campaign you want to launch</label>
        <textarea
          id="lead-campaign"
          name="campaign"
          rows={4}
          className="block w-full rounded-lg border border-ink/15 px-3 py-2"
        />
      </p>
      <button type="submit" className="self-start rounded-full bg-ink px-6 py-3 text-paper">
        Get my free shortlist
      </button>
    </form>
  );
}
