export type StatBlockProps = {
  label: string;
  value: string;
};

export function StatBlock({ label, value }: StatBlockProps) {
  return (
    <article className="flex flex-col gap-1">
      <p className="font-heading text-3xl text-ink">{value}</p>
      <p className="text-copy">{label}</p>
    </article>
  );
}
