export type TestimonialCardProps = {
  quote: string;
  author: string;
  role?: string;
};

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <blockquote>
      <p>{quote}</p>
      <footer>
        <cite>{author}</cite>
        {role ? <span>{role}</span> : null}
      </footer>
    </blockquote>
  );
}
