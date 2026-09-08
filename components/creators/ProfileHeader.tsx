export type ProfileHeaderProps = {
  name: string;
  avatarUrl: string;
  country: string;
  followerCount: number;
};

export function ProfileHeader({ name, avatarUrl, country, followerCount }: ProfileHeaderProps) {
  return (
    <header className="flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatarUrl} alt={name} />
      <div>
        <h1>{name}</h1>
        <p>{country}</p>
        <p>{followerCount} followers</p>
      </div>
    </header>
  );
}
