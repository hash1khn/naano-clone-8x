import Image from "next/image";

export type ProfileHeaderProps = {
  name: string;
  avatarUrl: string;
  country: string;
  followerCount: number;
};

export function ProfileHeader({ name, avatarUrl, country, followerCount }: ProfileHeaderProps) {
  return (
    <header className="flex items-center gap-4">
      <Image src={avatarUrl} alt={name} width={72} height={72} className="rounded-full object-cover" />
      <div>
        <h1 className="font-heading text-2xl text-ink">{name}</h1>
        <p className="text-copy">{country}</p>
        <p className="text-copy">{followerCount.toLocaleString()} followers</p>
      </div>
    </header>
  );
}
