import { MessageSquareText } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Alumbra logo">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <MessageSquareText className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold text-foreground">Alumbra</span>
    </div>
  );
}
