"use client";

export function LeadForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: wire to lead-capture endpoint once added to docs/naano-api-contract.md.
      }}
    >
      <p>
        <label htmlFor="lead-name">Name</label>
        <input id="lead-name" name="name" type="text" />
      </p>
      <p>
        <label htmlFor="lead-email">Email</label>
        <input id="lead-email" name="email" type="email" />
      </p>
      <p>
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" type="text" />
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}
