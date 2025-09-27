import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Alumbra logo">
      <Image
        src="https://i.postimg.cc/QCys4Rbt/favicon-light.png"
        alt="Alumbra logo"
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span className="text-xl font-bold text-foreground">Alumbra</span>
    </div>
  );
}
