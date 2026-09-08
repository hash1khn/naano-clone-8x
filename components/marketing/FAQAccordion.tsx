export type FAQAccordionProps = {
  items: { question: string; answer: string }[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <section>
      <h2>FAQ</h2>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
