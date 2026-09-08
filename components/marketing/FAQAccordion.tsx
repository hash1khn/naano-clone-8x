export type FAQAccordionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items: { question: string; answer: string }[];
};

export function FAQAccordion({ eyebrow, heading, description, items }: FAQAccordionProps) {
  return (
    <section id="faq" className="mx-auto max-w-[1504px] px-6 py-16">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      {heading ? <h2 className="font-heading text-3xl text-ink">{heading}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-copy">{description}</p> : null}
      <div className="mt-8 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
        {items.map((item) => (
          <details key={item.question} className="py-4">
            <summary className="cursor-pointer font-heading text-lg text-ink">{item.question}</summary>
            <p className="mt-2 text-copy">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
