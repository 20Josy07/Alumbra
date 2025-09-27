import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Alumbra logo">
      <Image
        src="https://i.postimg.cc/QCys4Rbt/favicon-light.png"
        alt="Alumbra logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-2xl font-bold text-foreground">Alumbra</span>
    </div>
  );
}
