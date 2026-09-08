export type TestimonialCardProps = {
  quote: string;
  author: string;
  role?: string;
};

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <blockquote className="rounded-2xl border border-ink/10 p-6">
      <p className="text-ink">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-3 text-sm text-copy">
        <cite>{author}</cite>
        {role ? <span> · {role}</span> : null}
      </footer>
    </blockquote>
  );
}
