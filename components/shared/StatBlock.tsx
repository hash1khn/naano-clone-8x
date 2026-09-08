export type StatBlockProps = {
  label: string;
  value: string;
};

export function StatBlock({ label, value }: StatBlockProps) {
  return (
    <article>
      <p>{value}</p>
      <p>{label}</p>
    </article>
  );
}
