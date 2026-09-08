export type VideoCaseStudyProps = {
  videoUrl?: string;
  caption?: string;
};

export function VideoCaseStudy({ videoUrl, caption }: VideoCaseStudyProps) {
  return (
    <section>
      <h2>Video case study</h2>
      <figure>
        {videoUrl ? (
          <a href={videoUrl}>{videoUrl}</a>
        ) : (
          <div>Video embed placeholder</div>
        )}
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </section>
  );
}
